import Button from "./Button";
import FormHeader from "./FormHeader";

function Form(props) {
  function onSubmit(event) {
    event.preventDefault();

    props.onSubmit(event);
  }

  return (
    <form onSubmit={onSubmit}>
      <FormHeader>{props.heading}</FormHeader>
      {props.loading ? (
        <div className="w-full p-2 text-green-300 text-center text-xs">
          {props.loadingText}
        </div>
      ) : null}
      {props.error?.length ? (
        <div className="w-full p-2 text-red-600 text-xs bg-red-100">
          {props.error}
        </div>
      ) : null}
      {props.children}
      <Button>{props.submitText}</Button>
    </form>
  );
}

export default Form;
