import {
  Dashboard,
  EditEvent,
  EditSurvey,
  NewActiveSurvey,
  NewEvent,
  NewSurvey,
  NotFound,
  PublishSurvey,
  Settings,
  TableEvents,
  TableSurveys,
} from "components/pages";

const mainRoutes = [
  {
    name: "Početna",
    path: "/home",
    component: Dashboard,
  },
  {
    name: "Profil",
    path: "/profile",
    component: Dashboard,
  },
  {
    name: "404",
    path: "/404",
    component: NotFound,
  },
  {
    name: "Događaji",
    path: "/events",
    component: TableEvents,
  },
  {
    name: "Novi događaj",
    path: "/events/new",
    component: NewEvent,
  },
  {
    name: "Ankete",
    path: "/surveys",
    component: TableSurveys,
  },
  {
    name: "Nova anketa",
    path: "/surveys/new",
    component: NewSurvey,
  },
  {
    name: "Nova aktivna anketa",
    path: "/surveys/new/active",
    component: NewActiveSurvey,
  },
  {
    name: "Uredi događaj",
    path: "/events/:id",
    component: EditEvent,
  },
  {
    name: "Uredi anketu",
    path: "/surveys/:id",
    component: EditSurvey,
  },
  {
    name: "Objavi rezultate ankete",
    path: "/surveys/publish/:id",
    component: PublishSurvey,
  },
  {
    name: "Profil udruge",
    path: "/settings",
    component: Settings,
  },
];

export default mainRoutes;
