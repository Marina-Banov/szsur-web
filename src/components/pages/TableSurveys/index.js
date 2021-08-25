import React, { useEffect } from "react";
import { connect } from "react-redux";
import { LinearProgress } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { Button, Card, CardBody, Table } from "reactstrap";
import { Link } from "react-router-dom";

import { actions, selectors } from "store";

function Surveys({ surveys, getSurveys, loading, deleteSurvey }) {
  const { t } = useTranslation();

  useEffect(() => {
    if (!surveys) {
      getSurveys();
    }
  }, [surveys, getSurveys]);

  return (
    <Card>
      <CardBody>
        <Link to="/surveys/new">
          <Button className="m-b" color="success">
            <i className="fa fa-plus" />
            &nbsp; {t("surveys.new_survey")}
          </Button>
        </Link>
        <Table hover>
          <thead>
            <tr>
              <th>{t("title")}</th>
              <th>{t("surveys.number_of_answers")}</th>
              <th>{t("surveys.published")}</th>
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
            {surveys ? (
              surveys.map((s, index) => (
                <tr key={s.id}>
                  <td>{s.title}</td>
                  <td>{s.answersCount}</td>
                  <td>
                    <i
                      className={`fa ${s.published ? "fa-check" : "fa-times"}`}
                    />
                  </td>
                  <td>
                    {s.published ? (
                      <Link to={{ pathname: `surveys/${s.id}`, index }}>
                        <Button className="mr-2 mb-1 py-1">{t("edit")}</Button>
                      </Link>
                    ) : (
                      <Button className="mr-2 mb-1 py-1">{t("publish")}</Button>
                    )}
                    <Button
                      color="danger"
                      className="py-1"
                      onClick={() => deleteSurvey(s.id)}
                    >
                      {t("delete")}
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} align="center">
                  {t("surveys.no_surveys")}
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
  surveys: selectors.surveys.getSurveys(state),
  loading: selectors.surveys.getIsLoading(state),
});

const mapDispatchToProps = {
  getSurveys: actions.surveys.getSurveys,
  deleteSurvey: actions.surveys.deleteSurvey,
};

export default connect(mapStateToProps, mapDispatchToProps)(Surveys);
