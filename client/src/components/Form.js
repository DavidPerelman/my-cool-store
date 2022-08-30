const Form = ({ data, handleFormChange, selectData }) => {
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
            {(field === 'category' && (
              <select
                name='categories'
                id='categories-select'
                className='form-control'
                onChange={(e) => handleFormChange(e, field)}
              >
                {selectData.map((data, i) => (
                  <option key={i} value={data._id}>
                    {data.name}
                  </option>
                ))}
              </select>
            )) ||
              (field === 'image' && (
                <input
                  type='file'
                  className='form-control'
                  name='image'
                  onChange={(e) => handleFormChange(e, field)}
                />
              )) || (
                <input
                  type={
                    field === 'verifyPassword' || field === 'password'
                      ? 'password'
                      : 'text'
                  }
                  className='form-control'
                  id={field}
                  onChange={(e) => handleFormChange(e, field)}
                  value={data[field]}
                />
              )}
          </div>
        );
      })}
    </>
  );
};

export default Form;
