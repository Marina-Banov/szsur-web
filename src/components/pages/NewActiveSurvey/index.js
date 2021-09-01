import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import {
  Alert,
  Button,
  Card,
  CardBody,
  Col,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";

import { useForm } from "utils";
import {
  ActiveSurveyForm,
  ActiveSurveyFormValidation,
  ActiveSurveyFormFields as FormFields,
} from "models";
import { actions, selectors } from "store";
import TagsCard from "components/common/CmsPage/TagsCard";
import ImageCard from "components/common/CmsPage/ImageCard";
import { common } from "../../../constants";

function NewActiveSurvey({ addSurvey, loading, organisation }) {
  const history = useHistory();
  const { t } = useTranslation();
  const { data, handleInputChange, setFormField, handleSubmit, errors } =
    useForm(
      new ActiveSurveyForm({ organisation }),
      ActiveSurveyFormValidation,
      onSubmit
    );

  async function onSubmit() {
    await ActiveSurveyForm.finalTransformation(data);
    addSurvey(data);
    history.push("/surveys");
  }

  function handleChoiceChange(event, index) {
    const choices = [...data.activeQuestionChoices];
    choices[index] = event.target.value;
    setFormField(FormFields.activeQuestionChoices, choices);
  }

  function addChoice() {
    const choices = [...data.activeQuestionChoices];
    choices.push("");
    setFormField(FormFields.activeQuestionChoices, choices);
  }

  function removeChoice(index) {
    const choices = [...data.activeQuestionChoices];
    choices.splice(index, 1);
    setFormField(FormFields.activeQuestionChoices, choices);
  }

  return (
    <Row>
      <Col md={8}>
        <Card>
          <CardBody>
            <FormGroup>
              <Label for={FormFields.activeQuestion}>
                {t("surveys.question_title")}
              </Label>
              <Input
                id={FormFields.activeQuestion}
                type="text"
                name={FormFields.activeQuestion}
                onChange={handleInputChange}
                value={data.activeQuestion}
                invalid={errors.fields.includes(FormFields.activeQuestion)}
              />
            </FormGroup>

            {data.activeQuestionChoices.map((choice, index) => (
              <FormGroup
                key={`choice-${index}`}
                className="flex_center_center input-with-button single"
              >
                <Input
                  placeholder={t("surveys.choice_number", {
                    number: index + 1,
                  })}
                  value={choice}
                  className={index > 1 ? "mr-2 " : ""}
                  onChange={(event) => handleChoiceChange(event, index)}
                />
                {index > 1 && (
                  <Button color="danger" onClick={() => removeChoice(index)}>
                    <i className="fa fa-trash" />
                  </Button>
                )}
              </FormGroup>
            ))}

            <Button
              className="mb-3"
              color="success"
              onClick={addChoice}
              disabled={
                data.activeQuestionChoices.length === common.SURVEY_MAX_CHOICES
              }
            >
              <i className="fa fa-plus" />
              &nbsp; {t("surveys.new_choice")}
            </Button>
          </CardBody>
        </Card>
        <ImageCard
          errors={errors}
          setFormField={setFormField}
          FormFields={FormFields}
          form={data}
        />
      </Col>
      <Col md={4}>
        <TagsCard
          form={data}
          errors={errors}
          setFormField={setFormField}
          FormFields={FormFields}
        />

        <Button block color="primary" disabled={loading} onClick={handleSubmit}>
          {t("surveys.add_new_survey")}
        </Button>

        {errors.messages.map((error, index) => (
          <Alert color="danger" className="mt-3" key={`error-${index}`}>
            {t(error)}
          </Alert>
        ))}
        {loading && (
          <div className="flex_center_center mt-3">
            <CircularProgress />
          </div>
        )}
      </Col>
    </Row>
  );
}

const mapStateToProps = (state) => ({
  loading: selectors.surveys.getIsLoading(state),
  organisation: selectors.user.getOrganization(state),
});

const mapDispatchToProps = {
  addSurvey: actions.surveys.addSurvey,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewActiveSurvey);
