import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import {downloadCSV} from './csv_generator';

const RandomNameGenerator = () => {
  const [showModal, setShowModal] = useState(false);
  const [rows, setRows] = useState(0);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  return (
    <>
      <Button variant="primary" className="m-5 mt-0" onClick={handleShow}>
        Generate Random Names in CSV
      </Button>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Random Name Generator</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formRow">
              <Form.Label>Enter how many rows you want to generate?</Form.Label>
              <Form.Control type="text" placeholder="Enter row" onChange={(e)=>setRows(e.target.value)} />
            </Form.Group>
          </Form>
          <Button variant="secondary" className="mt-2" onClick={()=>downloadCSV(rows)}>
            Generate file
          </Button>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RandomNameGenerator;
