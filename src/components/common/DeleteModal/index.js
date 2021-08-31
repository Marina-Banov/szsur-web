import React from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { useTranslation } from "react-i18next";

export default function DeleteModal({ target, close, onDelete, title, text }) {
  const { t } = useTranslation();

  return (
    <Modal isOpen={!!target} toggle={close}>
      <ModalHeader toggle={close}>{title}</ModalHeader>
      <ModalBody>{text}</ModalBody>
      <ModalFooter>
        <Button color="danger" onClick={() => onDelete(target)}>
          {t("delete")}
        </Button>
        <Button color="secondary" onClick={close}>
          {t("cancel")}
        </Button>
      </ModalFooter>
    </Modal>
  );
}
