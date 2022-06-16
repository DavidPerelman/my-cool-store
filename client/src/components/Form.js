const Form = ({ data, handleFormChange }) => {
  return (
    <>
      {Object.keys(data).map((field, i) => {
        return (
          <div key={i} className='label'>
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
              onChange={(e) => handleFormChange(e, field)}
              value={data[field]}
            />
          </div>
        );
      })}
    </>
  );
};

export default Form;
