import './Button.css';
const Button = (props) => {
  const { size = 'small', color = 'blue', variant = '' } = props;

  return (
    <button
      type='button'
      style={props.style}
      className={`button ${color} ${size} ${variant}`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
