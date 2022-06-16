import './Button.css';
const Button = (props) => {
  const { size, color = 'blue' } = props;

  return (
    <button
      type='button'
      style={props.style}
      className={`button ${color} ${size}`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
