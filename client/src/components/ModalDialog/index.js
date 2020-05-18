import React from 'react';
import { Button, Modal } from 'react-bootstrap';

export const ModalDialog = ({ isVisible, setVisible }) => {
  const handleClose = () => setVisible(false);

  return (
    <Modal show={isVisible} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Uwaga</Modal.Title>
      </Modal.Header>
      <Modal.Body>Zmiany zostały zaakceptowane</Modal.Body>
      <Modal.Footer>
        <Button variant='primary' onClick={handleClose}>
          Zamknij
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
