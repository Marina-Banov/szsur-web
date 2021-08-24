import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { paths } from "../../../constants";
import { useFirebase } from "appFirebase";
import { CmsPage, CmsEvents } from "components/common";
import handlePromise from "utils/handlePromise";
import useForm from "utils/useForm";
import { Event, EventForm, EventFormFields, EventFormValidation } from "models";

export default function EditEvent() {
  const history = useHistory();
  const firebase = useFirebase();
  const [loading, setLoading] = useState(false);
  const { event } = history.location;
  const { data, handleInputChange, setFormField, handleSubmit, errors } =
    useForm(new EventForm({ ...event }), EventFormValidation, onSubmit);

  async function onSubmit() {
    setLoading(true);
    let body = new Event(data);

    const res = await handlePromise(
      firebase.firestoreUpdate(paths.EVENTS, body)
    );
    if (res.error) {
      setLoading(false);
      return;
    }

    await handlePromise(firebase.uploadFile(body.image, data.image));

    setLoading(false);
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
