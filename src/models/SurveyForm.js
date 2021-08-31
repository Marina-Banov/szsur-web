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
}

export const SurveyFormValidation = {
  title: { required: true },
  description: { required: true },
  image: { required: true },
  tags: { required: true },
};
