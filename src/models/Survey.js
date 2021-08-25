import { paths } from "../constants";

export default class Survey {
  constructor(form) {
    this.title = form.title;
    this.description = form.description;
    this.image = paths.SURVEYS_STORAGE + form.image.name;
    this.tags = form.tags;
    this.published = form.published;
    this.answersCount = form.answersCount;
  }
}

export class Questions {
  constructor(form) {
    const qs = [...form.questions];
    qs.forEach((q, i) => (q.order = (i + 1).toString()));
    this.questions = qs;
  }
}
