const Form = (props) => {
  //   console.log(props);

  return (
    <>
      {Object.keys(props.data).map((field, i) => {
        return (
          <div key={i}>
            <label className='form-label'>
              {field.charAt(0).toUpperCase() +
                field
                  .slice(1)
                  .split(/(?=[A-Z])/)
                  .join(' ')}
            </label>
            <input
              type={
                field === 'verifyPassword' || field === 'password'
                  ? 'password'
                  : 'text' || field
              }
              className='form-control'
              id={field}
              onChange={(e) => props.handleFormChange(e, field)}
              value={props.data[field]}
            />
          </div>
        );
      })}
    </>
  );
};

export default Form;
