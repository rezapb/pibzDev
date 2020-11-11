const { check } = require("express-validator");

const userLoginValidation = () => {
  return [
    //email check
    check("email", "ایمیل متبر وارد کنید").isEmail(),
    //password check
    check("password", "رمز عبور وارد کنید").not().isEmpty(),
  ];
};

module.exports = userLoginValidation;
