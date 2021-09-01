import { useEffect, useState } from "react";

export function isFormValid(form, validationRules) {
  const newErrors = { messages: [], fields: [] };

  if (!validationRules) {
    return newErrors;
  }

  for (const key in validationRules) {
    const value = form[key];
    const validation = validationRules[key];

    const required = validation?.required;
    if (
      required &&
      (!value || value === "" || value === {} || value.length === 0)
    ) {
      newErrors.fields.push(key);
      if (!newErrors.messages.includes("validation.required"))
        newErrors.messages.push("validation.required");
    }

    const custom = validation?.isValid;
    if (custom && !custom(form)) {
      newErrors.fields.push(key);
      if (!newErrors.messages.includes("validation.required"))
        newErrors.messages.push("validation.required");
    }
  }

  return newErrors;
}

export function useForm(initialValues, validationRules, onSubmit) {
  const [submitted, setSubmitted] = useState(false);
  const [data, setData] = useState(initialValues);
  const [errors, setErrors] = useState({ messages: [], fields: [] });

  const handleInputChange = (event) => {
    if (typeof event === "SyntheticInputEvent") {
      event.persist();
    }
    setFormField(event.target.name, event.target.value);
  };

  const setFormField = (name, value) => {
    setData((inputs) => ({ ...inputs, [name]: value }));
  };

  useEffect(() => {
    if (submitted) {
      setErrors(isFormValid(data, validationRules));
    }
  }, [data, submitted, validationRules]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    const newErrors = isFormValid(data, validationRules);
    setErrors(newErrors);
    if (newErrors.fields.length === 0) {
      onSubmit();
    }
  };

  return {
    data,
    handleInputChange,
    setFormField,
    handleSubmit,
    errors,
  };
}
