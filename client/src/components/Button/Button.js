import './Button.css';
const Button = (props) => {
  const { size, color = 'button--primary', marginTop, buttonStyle } = props;

  return (
    <button
      type='button'
      style={props.style}
      className={`button ${color} ${size} ${marginTop} ${buttonStyle}`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
