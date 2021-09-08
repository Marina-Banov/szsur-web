import React from "react";
import {
  CardBody,
  FormGroup,
  Label,
  Input,
  Button,
  Card,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
} from "reactstrap";
import { Divider } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import EmojiPicker from "emoji-picker-react";

import { SurveyFormFields as FormFields } from "models";
import { common } from "../../../constants";
import NewQuestion from "./NewQuestion";

export default function CmsSurveys({
  form,
  handleInputChange,
  setFormField,
  errors,
}) {
  const { t } = useTranslation();

  function addQuestion() {
    setFormField(
      FormFields.questions,
      form.questions.concat({
        question: "",
        type: common.SURVEY_QUESTION_TYPE_TEXT,
        required: false,
      })
    );
  }

  function deleteQuestion(index) {
    setFormField(
      FormFields.questions,
      form.questions.filter((q, idx) => idx !== index)
    );
  }

  function updateQuestion(index, newQ) {
    setFormField(
      FormFields.questions,
      form.questions.map((q, idx) => (idx === index ? newQ : q))
    );
  }

  return (
    <Card>
      <CardBody>
        <FormGroup>
          <Label for={FormFields.title}>{t("title")}</Label>
          <Input
            id={FormFields.title}
            type="text"
            name={FormFields.title}
            onChange={handleInputChange}
            value={form.title}
            invalid={errors.includes(FormFields.title)}
          />
        </FormGroup>
        <FormGroup className="mb-3">
          <Label for={FormFields.description}>{t("description")}</Label>
          <Input
            type="textarea"
            rows={8}
            name={FormFields.description}
            id={FormFields.description}
            onChange={handleInputChange}
            value={form.description}
            invalid={errors.includes(FormFields.description)}
          />
          <div className="emoji-holder">
            <UncontrolledDropdown>
              <DropdownToggle>
                <i className="fa fa-smile-o" />
              </DropdownToggle>
              <DropdownMenu>
                <EmojiPicker
                  onEmojiClick={(e, { emoji }) =>
                    setFormField(
                      FormFields.description,
                      form.description.concat(emoji)
                    )
                  }
                />
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        </FormGroup>

        {!form.published &&
          form.questions.map((q, index) => (
            <NewQuestion
              key={index}
              question={q}
              order={index}
              updateQuestion={updateQuestion}
              deleteQuestion={deleteQuestion}
            />
          ))}

        {!form.published && (
          <FormGroup>
            <Divider className="mb-3" />
            <Button
              block
              color="success"
              onClick={addQuestion}
              disabled={form.questions.length === common.SURVEY_MAX_QUESTIONS}
            >
              <i className="fa fa-plus" />
              &nbsp; {t("surveys.new_question")}
            </Button>
          </FormGroup>
        )}
      </CardBody>
    </Card>
  );
}
