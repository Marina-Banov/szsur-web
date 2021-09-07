import React, { useEffect, useState } from "react";
import { Switch, Route, Link, useLocation, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import {
  Header,
  Page,
  SidebarNav,
  PageAlert,
  PageLoaderProvider,
  PageAlertProvider,
} from "components/common";
import { NotFound } from "components/pages";
import {
  handleClickAccessibility,
  handleKeyAccessibility,
  usePrevious,
} from "utils";
import appRoutes from "appRoutes";
import { actions, selectors } from "store";
import { useFirebase } from "appFirebase";

const MOBILE_SIZE = 992;

function Main({
  events,
  getEvents,
  surveys,
  getSurveys,
  tags,
  getTags,
  organizationName,
  getUser,
}) {
  const firebase = useFirebase();
  const location = useLocation();
  const prevLocation = usePrevious(location);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= MOBILE_SIZE);

  useEffect(() => {
    if (!organizationName) {
      getUser(firebase.auth.currentUser.uid);
    }
  }, [firebase.auth.currentUser.uid, getUser, organizationName]);

  useEffect(() => {
    if (organizationName && !events) {
      getEvents(organizationName);
    }
  }, [events, getEvents, organizationName]);

  useEffect(() => {
    if (organizationName && !surveys) {
      getSurveys(organizationName);
    }
  }, [surveys, getSurveys, organizationName]);

  useEffect(() => {
    if (!tags) {
      getTags();
    }
  }, [getTags, tags]);

  function handleResize() {
    if (window.innerWidth <= MOBILE_SIZE) {
      setSidebarCollapsed(false);
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }

  function toggleSideCollapse() {
    setSidebarCollapsed(!sidebarCollapsed);
  }

  useEffect(() => {
    if (
      isMobile &&
      prevLocation &&
      !location.pathname.includes(prevLocation.pathname)
    ) {
      toggleSideCollapse();
    }
  });

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    document.addEventListener("keydown", handleKeyAccessibility);
    document.addEventListener("click", handleClickAccessibility);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("keydown", handleKeyAccessibility);
      document.removeEventListener("click", handleClickAccessibility);
    };
  }, []);

  return (
    <PageLoaderProvider>
      <PageAlertProvider>
        <div className={`app ${sidebarCollapsed ? "side-menu-collapsed" : ""}`}>
          <PageAlert />
          <div className="app-body">
            <SidebarNav
              isSidebarCollapsed={sidebarCollapsed}
              toggleSidebar={toggleSideCollapse}
            />
            <Page>
              <Header
                isSidebarCollapsed={sidebarCollapsed}
                toggleSidebar={toggleSideCollapse}
              />

              <main id="primary-content" tabIndex="-1" role="main">
                <Switch>
                  {appRoutes.map((page, key) => (
                    <Route
                      path={page.path}
                      exact
                      component={page.component}
                      key={key}
                    />
                  ))}
                  <Route path="404" component={NotFound} />
                  <Route path="*">
                    <Redirect to="/404" />
                  </Route>
                </Switch>
              </main>
            </Page>
          </div>

          <footer className="app-footer">
            <span>Copyright © 2021 Nice Dash. All rights reserved.</span>
            <span className="ml-1">
              <Link to="">Terms</Link> | <Link to="">Privacy Policy</Link>
            </span>
          </footer>
        </div>
      </PageAlertProvider>
    </PageLoaderProvider>
  );
}

const mapStateToProps = (state) => ({
  events: selectors.events.getEvents(state),
  surveys: selectors.surveys.getSurveys(state),
  tags: selectors.tags.getTags(state),
  organizationName: selectors.user.getOrganizationName(state),
});

const mapDispatchToProps = {
  getEvents: actions.events.getEvents,
  getSurveys: actions.surveys.getSurveys,
  getTags: actions.tags.getTags,
  getUser: actions.user.getUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
