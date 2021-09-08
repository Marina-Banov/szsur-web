export const OrganizationFormFields = {
  name: "name",
  description: "description",
  mail: "contacts.mail",
  web: "contacts.web",
  facebook: "contacts.facebook",
  instagram: "contacts.instagram",
  linkedin: "contacts.linkedin",
  messenger: "contacts.messenger",
};

export default class OrganizationForm {
  constructor(organization = {}) {
    this.contacts = {
      mail: "",
      web: "",
      facebook: "",
      instagram: "",
      linkedin: "",
      messenger: "",
    };
    if (organization.contacts) {
      this.contacts = Object.assign(this.contacts, organization.contacts);
      delete organization.contacts;
    }
    Object.assign(
      this,
      {
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
