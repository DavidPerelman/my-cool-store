const Form = (props) => {
  console.log(props);

  return (
    <>
      <form>
        <div>
          <label className='form-label'>label</label>
          <input
            type='text'
            className='form-control'
            // onChange={(e) => handleFormChange(e, field)}
            // value={registerData[field]}
          />
        </div>
      </form>
    </>
  );
};

export default Form;
