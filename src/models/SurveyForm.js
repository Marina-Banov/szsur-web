import { paths } from "../constants";
import { toBase64 } from "utils";

export const SurveyFormFields = {
  title: "title",
  description: "description",
  image: "image",
  tags: "tags",
  questions: "questions",
};

export default class SurveyForm {
  constructor(survey = {}) {
    Object.assign(
      this,
      {
        active: false,
        answersCount: 0,
        description: "",
        image: null,
        organisation: "",
        published: false,
        questions: [],
        tags: [],
        title: "",
      },
      survey
    );
  }

  static async finalTransformation(data) {
    delete data.id;
    data.questions.forEach((q, i) => (q.order = (i + 1).toString()));
    if (data.image instanceof File) {
      data.image = {
        name: paths.SURVEYS_STORAGE + data.image.name,
        base64: await toBase64(data.image),
      };
    }
  }
}

export const SurveyFormValidation = {
  title: { required: true },
  description: { required: true },
  image: { required: true },
  tags: { required: true },
};
