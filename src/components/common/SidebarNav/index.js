import React from "react";
import { connect } from "react-redux";

import navigation from "./navigation";
import { PageAlertContext } from "components/common";
import Logo from "assets/logo.svg";
import NavSingleItem from "./NavSingleItem";
import NavDropdownItem from "./NavDropdownItem";
import { selectors } from "store";

function SidebarNav({ toggleSidebar, isSidebarCollapsed, organizationName }) {
  const navItems = (items) => {
    return items.map((item, index) => itemType(item, index));
  };

  const itemType = (item, index) => {
    if (item.children) {
      return (
        <NavDropdownItem
          key={index}
          item={item}
          isSidebarCollapsed={isSidebarCollapsed}
        />
      );
    } else if (item.divider) {
      return <li key={index} className="separator" />;
    } else {
      return <NavSingleItem item={item} key={index} />;
    }
  };

  const NavBrand = ({ logo, logoText }) => {
    const screenReaderLabel = isSidebarCollapsed
      ? "Expand Sidebar Navigation"
      : "Collapse Sidebar Navigation";

    return (
      <div className="site-logo-bar mb-3">
        <button
          onClick={toggleSidebar}
          className="navbar-brand"
          aria-label={screenReaderLabel}
        >
          {logo && <img src={logo} alt="" />}
          {logoText && <span className="logo-text">{logoText}</span>}
        </button>
      </div>
    );
  };

  return (
    <PageAlertContext.Consumer>
      {(consumer) => {
        const hasPageAlertClass = consumer.alert ? "has-alert" : "";
        return (
          <div>
            <div className={`app-sidebar ${hasPageAlertClass}`}>
              <NavBrand logo={Logo} logoText={organizationName} />
              <nav>
                <ul id="main-menu">
                  {navItems(navigation.top)}
                  <li className="nav-item nav-item-spacer" />
                  {navItems(navigation.bottom)}
                </ul>
              </nav>
            </div>
            {isSidebarCollapsed && (
              <div className="sidebar-overlay" onClick={toggleSidebar} />
            )}
          </div>
        );
      }}
    </PageAlertContext.Consumer>
  );
}

const mapStateToProps = (state) => ({
  organizationName: selectors.user.getOrganizationName(state),
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SidebarNav);
