const { check } = require("express-validator");

const userRegisterValidation = () => {
  return [
    // Name check
    check("name", "نام خود را وارد کنید").not().isEmpty(),
    // Username check
    check("username", "نام کاربری را وارد کنید")
      .not()
      .isEmpty()
      .isLength({ min: 0, max: 16 })
      .withMessage("نام کاربری بیش از حد طولانی است"),
    // Email check
    check("email", "ایمیل معتبر وارد کنید").isEmail(),
    // Password check
    check("password", "رمز عبور باید شامل حداقل ۶ کاراکتر باشد").isLength({
      min: 6,
      max: 32,
    }),
  ];
};

module.exports = userRegisterValidation;
