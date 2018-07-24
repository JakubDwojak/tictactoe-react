import './square.css';

import React from 'react';

const Square = (props) => (
  <div
       className={props.className()}
       onClick={() => props.onClick(props.id)}>
    {props.value}
  </div>
);

export default Square;
