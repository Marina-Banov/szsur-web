import { createSelector } from "reselect";

const getOrganization = createSelector(
  (state) => state.user.organization,
  (user) => user
);

export default { getOrganization };
