import './Button.css';

const Button = ({
  children,
  size,
  color = 'button--primary',
  onClick,
  className,
}) => {
  return (
    <button
      type='button'
      className={`button ${className} ${color} ${size}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
