import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import { useFirebase } from "appFirebase";
import { CmsPage, CmsEvents } from "components/common";
import handlePromise from "utils/handlePromise";
import useForm from "utils/useForm";
import { Event, EventForm, EventFormFields, EventFormValidation } from "models";
import { actions, selectors } from "store";

function NewEvent({ addEvent, loading }) {
  const history = useHistory();
  const firebase = useFirebase();
  const { data, handleInputChange, setFormField, handleSubmit, errors } =
    useForm(new EventForm(), EventFormValidation, onSubmit);

  async function onSubmit() {
    const body = new Event(data);
    addEvent(body);
    // await handlePromise(firebase.uploadFile(body.image, data.image));
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
});

const mapDispatchToProps = {
  addEvent: actions.events.addEvent,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewEvent);
