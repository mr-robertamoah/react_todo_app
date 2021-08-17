function Button(props) {
  return (
    <button
      onClick={props.onClick}
      className={`${props.className} focus:outline-none appearance-none bg-gray-500 text-white hover:bg-green-300 p-2 rounded text-sm`}
    >
      {props.children}
    </button>
  );
}

export default Button;
