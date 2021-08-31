export default class Survey {
  constructor(form) {
    this.active = form.active;
    this.answersCount = form.answersCount;
    this.description = form.description;
    this.image = form.image;
    this.organisation = form.organisation;
    this.published = form.published;
    this.tags = form.tags;
    this.title = form.title;
  }
}

export class Questions {
  constructor(form) {
    const qs = [...form.questions];
    qs.forEach((q, i) => (q.order = (i + 1).toString()));
    this.questions = qs;
  }
}
