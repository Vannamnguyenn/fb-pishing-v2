import "./index.scss";
const Spinner = ({ style }) => (
  <div
    className="loader "
    style={{
      marginTop: "15vh",
      ...style,
    }}
  ></div>
);

export default Spinner;
