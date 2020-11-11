const { check } = require("express-validator");

const postValidation = () => {
  return [
    // Text check
    check("title", "تیتر الزامی است").not().isEmpty(),
    check("tags", "حداقل یک تگ الزامی است").not().isEmpty(),
  ];
};

module.exports = postValidation;
