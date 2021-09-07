import React from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { CircularProgress } from "@material-ui/core";
import {
  Alert,
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
  Row,
} from "reactstrap";

import {
  OrganizationForm,
  OrganizationFormValidation,
  OrganizationFormFields as FormFields,
} from "models";
import { useForm } from "utils";
import { actions, selectors } from "store";

function Settings({
  organizationName,
  organization,
  loading,
  updateOrganization,
}) {
  const { t } = useTranslation();
  const { data, handleInputChange, handleSubmit, errors } = useForm(
    new OrganizationForm({ ...organization }),
    OrganizationFormValidation,
    onSubmit
  );
  const contactIcons = {
    web: "fa-globe",
    mail: "fa-envelope",
    facebook: "fa-facebook-square",
    instagram: "fa-instagram",
    linkedin: "fa-linkedin-square",
    // TODO
    messenger: "",
  };

  function onSubmit() {
    updateOrganization(organizationName, data);
  }

  return (
    <Row>
      <Col md={8}>
        <Card>
          <CardBody>
            <FormGroup>
              <Label for={FormFields.name}>{t("organization.name")}</Label>
              <Input
                id={FormFields.name}
                type="text"
                name={FormFields.name}
                onChange={handleInputChange}
                value={data.name}
                invalid={errors.fields.includes(FormFields.name)}
              />
            </FormGroup>
            <FormGroup className="mb-3">
              <Label for={FormFields.description}>{t("description")}</Label>
              <Input
                type="textarea"
                rows={8}
                name={FormFields.description}
                id={FormFields.description}
                onChange={handleInputChange}
                value={data.description}
                invalid={errors.fields.includes(FormFields.description)}
              />
            </FormGroup>
          </CardBody>
        </Card>
      </Col>
      <Col md={4}>
        <Card>
          <CardHeader>{t("organization.social_media")}</CardHeader>
          <CardBody>
            {Object.keys(data.contacts).map((c) => (
              <InputGroup className="my-2">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className={`fa ${contactIcons[c]}`} />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  type="text"
                  placeholder={c.charAt(0).toUpperCase() + c.substr(1)}
                  aria-label={c}
                  name={FormFields[c]}
                  id={FormFields[c]}
                  onChange={handleInputChange}
                  value={data.contacts[c]}
                />
              </InputGroup>
            ))}
          </CardBody>
        </Card>
        <Button block color="primary" disabled={loading} onClick={handleSubmit}>
          {t("save_changes")}
        </Button>

        {errors.messages.map((error, index) => (
          <Alert color="danger" className="mt-3" key={`error-${index}`}>
            {t(error)}
          </Alert>
        ))}
        {loading && (
          <div className="flex_center_center mt-3">
            <CircularProgress />
          </div>
        )}
      </Col>
    </Row>
  );
}

const mapStateToProps = (state) => ({
  organizationName: selectors.user.getOrganizationName(state),
  organization: selectors.organization.getOrganization(state),
  loading: selectors.organization.getIsLoading(state),
});

const mapDispatchToProps = {
  updateOrganization: actions.organization.updateOrganization,
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
