import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Input from './input'
const ModalTemplate = (props) => {
  console.log(props)
  const {
    buttonLabel,
    className
  } = props;
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  return (
    <div>
      <Button className="update-class-btn" color="success" onClick={toggle}>{buttonLabel}Update</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Update Class Information</ModalHeader>
        <ModalBody>
          <Input value={props.value} placeholder={props.name} name={props.statename} onChange={props.changeFunction} />
          <Input value={props.value1} placeholder={props.name1} name={props.statename1} onChange={props.changeFunction1} />
          <Input value={props.value2} placeholder={props.name2} name={props.statename2} onChange={props.changeFunction2} />
          <Input value={props.value3} placeholder={props.name3} name={props.statename3} onChange={props.changeFunction3} />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" type="submit" onClick={e => props.updateClass(e, props.id)}>Update Class</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
export default ModalTemplate;