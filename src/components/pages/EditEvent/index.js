import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { connect } from "react-redux";

import { useFirebase } from "appFirebase";
import { CmsPage, CmsEvents } from "components/common";
import useForm from "utils/useForm";
import { Event, EventForm, EventFormFields, EventFormValidation } from "models";
import { actions, selectors } from "store";

function EditEvent({ events, loading, updateEvent }) {
  const history = useHistory();
  const { id } = useParams();
  const event = events?.find((e) => e.id === id) || {};
  const { data, handleInputChange, setFormField, handleSubmit, errors } =
    useForm(new EventForm({ ...event }), EventFormValidation, onSubmit);
  const firebase = useFirebase();

  async function onSubmit() {
    let body = new Event(data);
    updateEvent(event.id, body);
    // await firebase.uploadFile(body.image, data.image);
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
      submitButtonText={"save_changes"}
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
  events: selectors.events.getEvents(state),
  loading: selectors.events.getIsLoading(state),
});

const mapDispatchToProps = {
  updateEvent: actions.events.updateEvent,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditEvent);
