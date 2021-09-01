import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import { CmsPage, CmsSurveys } from "components/common";
import { useForm } from "utils";
import { SurveyForm, SurveyFormFields, SurveyFormValidation } from "models";
import { actions, selectors } from "store";

function NewSurvey({ addSurvey, loading, organisation }) {
  const history = useHistory();
  const { data, handleInputChange, setFormField, handleSubmit, errors } =
    useForm(new SurveyForm({ organisation }), SurveyFormValidation, onSubmit);

  async function onSubmit() {
    await SurveyForm.finalTransformation(data);
    addSurvey(data);
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
      submitButtonText={"surveys.add_new_survey"}
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
  loading: selectors.surveys.getIsLoading(state),
  organisation: selectors.user.getOrganization(state),
});

const mapDispatchToProps = {
  addSurvey: actions.surveys.addSurvey,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewSurvey);
