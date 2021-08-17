import { useEffect, useRef } from "react";

function Checkbox(props) {
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

  function getData(event) {
    let data = {target: {value: false, type: 'checkbox'}}

    if (event.target.value === 'on') {
      data.target.value = true
    }

    return data
  }

  function onInput(event) {
    props.onInput(getData(event))
  }

  function onChange(event) {
    props.onChange(getData(event))
  }

  return (
    <div className={`form-input ${props.className}`}>
      <input
        name={props.name}
        id={props.id}
        onChange={onChange}
        onInput={onInput}
        ref={inputRef}
        type="checkbox"
        className="mr-2"
        required={props.required}
      ></input>
      <label htmlFor={props.id}>{props.placeholder?.length ? props.placeholder : "check"}</label>
    </div>
  );
}

export default Checkbox;
