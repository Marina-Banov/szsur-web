import React, { useState } from "react";
import { connect } from "react-redux";
import { LinearProgress } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { Button, Card, CardBody, Table } from "reactstrap";
import { Link } from "react-router-dom";

import { actions, selectors } from "store";
import ActiveSurveyModal from "../ActiveSurveyModal";

function Surveys({ surveys, getSurveys, loading, deleteSurvey }) {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(null);

  return (
    <>
      <Card>
        <CardBody>
          <Button className="m-b m-r" onClick={getSurveys}>
            <i className="fa fa-refresh" />
          </Button>
          <Link to="/surveys/new">
            <Button className="m-b m-r" color="success">
              <i className="fa fa-plus" />
              &nbsp; {t("surveys.new_survey")}
            </Button>
          </Link>
          <Link to="/surveys/new/active">
            <Button className="m-b" color="success">
              <i className="fa fa-plus" />
              &nbsp; {t("surveys.new_active_survey")}
            </Button>
          </Link>
          <div className="table-wrapper">
            <Table hover>
              <thead>
                <tr>
                  <th>{t("title")}</th>
                  <th>{t("surveys.number_of_answers")}</th>
                  <th>{t("status")}</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {loading && (
                  <tr>
                    <td colSpan={4} className="no-padding">
                      <LinearProgress />
                    </td>
                  </tr>
                )}
                {surveys?.length > 0
                  ? surveys.map((s) => (
                      <tr key={s.id}>
                        <td>{s.title}</td>
                        <td>{s.answersCount}</td>
                        <td>
                          {t(
                            s.published
                              ? "surveys.published"
                              : s.active
                              ? "surveys.active"
                              : "surveys.unpublished"
                          )}
                        </td>
                        <td className="text-right">
                          {s.published ? (
                            <Link to={{ pathname: `surveys/${s.id}` }}>
                              <Button className="py-1 icon">
                                <i className="fa fa-pencil" />
                              </Button>
                            </Link>
                          ) : s.active ? (
                            <Button
                              className="ml-2 py-1 icon"
                              onClick={() => setShowModal(s)}
                            >
                              <i className="fa fa-eye" />
                            </Button>
                          ) : (
                            <Button className="ml-2 py-1 icon">
                              <i className="fa fa-check" />
                            </Button>
                          )}
                          <Button
                            color="danger"
                            className="ml-2 py-1 icon"
                            onClick={() => deleteSurvey(s.id)}
                          >
                            <i className="fa fa-trash" />
                          </Button>
                        </td>
                      </tr>
                    ))
                  : surveys && (
                      <tr>
                        <td colSpan={4} align="center">
                          {t("surveys.no_surveys")}
                        </td>
                      </tr>
                    )}
              </tbody>
            </Table>
          </div>
        </CardBody>
      </Card>
      <ActiveSurveyModal survey={showModal} close={() => setShowModal(null)} />
    </>
  );
}

const mapStateToProps = (state) => ({
  surveys: selectors.surveys.getSurveys(state),
  loading: selectors.surveys.getIsLoading(state),
});

const mapDispatchToProps = {
  getSurveys: actions.surveys.getSurveys,
  deleteSurvey: actions.surveys.deleteSurvey,
};

export default connect(mapStateToProps, mapDispatchToProps)(Surveys);
