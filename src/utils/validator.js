export const validateMobile = mobile => {
    const validate = new RegExp(/^[1-9][0-9]{9}$/);
    const result = validate.test(mobile);
    console.log('===== @Dh validate mobile ======', result);
    return !result;
  };
  
  export const validatePassword = password => {
    // const validate = new RegExp(/^s+$/);
    // const result = validate.test(password);
    // console.log('===== @Dh validate password ======', result);
    if (password.length < 6) {
      return true;
    } else return false;
  };
  
  export const validateData = data => {
    console.log("data validatipon");
    return data === '';
  };
  
  export const validateEmail = email => {
    const validate = new RegExp(
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
    );
    const result = validate.test(email);
    console.log('===== @SAN validateMobile =====', result);
    return !result;
  };
  