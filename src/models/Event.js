import { combineDateTime, getISOTime } from "utils/dateUtils";

export default class Event {
  constructor(form) {
    this.title = form.title;
    this.description = form.description;
    this.startTime = combineDateTime(
      form.startDate,
      getISOTime(form.startTime)
    );
    this.endTime = combineDateTime(form.endDate, getISOTime(form.endTime));
    this.online = form.location.online;
    this.location = form.location.online
      ? form.location.valueOnline
      : form.location.valueOnsite.place_id;
    this.image = form.image;
    this.organisation = form.organisation;
    this.tags = form.tags;
    this.subscribers = [];
  }
}
