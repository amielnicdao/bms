import React, { useState } from 'react';
import { Button, ButtonGroup } from 'reactstrap';

const MemTrainBTN = (props) => {
  const [cSelected, setCSelected] = useState([]);

  const onCheckboxBtnClick = (selected) => {
    const index = cSelected.indexOf(selected);
    if (index < 0) {
      cSelected.push(selected);
    } else {
      cSelected.splice(index, 1);
    }
    setCSelected([...cSelected]);
  }
  return (
    <div>

      <h5>Checkbox Buttons</h5>
      <ButtonGroup>
        <Button color="primary" onClick={() => onCheckboxBtnClick(1)} active={cSelected.includes(1)}>Self</Button>
        <Button color="primary" onClick={() => onCheckboxBtnClick(2)} active={cSelected.includes(2)}>Trainer</Button>
        <Button color="primary" onClick={() => onCheckboxBtnClick(3)} active={cSelected.includes(3)}>Class</Button>
      </ButtonGroup>
      <p>Selected: {JSON.stringify(cSelected)}</p>
    </div>
  );
}

export default MemTrainBTN;