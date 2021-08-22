import { useEffect, useRef } from "react";

function Input(props) {
  let inputRef = useRef();

  useEffect(() => {
    initiate();
  });

  function initiate() {
    if (!props.initialValue?.length) {
      return;
    }

    if (inputRef.current.value?.length) {
      return;
    }

    inputRef.current.value = props.initialValue;
  }

  return (
    <input
      name={props.name}
      placeholder={props.placeholder?.length ? props.placeholder : "enter"}
      id={props.id}
      onChange={props.onChange}
      onInput={props.onInput}
      ref={inputRef}
      type={props.type ? props.type : "text"}
      className={`form-input ${props.className}`}
      required={props.required}
      disabled={props.disabled}
    />
  );
}

export default Input;
