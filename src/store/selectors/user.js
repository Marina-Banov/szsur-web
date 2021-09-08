import { createSelector } from "reselect";

const getOrganizationName = createSelector(
  (state) => state.user.organizationName,
  (user) => user
);

const getIsLoading = createSelector(
  (state) => state.user.isLoading,
  (isLoading) => isLoading
);

export default { getOrganizationName, getIsLoading };
