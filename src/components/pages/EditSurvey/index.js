import React from "react";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import { CmsPage, CmsSurveys } from "components/common";
import useForm from "utils/useForm";
import {
  Survey,
  SurveyForm,
  SurveyFormFields,
  SurveyFormValidation,
} from "models";
import { actions, selectors } from "store";
import { paths } from "../../../constants";
import { toBase64 } from "utils/toBase64";

function EditSurvey({ updateSurvey, surveys, loading }) {
  const history = useHistory();
  const { id } = useParams();
  const survey = surveys?.find((s) => s.id === id) || {};
  const { data, handleInputChange, setFormField, handleSubmit, errors } =
    useForm(new SurveyForm({ ...survey }), SurveyFormValidation, onSubmit);

  async function onSubmit() {
    const body = new Survey(data);
    body.image = {
      name: paths.SURVEYS_STORAGE + data.image.name,
      base64: await toBase64(body.image),
    };
    updateSurvey(id, body);
    history.push("/surveys");
  }

  return (
    <CmsPage
      form={data}
      handleSubmit={handleSubmit}
      setFormField={setFormField}
      FormFields={SurveyFormFields}
      errors={errors}
      loading={loading}
      submitButtonText={"save_changes"}
    >
      <CmsSurveys
        form={data}
        handleInputChange={handleInputChange}
        setFormField={setFormField}
        errors={errors.fields}
      />
    </CmsPage>
  );
}

const mapStateToProps = (state) => ({
  surveys: selectors.surveys.getSurveys(state),
  loading: selectors.surveys.getIsLoading(state),
});

const mapDispatchToProps = {
  updateSurvey: actions.surveys.updateSurvey,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditSurvey);
