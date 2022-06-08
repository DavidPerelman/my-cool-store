const Button = (props) => {
  const color = props.className || 'primary';

  return (
    <button type='button' className={`${color}`} onClick={props.onClick}>
      {props.children}
    </button>
  );
};

export default Button;
