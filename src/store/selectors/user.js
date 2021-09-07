import { createSelector } from "reselect";

const getOrganizationName = createSelector(
  (state) => state.user.organizationName,
  (user) => user
);

export default { getOrganizationName };
