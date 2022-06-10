const Button = (props) => {
  const color = 'myButton' || 'modal-button';
  // const color = 'myButton' || 'modal-button';

  return (
    <button
      type='button'
      style={props.style}
      className={`${color}`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
