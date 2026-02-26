import { useState } from "react";

const Toggler = ({ buttonLabel, children }) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisiblity = () => {
    setVisible(!visible);
  };

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisiblity}> {buttonLabel} </button>
      </div>

      <div style={showWhenVisible}>
        {children}
        <button onClick={toggleVisiblity}> cancel </button>
      </div>
    </div>
  );
};

export default Toggler;
