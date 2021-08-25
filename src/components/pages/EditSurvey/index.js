import React, { useCallback, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import { useFirebase } from "appFirebase";
import { CmsPage, CmsSurveys } from "components/common";
import handlePromise from "utils/handlePromise";
import useForm from "utils/useForm";
import {
  Survey,
  Questions,
  SurveyForm,
  SurveyFormFields,
  SurveyFormValidation,
} from "models";
import { actions, selectors } from "store";

function EditSurvey({
  updateSurvey,
  surveys,
  setSurveyImage,
  loadSurveysImages,
  loading,
}) {
  const history = useHistory();
  const firebase = useFirebase();
  const { id } = useParams();
  const survey = surveys?.find((s) => s.id === id) || {};
  const { data, handleInputChange, setFormField, handleSubmit, errors } =
    useForm(new SurveyForm({ ...survey }), SurveyFormValidation, onSubmit);

  const getSurveyImage = useCallback(async () => {
    /*
    if (!surveys || !loadSurveysImages || !loadSurveysImages[index]) {
      return;
    }
    const imageURL = await firebase.getImage(surveys[index].image);
    setSurveyImage(index, imageURL);
    setFormField(SurveyFormFields.image, imageURL);*/
  }, []);

  useEffect(getSurveyImage);

  async function onSubmit() {
    const body = new Survey(data);
    updateSurvey(id, body);
    // await handlePromise(firebase.uploadFile(body.image, data.image));
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
  //loadSurveysImages: selectors.getLoadSurveysImages(state),
});

const mapDispatchToProps = {
  updateSurvey: actions.surveys.updateSurvey,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditSurvey);
