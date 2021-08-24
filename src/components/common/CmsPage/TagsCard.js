import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { CircularProgress } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  FormGroup,
  Input,
  Label,
} from "reactstrap";

import { paths } from "../../../constants";
import { useFirebase } from "appFirebase";
import { actions, selectors } from "store";

function TagsCard({
  tags,
  getTags,
  loading,
  errors,
  setFormField,
  FormFields,
  form,
}) {
  const { t } = useTranslation();
  const firebase = useFirebase();
  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
    if (!tags) {
      getTags();
    }
  }, [getTags, tags]);

  function handleTagClick(tag) {
    const t = [...form.tags];
    const index = t.indexOf(tag);
    if (index >= 0) {
      t.splice(index, 1);
    } else {
      t.push(tag);
    }
    setFormField(FormFields.tags, t);
  }

  function addTag() {
    if (tagInput === "") {
      return;
    }
    const t = [...tags];
    t.push(tagInput);
    firebase
      .firestoreUpdate(paths.TAGS, { values: t })
      .then((_) => {
        setTagInput("");
        getTags();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <Card
      className={errors.fields.includes(FormFields.tags) ? "invalid-card" : ""}
    >
      <CardHeader>{t("tags.tags")}</CardHeader>
      <CardBody>
        {loading ? (
          <div className="flex_center_center">
            <CircularProgress />
          </div>
        ) : (
          tags &&
          Object.values(tags).map((tag) => (
            <Button
              color={form.tags.includes(tag) ? "primary" : "secondary"}
              className="m-1"
              key={tag}
              onClick={() => handleTagClick(tag)}
            >
              {tag}
            </Button>
          ))
        )}
        <FormGroup className="mt-3">
          <Label for="tag">{t("tags.add_new_tag")}</Label>
          <div className="flex_center_center input-with-button">
            <Input
              id="tag"
              type="text"
              name="tag"
              className="mr-2"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
            />
            <Button color="success" onClick={() => addTag()}>
              <i className="fa fa-plus" />
            </Button>
          </div>
        </FormGroup>
      </CardBody>
    </Card>
  );
}

const mapStateToProps = (state) => ({
  tags: selectors.tags.getTags(state),
  loading: selectors.tags.getIsLoading(state),
});

const mapDispatchToProps = {
  getTags: actions.tags.getTags,
};

export default connect(mapStateToProps, mapDispatchToProps)(TagsCard);
