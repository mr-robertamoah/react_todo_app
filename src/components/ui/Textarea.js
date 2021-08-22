import { useEffect, useRef } from "react";

function Textarea(props) {
  let textareaRef = useRef();

  useEffect(() => {
    initiate();
  });

  function initiate() {
    if (!props.initialValue?.length) {
      return;
    }

    if (textareaRef.current.value?.length) {
      return;
    }

    textareaRef.current.value = props.initialValue;
  }

  return (
    <textarea
      name={props.name}
      placeholder={props.placeholder?.length ? props.placeholder : "enter"}
      id={props.id}
      rows={props.row ? props.row : "5"}
      disabled={props.disabled}
      onChange={props.onChange}
      onInput={props.onInput}
      ref={textareaRef}
      required={props.required ? true : false}
      className={`form-input ${props.className ? props.className : ""}`}
    ></textarea>
  );
}

export default Textarea;
