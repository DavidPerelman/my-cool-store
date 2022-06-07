const Button = (props) => {
  const color = props.className || 'primary';
  const dataBsToggle = props['data-bs-toggle'] || '';
  const dataBsTtarget = props['data-bs-target'] || '';

  return (
    <button
      type='button'
      className={`${color}`}
      data-bs-toggle={dataBsToggle}
      data-bs-target={dataBsTtarget}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
