import { forwardRef } from "react";

const InputTest = forwardRef(function InputTest(
  { label, textarea, classes, ...props },
  ref
) {
  return (
    <>
      <label>{label}</label>
      {textarea ? (
        <textarea ref={ref} className={classes}></textarea>
      ) : (
        <input ref={ref} className={classes} {...props}></input>
      )}
    </>
  );
});

export default InputTest;
