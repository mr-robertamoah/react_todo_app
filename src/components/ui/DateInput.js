import { useEffect, useRef } from "react";

function DateInput(props) {
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
      placeholder={
        props.placeholder?.length ? props.placeholder : "pick date and time"
      }
      id={props.id}
      onChange={props.onChange}
      onInput={props.onInput}
      ref={inputRef}
      type="datetime-local"
      className={`form-input ${props.className} ${
        inputRef.current?.value?.length ? "text-black" : "text-gray-500"
      }`}
      required={props.required}
      disabled={props.disabled}
    />
  );
}

export default DateInput;
