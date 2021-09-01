import React, { useState } from "react";
import { connect } from "react-redux";
import { LinearProgress } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { Button, Card, CardBody, Table } from "reactstrap";
import { Link } from "react-router-dom";

import { actions, selectors } from "store";
import { DeleteModal } from "components/common";

function Events({ events, getEvents, loading, deleteEvent, organization }) {
  const { t } = useTranslation();
  const [showDeleteModal, setShowDeleteModal] = useState(null);

  function displayDate(e) {
    return new Date(e.startTime).toLocaleString("hr", {
      dateStyle: "long",
      timeStyle: "short",
    });
  }

  return (
    <>
      <Card>
        <CardBody>
          <Button className="m-b m-r" onClick={() => getEvents(organization)}>
            <i className="fa fa-refresh" />
          </Button>
          <Link to="/events/new">
            <Button className="m-b" color="success">
              <i className="fa fa-plus" />
              &nbsp; {t("events.new_event")}
            </Button>
          </Link>
          <div className="table-wrapper">
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
                {events?.length > 0
                  ? events.map((e) => (
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
                            onClick={() => setShowDeleteModal(e)}
                          >
                            <i className="fa fa-trash" />
                          </Button>
                        </td>
                      </tr>
                    ))
                  : events && (
                      <tr>
                        <td colSpan={3} align="center">
                          {t("events.no_events")}
                        </td>
                      </tr>
                    )}
              </tbody>
            </Table>
          </div>
        </CardBody>
      </Card>
      <DeleteModal
        target={showDeleteModal}
        close={() => setShowDeleteModal(null)}
        onDelete={(e) => deleteEvent(e.id)}
        title={t("events.delete")}
        text={t("events.delete_sure", { title: showDeleteModal?.title })}
      />
    </>
  );
}

const mapStateToProps = (state) => ({
  events: selectors.events.getEvents(state),
  loading: selectors.events.getIsLoading(state),
  organization: selectors.user.getOrganization(state),
});

const mapDispatchToProps = {
  getEvents: actions.events.getEvents,
  deleteEvent: actions.events.deleteEvent,
};

export default connect(mapStateToProps, mapDispatchToProps)(Events);
