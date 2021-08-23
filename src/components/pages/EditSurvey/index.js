import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import constants from "appConstants";
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

function EditSurvey({ surveys, setSurveyImage, loadSurveysImages }) {
  const history = useHistory();
  const firebase = useFirebase();
  const [loading, setLoading] = useState(false);
  const { index } = history.location;
  const { data, handleInputChange, setFormField, handleSubmit, errors } =
    useForm(
      new SurveyForm({ ...surveys[index] }),
      SurveyFormValidation,
      onSubmit
    );

  const getSurveyImage = useCallback(async () => {
    if (!surveys || !loadSurveysImages || !loadSurveysImages[index]) {
      return;
    }
    const imageURL = await firebase.getImage(surveys[index].image);
    setSurveyImage(index, imageURL);
    setFormField(SurveyFormFields.image, imageURL);
  }, [
    firebase,
    index,
    loadSurveysImages,
    setFormField,
    setSurveyImage,
    surveys,
  ]);

  useEffect(getSurveyImage);

  async function onSubmit() {
    setLoading(true);
    let body = new Survey(data);

    const res1 = await handlePromise(
      firebase.firestoreUpdate(constants.FIRESTORE_SURVEYS_PATH, body)
    );
    if (res1.error) {
      setLoading(false);
      return;
    }

    await handlePromise(firebase.uploadFile(body.image, data.image));

    const res2 = await handlePromise(
      firebase.firestoreCreateBulk(
        constants.FIRESTORE_QUESTIONS_COLLECTION,
        new Questions(data).questions,
        res1.data
      )
    );
    if (res2.error) {
      setLoading(false);
      return;
    }

    setLoading(false);
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
  surveys: selectors.getSurveys(state),
  loadSurveysImages: selectors.getLoadSurveysImages(state),
});

const mapDispatchToProps = {
  ...actions,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditSurvey);
