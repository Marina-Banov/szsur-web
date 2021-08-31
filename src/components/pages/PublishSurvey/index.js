import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { actions, selectors } from "store";
import { ExportButton } from "components/common";

function PublishSurvey({
  surveys,
  getSurveyResults,
  getSurveyQuestions,
  loading,
}) {
  const { t } = useTranslation();
  const { id } = useParams();
  const [csvData, setCsvData] = useState([]);
  const [survey, setSurvey] = useState(null);

  useEffect(() => {
    if (surveys) {
      setSurvey(surveys.find((s) => s.id === id));
    }
  }, [id, surveys]);

  useEffect(() => {
    if (survey && !survey.results) {
      getSurveyResults(survey.id);
    }
  }, [getSurveyResults, survey]);

  useEffect(() => {
    if (survey && !survey.questions) {
      getSurveyQuestions(survey.id);
    }
  }, [getSurveyQuestions, survey]);

  useEffect(() => {
    if (!survey || !survey.questions || !survey.results) {
      return;
    }

    const questions = Object.assign(
      {},
      ...survey.questions.map((q) => {
        const obj = {};
        obj[q.order] = q.question;
        return obj;
      })
    );

    const csv = survey.results.map(({ id, ...res }) => {
      Object.keys(res).forEach((key) => {
        res[questions[key]] = res[key].toString();
        delete res[key];
      });
      return res;
    });

    setCsvData(csv);
  }, [survey, surveys]);

  return (
    <ExportButton
      csvData={csvData}
      fileName={t("surveys.results_filename")}
      loading={loading}
    />
  );
}

const mapStateToProps = (state) => ({
  surveys: selectors.surveys.getSurveys(state),
  loading: selectors.surveys.getIsLoading(state),
});

const mapDispatchToProps = {
  getSurveyResults: actions.surveys.getSurveyResults,
  getSurveyQuestions: actions.surveys.getSurveyQuestions,
};

export default connect(mapStateToProps, mapDispatchToProps)(PublishSurvey);
