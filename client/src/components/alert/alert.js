import React from "react";

// Material UI
import AlertElem from "@material-ui/lab/Alert";
// CSS
import "./alert.scss";

// Alert Component
const Alert = (props) => {
  const data = props.errors;
  // Render Errors
  const renderErrors = (errors) => {
    const errs = errors.map((e) => {
      return (
        <div className={"alert"} key={Math.random()}>
          <AlertElem
            variant='filled'
            severity={e.severity ? e.severity : "error"}
          >
            {e.msg}
          </AlertElem>
        </div>
      );
    });
    return errs;
  };
  return <div className='alert-parent'>{renderErrors(data)}</div>;
};

export default Alert;
