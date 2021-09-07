import React from "react";
import { Button } from "reactstrap";

import { useFirebase } from "appFirebase";

const Forbidden = () => {
  const firebase = useFirebase();
  return (
    <div>
      <div className="m-t-xxl text-center">
        <h1 className="error-number">403</h1>
        <h3 className="m-b">Nemate pristup ovoj stranici</h3>
        <Button onClick={() => firebase.logOut()}>Odjava</Button>
      </div>
    </div>
  );
};

export default Forbidden;
