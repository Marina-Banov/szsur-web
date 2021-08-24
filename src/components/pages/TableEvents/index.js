import React, { useEffect } from "react";
import { connect } from "react-redux";
import { LinearProgress } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { Button, Card, CardBody, Table } from "reactstrap";
import { Link } from "react-router-dom";

import { paths } from "../../../constants";
import { useFirebase } from "appFirebase";
import { actions, selectors } from "store";

function Events({ events, loading, getEvents }) {
  const { t } = useTranslation();
  const firebase = useFirebase();

  useEffect(() => {
    if (!events) {
      getEvents();
    }
  }, [events, getEvents]);

  function displayDate(e) {
    return new Date(e.startTime._seconds * 1000).toLocaleString("hr", {
      dateStyle: "long",
      timeStyle: "short",
    });
  }

  function deleteEvent(id) {
    firebase
      .firestoreDelete(paths.EVENTS, id)
      .then(() => actions.events.getEvents())
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <Card>
      <CardBody>
        <Link to="/events/new">
          <Button className="m-b" color="success">
            <i className="fa fa-plus" />
            &nbsp; {t("events.new_event")}
          </Button>
        </Link>
        <Table hover>
          <thead>
            <tr>
              <th>{t("title")}</th>
              <th>{t("events.start_time")}</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={3} className="no-padding">
                  <LinearProgress />
                </td>
              </tr>
            ) : events ? (
              events.map((e) => (
                <tr key={e.id}>
                  <td>{e.title}</td>
                  <td>{displayDate(e)}</td>
                  <td>
                    <Link to={{ pathname: `events/${e.id}`, event: e }}>
                      <Button className="mr-2 mb-1 py-1">{t("edit")}</Button>
                    </Link>
                    <Button
                      color="danger"
                      className="py-1"
                      onClick={() => deleteEvent(e.id)}
                    >
                      {t("delete")}
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} align="center">
                  {t("events.no_events")}
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </CardBody>
    </Card>
  );
}

const mapStateToProps = (state) => ({
  events: selectors.events.getEvents(state),
  loading: selectors.events.getIsLoading(state),
});

const mapDispatchToProps = {
  getEvents: actions.events.getEvents,
};

export default connect(mapStateToProps, mapDispatchToProps)(Events);
