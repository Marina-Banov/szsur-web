import React from "react";
import { Button } from "reactstrap";
import { useTranslation } from "react-i18next";

import { useFirebase } from "appFirebase";

const Forbidden = () => {
  const firebase = useFirebase();
  const { t } = useTranslation();
  return (
    <div>
      <div className="m-t-xxl text-center">
        <h1 className="error-number">403</h1>
        <h3 className="m-b">{t("403")}</h3>
        <Button onClick={() => firebase.logOut()}>{t("logout")}</Button>
      </div>
    </div>
  );
};

export default Forbidden;
