export const SurveyFormFields = {
  title: "title",
  description: "description",
  image: "image",
  tags: "tags",
  questions: "questions",
};

export default class SurveyForm {
  constructor(survey = {}) {
    Object.assign(this, {
      title: "",
      description: "",
      image: "",
      tags: [],
      questions: [],
    }, survey)
  }
}

export const SurveyFormValidation = {
  title: { required: true },
  description: { required: true },
  image: { required: true },
  tags: { required: true },
};
