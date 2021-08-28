import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import { CmsPage, CmsEvents } from "components/common";
import useForm from "utils/useForm";
import { Event, EventForm, EventFormFields, EventFormValidation } from "models";
import { actions, selectors } from "store";
import { paths } from "../../../constants";
import { toBase64 } from "utils/toBase64";

function NewEvent({ addEvent, loading }) {
  const history = useHistory();
  const { data, handleInputChange, setFormField, handleSubmit, errors } =
    useForm(new EventForm(), EventFormValidation, onSubmit);

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
});

const mapDispatchToProps = {
  addEvent: actions.events.addEvent,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewEvent);
