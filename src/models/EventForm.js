import { combineDateTime, getISOTime, validDateRange } from "utils/dateUtils";
import moment from "moment";

export const EventFormFields = {
  title: "title",
  description: "description",
  image: "image",
  tags: "tags",
  endDate: "endDate",
  endTime: "endTime",
  location: "location",
  locationIsOnline: "location.online",
  locationValueOnline: "location.valueOnline",
  locationValueOnsite: "location.valueOnsite",
  organisation: "organisation",
  startDate: "startDate",
  startTime: "startTime",
};

export default class EventForm {
  constructor(event = {}) {
    if (event.id) {
      event.location = {
        online: event.online,
        valueOnline: event.online ? event.location : "",
        valueOnsite: event.online ? "" : event.location,
      };

      event.startDate = event.startTime;
      event.startTime = moment(event.startTime).format("HH:mm");
      event.endDate = event.endTime;
      event.endTime = moment(event.endTime).format("HH:mm");

      delete event.online;
      delete event.subscribers;
    }

    Object.assign(
      this,
      {
        title: "",
        description: "",
        image: "",
        tags: [],
        endDate: "",
        endTime: "",
        location: {
          online: null,
          valueOnline: "",
          valueOnsite: "",
        },
        organisation: "",
        startDate: "",
        startTime: "",
      },
      event
    );
  }
}

export const EventFormValidation = {
  title: { required: true },
  description: { required: true },
  //  image: { required: true },
  tags: { required: true },
  organisation: { required: true },
  startDate: { required: true },
  startTime: { required: true },
  endDate: {
    required: true,
    isValid: (form) => {
      const start = combineDateTime(form.startDate, getISOTime(form.startTime));
      const end = combineDateTime(form.endDate, getISOTime(form.endTime));
      return validDateRange(start, end);
    },
  },
  endTime: {
    required: true,
    isValid: (form) => {
      const start = combineDateTime(form.startDate, getISOTime(form.startTime));
      const end = combineDateTime(form.endDate, getISOTime(form.endTime));
      return validDateRange(start, end);
    },
  },
  "location.valueOnline": {
    isValid: (form) => {
      if (form.location.online === null) {
        return false;
      }
      if (form.location.online === false) {
        return true;
      }
      return form.location.valueOnline !== "";
    },
  },
  "location.valueOnsite": {
    isValid: (form) => {
      if (form.location.online === null) {
        return false;
      }
      if (form.location.online === true) {
        return true;
      }
      return form.location.valueOnsite.hasOwnProperty("place_id");
    },
  },
};
