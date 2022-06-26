import './Button.css';
const Button = (props) => {
  const { size, color = 'blue', marginTop } = props;
  console.log(marginTop);

  return (
    <button
      type='button'
      style={props.style}
      className={`button ${color} ${size} ${marginTop}`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
