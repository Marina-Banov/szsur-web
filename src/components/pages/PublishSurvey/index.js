import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  DropdownMenu,
  DropdownToggle,
  FormGroup,
  Input,
  Label,
  Row,
  UncontrolledDropdown,
} from "reactstrap";
import { useTranslation } from "react-i18next";
import { Camera } from "react-feather";
import EmojiPicker from "emoji-picker-react";

import { actions, selectors } from "store";
import { ExportButton } from "components/common";
import { paths } from "../../../constants";
import { toBase64 } from "utils";

import "./index.scss";

function PublishSurvey({ surveys, loading, updateSurvey }) {
  const history = useHistory();
  const { t } = useTranslation();
  const { id } = useParams();
  const [csvData, setCsvData] = useState([]);
  const [survey, setSurvey] = useState(null);

  // only updating these two fields
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (surveys) {
      setSurvey(surveys.find((s) => s.id === id));
    }
  }, [id, surveys]);

  useEffect(() => {
    if (!survey || !survey.questions || !survey.results) {
      return;
    }

    const questions = Object.assign(
      {},
      ...survey.questions.map((q) => {
        const obj = {};
        obj[q.order] = q.question;
        return obj;
      })
    );

    const csv = survey.results.map(({ id, ...res }) => {
      Object.keys(res).forEach((key) => {
        res[questions[key]] = res[key].toString();
        delete res[key];
      });
      return res;
    });

    setCsvData(csv);
  }, [survey, surveys]);

  async function onSubmit() {
    const resultImages = await Promise.all(
      images.map(async (i) => ({
        name: paths.SURVEYS_STORAGE + i.name,
        base64: await toBase64(i),
      }))
    );
    updateSurvey(id, {
      description,
      resultImages,
      published: true,
    });
    history.push("/surveys");
  }

  return (
    <Row className="flex-column-reverse flex-md-row">
      <Col md={8}>
        <Card>
          <CardBody>
            <FormGroup className="mb-3">
              <Label for="description">{t("description")}</Label>
              <Input
                type="textarea"
                rows={8}
                name="description"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <div className="emoji-holder">
                <UncontrolledDropdown>
                  <DropdownToggle>
                    <i className="fa fa-smile-o" />
                  </DropdownToggle>
                  <DropdownMenu>
                    <EmojiPicker
                      onEmojiClick={(e, { emoji }) =>
                        setDescription((d) => d.concat(emoji))
                      }
                    />
                  </DropdownMenu>
                </UncontrolledDropdown>
              </div>
            </FormGroup>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>{t("images.images")}</CardHeader>
          <CardBody>
            <label htmlFor="resultImages" className="btn btn-secondary">
              <Camera size={18} className="mb-1 mr-2" />
              {t("images.add_image")}
            </label>
            <input
              id="resultImages"
              name="resultImages"
              type="file"
              accept="image/*"
              multiple
              onChange={(e) =>
                setImages((i) => i.concat(...[...e.target.files]))
              }
            />
            <br />
            <div className="overflow-auto">
              <div className="image-preview-container d-flex">
                {images.map((i, index) => (
                  <div
                    key={i.name}
                    className="image-preview flex_center_center"
                    style={{
                      backgroundImage: `url(${URL.createObjectURL(i)})`,
                    }}
                  >
                    <Button
                      onClick={() =>
                        setImages((i) => i.filter((_, idx) => idx !== index))
                      }
                    >
                      <i className="fa fa-trash" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </CardBody>
        </Card>
        <Button block color="primary" className="button-1" onClick={onSubmit}>
          {t("surveys.publish")}
        </Button>
      </Col>
      <Col md={4}>
        <Card>
          <CardBody>
            {t("surveys.publish_intro", { title: survey?.title })}
            <br />
            <ExportButton
              className="mt-3"
              csvData={csvData}
              fileName={t("surveys.results_filename")}
              loading={loading}
            />
          </CardBody>
        </Card>
        <Button block color="primary" className="button-2" onClick={onSubmit}>
          {t("surveys.publish")}
        </Button>
      </Col>
    </Row>
  );
}

const mapStateToProps = (state) => ({
  surveys: selectors.surveys.getSurveys(state),
  loading: selectors.surveys.getIsLoading(state),
});

const mapDispatchToProps = {
  updateSurvey: actions.surveys.updateSurvey,
};

export default connect(mapStateToProps, mapDispatchToProps)(PublishSurvey);
