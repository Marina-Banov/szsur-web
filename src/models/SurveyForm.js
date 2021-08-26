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
        title: "",
        description: "",
        image: null,
        tags: [],
        questions: [],
        published: false,
        answersCount: 0,
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
