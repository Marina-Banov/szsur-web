export const OrganizationFormFields = {
  name: "name",
  description: "description",
};

export default class OrganizationForm {
  constructor(organization = {}) {
    Object.assign(
      this,
      {
        contacts: {
          mail: "",
          web: "",
          facebook: "",
          instagram: "",
          linkedin: "",
          messenger: "",
        },
        description: "",
        name: "",
      },
      organization
    );
  }
}

export const OrganizationFormValidation = {
  name: { required: true },
  description: { required: true },
};
