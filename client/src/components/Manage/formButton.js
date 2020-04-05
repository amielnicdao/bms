import React from "react";
import './manage.css';


function FormButton(props) {
  return (
    <button {...props} className="btn btn-info classbtn">
      {props.children}
    </button>
  );
}
export default FormButton;