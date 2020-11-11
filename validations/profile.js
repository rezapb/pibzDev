const { check } = require("express-validator");

const profileValidation = () => {
  return [
    check("status", "وضعیت خود را وارد کنید").not().isEmpty(),
    check("skills", "توانایی های خود را وارد کنید").not().isEmpty(),
  ];
};

module.exports = profileValidation;
