import React from "react";
import { useTranslation } from "react-i18next";
import { Row, Col } from "reactstrap";
import { connect } from "react-redux";

import { selectors } from "store";

function Dashboard({ organization }) {
  const { t } = useTranslation();

  return (
    <div>
      <Row>
        <Col md={6}>
          <div className="home-hero" style={{ padding: "50px 0 70px" }}>
            <h1>{organization?.name}</h1>
            <p className="text-muted">
              {t("home_p1")}
              <br />
              {t("home_p2")}
            </p>
          </div>
        </Col>
      </Row>
    </div>
  );
}

const mapStateToProps = (state) => ({
  organization: selectors.organization.getOrganization(state),
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
