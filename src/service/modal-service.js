import React from 'react';

const Modal = require('react-bootstrap-modal');

export const generateModal = (config) =>
    <Modal
      show={config.isModalOpened}
      onHide={config.dismiss}
      aria-labelledby="ModalHeader"
    >
      <Modal.Header closeButton>
        <Modal.Title id='ModalHeader'>{config.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{config.content}</p>
      </Modal.Body>
      <Modal.Footer>
        <Modal.Dismiss className='btn btn-default'>Cancel</Modal.Dismiss>
        <button className={'btn btn-' + config.type + (config.buttonLock ? ' disabled' : '')} onClick={() => config.action()}>
          {config.actionButtonName}
        </button>
      </Modal.Footer>
    </Modal>;
