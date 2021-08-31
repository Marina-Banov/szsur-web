import { combineDateTime, getISOTime } from "utils";

export default class Event {
  constructor(form) {
    this.description = form.description;
    this.endTime = combineDateTime(form.endDate, getISOTime(form.endTime));
    this.image = form.image;
    this.location = form.location.online
      ? form.location.valueOnline
      : form.location.valueOnsite.place_id;
    this.online = form.location.online;
    this.organisation = form.organisation;
    this.startTime = combineDateTime(
      form.startDate,
      getISOTime(form.startTime)
    );
    this.tags = form.tags;
    this.title = form.title;
  }
}
