const Text = ({ type, placeholder, name, onChange, maxlength }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      name={name}
      onChange={onChange}
      maxLength={maxlength}
    />
  );
};

export default Text;
