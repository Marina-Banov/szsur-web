import React from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

const NotFound = () => {
  const { t } = useTranslation();
  return (
    <div>
      <div className="m-t-xxl text-center">
        <h1 className="error-number">404</h1>
        <h3 className="m-b">{t("404")}</h3>
        <NavLink to={"/home"}>{t("go_home")}</NavLink>
      </div>
    </div>
  );
};

export default NotFound;
