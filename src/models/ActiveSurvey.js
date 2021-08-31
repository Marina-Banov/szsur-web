export default class ActiveSurvey {
  constructor(form) {
    this.active = form.active;
    this.activeQuestion = form.activeQuestion;
    this.activeQuestionChoices = form.activeQuestionChoices;
    this.answersCount = form.answersCount;
    this.description = form.description;
    this.image = form.image;
    this.organisation = form.organisation;
    this.published = form.published;
    this.tags = form.tags;
    this.title = form.activeQuestion;
  }
}
