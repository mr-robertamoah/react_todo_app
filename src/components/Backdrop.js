function Backdrop(props) {
  return (
    <div
      className="w-screen h-screen bg-purple-100 flex 
        justify-center items-center z-10 fixed top-0 left-0
        bg-opacity-50"
      onClick={props.clickedBackdrop}
    >
      {props.children}
    </div>
  );
}

export default Backdrop;
