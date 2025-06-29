const yup = require("yup");

async function validate(req, res, next) {
  try {
    const schema = yup.object().shape({
      username: yup
        .string()
        .required()
        .matches(/^[A-Za-z]/),
      email: yup
        .string()
        .email()
        .required()
        .matches(/^[a-z]+@esprit.tn+$/),
      cin: yup.number().required().min(8,),
    });
    await schema.validate(req.body);
    next();
    //aziz eifa: 5pt
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
}
module.exports = { validate };
