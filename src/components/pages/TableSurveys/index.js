import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { LinearProgress } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { Button, Card, CardBody, Table } from "reactstrap";
import { Link } from "react-router-dom";

import constants from "appConstants";
import { useFirebase } from "appFirebase";
import { actions, selectors } from "store";

function Surveys({ surveys, setSurveys }) {
  const { t } = useTranslation();
  const firebase = useFirebase();
  const [loading, setLoading] = useState();

  const getSurveys = useCallback(() => {
    firebase
      .firestoreRead(constants.FIRESTORE_SURVEYS_PATH)
      .then((res) => {
        setSurveys(res.body);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setSurveys([]);
        setLoading(false);
      });
  }, [firebase, setSurveys]);

  useEffect(() => {
    if (!surveys) {
      setLoading(true);
      getSurveys();
    }
  }, [surveys, getSurveys]);

  function deleteSurvey(id) {
    setLoading(true);
    firebase
      .firestoreDelete(constants.FIRESTORE_SURVEYS_PATH, id)
      .then(() => getSurveys())
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }

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
            {loading ? (
              <tr>
                <td colSpan={4} className="no-padding">
                  <LinearProgress />
                </td>
              </tr>
            ) : surveys ? (
              surveys.map((s) => (
                <tr key={s.id}>
                  <td>{s.title}</td>
                  <td>{s.answersCount}</td>
                  <td>
                    <i
                      className={`fa ${s.published ? "fa-check" : "fa-times"}`}
                    />
                  </td>
                  <td>
                    {
                    s.published ?
                      <Button className="mr-2 mb-1 py-1">
                        {t("edit")}
                      </Button>
                    :
                      <Button className="mr-2 mb-1 py-1">
                        {t("publish")}
                      </Button>
                    }
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
  surveys: selectors.getSurveys(state),
});

const mapDispatchToProps = {
  ...actions
}

export default connect(mapStateToProps, mapDispatchToProps)(Surveys);
