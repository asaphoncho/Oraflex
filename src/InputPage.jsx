import { useState, useRef } from "react";
import InputTest from "./inputTest";

function InputPage({ onAdd }) {
  const title = useRef();
  const description = useRef();
  const date = useRef();

  function handleSave() {
    const enteredTitle = title.current.value;
    const enteredDescription = description.current.value;
    const enteredDate = date.current.value;

    onAdd({
      title: enteredTitle,
      description: enteredDescription,
      date: enteredDate,
    });
  }

  return (
    <>
      <InputTest label="title" ref={title} type="text"></InputTest>
      <InputTest label="description" ref={description} textarea></InputTest>
      <InputTest label="date" ref={date} type="date"></InputTest>
      <button onClick={handleSave}>Save</button>
    </>
  );
}

export default InputPage;
