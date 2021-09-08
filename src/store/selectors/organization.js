import { createSelector } from "reselect";

const getOrganization = createSelector(
  (state) => state.organization.data,
  (organization) => organization
);

const getIsLoading = createSelector(
  (state) => state.organization.isLoading,
  (isLoading) => isLoading
);

export default {
  getOrganization,
  getIsLoading,
};
