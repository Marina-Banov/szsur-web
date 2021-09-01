import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import { CmsPage, CmsEvents } from "components/common";
import { toBase64, useForm } from "utils";
import { Event, EventForm, EventFormFields, EventFormValidation } from "models";
import { actions, selectors } from "store";
import { paths } from "../../../constants";

function NewEvent({ addEvent, loading, organisation }) {
  const history = useHistory();
  const { data, handleInputChange, setFormField, handleSubmit, errors } =
    useForm(new EventForm({ organisation }), EventFormValidation, onSubmit);

  async function onSubmit() {
    const body = new Event(data);
    body.image = {
      name: paths.EVENTS_STORAGE + data.image.name,
      base64: await toBase64(body.image),
    };
    addEvent(body);
    history.push("/events");
  }

  return (
    <CmsPage
      form={data}
      handleSubmit={handleSubmit}
      setFormField={setFormField}
      FormFields={EventFormFields}
      errors={errors}
      loading={loading}
      submitButtonText={"events.add_new_event"}
    >
      <CmsEvents
        form={data}
        handleInputChange={handleInputChange}
        setFormField={setFormField}
        errors={errors.fields}
      />
    </CmsPage>
  );
}

const mapStateToProps = (state) => ({
  loading: selectors.events.getIsLoading(state),
  organisation: selectors.user.getOrganization(state),
});

const mapDispatchToProps = {
  addEvent: actions.events.addEvent,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewEvent);
