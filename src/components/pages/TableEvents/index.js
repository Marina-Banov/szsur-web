import React from "react";
import { connect } from "react-redux";
import { LinearProgress } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { Button, Card, CardBody, Table } from "reactstrap";
import { Link } from "react-router-dom";

import { actions, selectors } from "store";

function Events({ events, getEvents, loading, deleteEvent }) {
  const { t } = useTranslation();

  function displayDate(e) {
    return new Date(e.startTime).toLocaleString("hr", {
      dateStyle: "long",
      timeStyle: "short",
    });
  }

  return (
    <Card>
      <CardBody>
        <Button className="m-b m-r" onClick={getEvents}>
          <i className="fa fa-refresh" />
        </Button>
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
            {loading && (
              <tr>
                <td colSpan={3} className="no-padding">
                  <LinearProgress />
                </td>
              </tr>
            )}
            {events ? (
              events.map((e) => (
                <tr key={e.id}>
                  <td>{e.title}</td>
                  <td>{displayDate(e)}</td>
                  <td className="text-right">
                    <Link to={{ pathname: `events/${e.id}` }}>
                      <Button className="py-1 icon">
                        <i className="fa fa-pencil" />
                      </Button>
                    </Link>
                    <Button
                      color="danger"
                      className="ml-2 py-1 icon"
                      onClick={() => deleteEvent(e.id)}
                    >
                      <i className="fa fa-trash" />
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
  deleteEvent: actions.events.deleteEvent,
};

export default connect(mapStateToProps, mapDispatchToProps)(Events);
