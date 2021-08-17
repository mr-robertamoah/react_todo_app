function FormHeader({ children, className }) {
  return (
    <h1 className={`text-center my-2 font-semibold text-xl capitalize ${className?.length && className}`}>
      {children}
    </h1>
  );
}

export default FormHeader;
