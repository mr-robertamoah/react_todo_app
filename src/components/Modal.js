import Backdrop from "./Backdrop";

function Modal(props) {
  function clickedBackdrop() {
    props.clickedCancel();
  }

  return (
    <Backdrop clickedBackdrop={clickedBackdrop}>
      <div className="z-20 bg-white shadow-sm rounded max-h-1/2 w-2/3 min-w-80">
        <div className="p-3 w-full text-center text-sm">{props.title}</div>
        <div className="flex flex-nowrap justify-around items-center">
          <button className="" onClick={props.clickedContinue}>
            continue
          </button>
          <button onClick={props.clickedCancel}>cancel</button>
        </div>
      </div>
    </Backdrop>
  );
}

export default Modal;
