import { paths } from "../constants";
import { toBase64 } from "utils";

export const ActiveSurveyFormFields = {
  activeQuestion: "activeQuestion",
  activeQuestionChoices: "activeQuestionChoices",
  tags: "tags",
  image: "image",
};

export default class ActiveSurveyForm {
  constructor(survey = {}) {
    Object.assign(
      this,
      {
        active: true,
        activeQuestion: "",
        activeQuestionChoices: ["", ""],
        answersCount: 0,
        description: "",
        image: null,
        organisation: "",
        published: false,
        tags: [],
        title: "",
      },
      survey
    );
  }

  static async finalTransformation(data) {
    delete data.id;
    if (data.image instanceof File) {
      data.image = {
        name: paths.SURVEYS_STORAGE + data.image.name,
        base64: await toBase64(data.image),
      };
    }
  }
}

export const ActiveSurveyFormValidation = {
  activeQuestion: { required: true },
  tags: { required: true },
  image: { required: true },
};
