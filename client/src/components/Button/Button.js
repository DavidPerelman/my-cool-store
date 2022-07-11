import './Button.css';

const Button = ({
  children,
  size = 'size-90',
  color = 'button--primary',
  onClick,
}) => {
  return (
    <button
      type='button'
      className={`button ${color} ${size}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
