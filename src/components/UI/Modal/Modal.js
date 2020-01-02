// buduci upgrade app da se prikaze modal prilikom brisanja nekog zapisa

import React from 'react';
import { Modal } from 'react-bootstrap';

const modal = () => {
    <Modal.Dialog>
        <Modal.Header closeButton>
            <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <p>Are you sure you want to delete record?</p>
        </Modal.Body>

        <Modal.Footer>
            <Button variant="secondary">No</Button>
            <Button variant="primary">Yes</Button>
        </Modal.Footer>
    </Modal.Dialog>
}

export default modal;