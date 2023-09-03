import "./index.scss";

// eslint-disable-next-line react/prop-types
const PrimaryButton = ({ onClick, text, btnstyle }) => {
  return (
    <button
      style={{
        ...btnstyle,
      }}
      className="primary_button"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default PrimaryButton;
