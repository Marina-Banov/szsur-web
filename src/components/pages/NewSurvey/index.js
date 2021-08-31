import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import { useFirebase } from "appFirebase";
import { CmsPage, CmsSurveys } from "components/common";
import { handlePromise, toBase64, useForm } from "utils";
import {
  Survey,
  Questions,
  SurveyForm,
  SurveyFormFields,
  SurveyFormValidation,
} from "models";
import { actions, selectors } from "store";
import { paths } from "../../../constants";

function NewSurvey({ addSurvey, loading }) {
  const history = useHistory();
  const firebase = useFirebase();
  const { data, handleInputChange, setFormField, handleSubmit, errors } =
    useForm(new SurveyForm(), SurveyFormValidation, onSubmit);

  async function onSubmit() {
    const body = new Survey(data);
    body.image = {
      name: paths.SURVEYS_STORAGE + data.image.name,
      base64: await toBase64(body.image),
    };
    addSurvey(body);

    /*  const res2 = await handlePromise(
          firebase.firestoreCreateBulk(
            common.FIRESTORE_QUESTIONS_COLLECTION,
            new Questions(data).questions,
            res1.data
          )
        );
        if (res2.error) {
          setLoading(false);
          return;
        }*/
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
});

const mapDispatchToProps = {
  addSurvey: actions.surveys.addSurvey,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewSurvey);
