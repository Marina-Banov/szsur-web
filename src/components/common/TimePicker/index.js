import React, { useState } from "react";
import InputSlider from "react-input-slider";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { Input } from "reactstrap";

import "./index.scss";

export default function TimePicker({ initialValue, id, name, invalid, onChange }) {
  const [_initialValue] = useState(initialValue);
  const [m, setM] = useState(
    initialValue === "" ? moment(Date.now()) : moment(initialValue)
  );
  const [hasChanged, setHasChanged] = useState(false);
  const { t } = useTranslation();
  const [show, setShow] = useState(false);

  function changeHours(pos) {
    m.hours(pos.x);
    setM(moment(m.toISOString()));
    setHasChanged(true);
    onChange(m.format("HH:mm"));
  }

  function changeMinutes(pos) {
    m.minutes(pos.x);
    setM(moment(m.toISOString()));
    setHasChanged(true);
    onChange(m.format("HH:mm"));
  }

  return (
    <div>
      <Input
        id={id}
        name={name}
        invalid={invalid}
        onFocus={() => setShow(true)}
        onBlur={() => setShow(false)}
        value={_initialValue === "" && !hasChanged ? "" : m.format("HH:mm")}
        onChange={() => {}}
        autoComplete="off"
      />

      <div className={"sliders" + (show ? "" : " hidden")}>
        <div className="time-text">{t("events.hours")}</div>
        <InputSlider
          className="u-slider-time"
          xmin={0}
          xmax={23}
          xstep={1}
          x={m.hours()}
          onChange={changeHours}
        />
        <div className="time-text">{t("events.minutes")}</div>
        <InputSlider
          className="u-slider-time"
          xmin={0}
          xmax={59}
          xstep={5}
          x={m.minutes()}
          onChange={changeMinutes}
        />
      </div>
    </div>
  );
}
