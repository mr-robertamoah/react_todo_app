function CenterContainer(props) {
  return (
    <div
      className={
        props.classes
          ? props.classes
          : "w-full md:w-10/12 flex flex-col items-center mx-auto"
      }
    >
      {props.children}
    </div>
  );
}

export default CenterContainer;
