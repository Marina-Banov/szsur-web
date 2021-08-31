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
}

export const ActiveSurveyFormValidation = {
  activeQuestion: { required: true },
  tags: { required: true },
  image: { required: true },
};
