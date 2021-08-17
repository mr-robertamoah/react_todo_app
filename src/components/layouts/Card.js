import FormHeader from "../ui/FormHeader";

function Card(props) {
  return (
    <div className={`w-full max-w-96 min-h-content shadow-md p-2 mb-3 ${props.className?.length && props.className}`}>
      <FormHeader className="border-b-2 border-gray-500">{props.heading}</FormHeader>
      <div className="p-2 min-h-20">
        {props.children}
      </div>
    </div>
  );
}

export default Card;
