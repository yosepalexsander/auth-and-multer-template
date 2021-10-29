// import model here
const { user } = require("../../models");

// import package here
const Joi = require("joi");

exports.register = async (req, res) => {
  // create validation schema
  const schema = Joi.object({
    name: Joi.string().min(5).required(),
    email: Joi.string().email().min(10).required(),
    password: Joi.string().min(6).required(),
  });

  const { error } = schema.validate(req.body);

  // check if error return response 400
  if (error) {
    return res.status(400).send({
      status: "failed",
      error: {
        message: error.details[0].message,
      },
    });
  }

  try {
    const userExist = await user.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (userExist) {
      return res.status(400).send({
        status: "failed",
        message: "email already exist",
      });
    }

    const newUser = await user.create({
      ...req.body,
      status: "user",
    });

    res.send({
      status: "success",
      message: "resource has successfully created",
      data: {
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.login = async (req, res) => {
  // create validation schema
  const schema = Joi.object({
    email: Joi.string().email().min(10).required(),
    password: Joi.string().min(6).required(),
  });

  const { error } = schema.validate(req.body);

  // check if error return response 400
  if (error) {
    return res.status(400).send({
      status: "failed",
      error: {
        message: error.details[0].message,
      },
    });
  }

  try {
    const userExist = await user.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!userExist) {
      return res.status(400).send({
        status: "failed",
        message: "user not found",
      });
    }

    if (userExist.password !== req.body.password) {
      return res.status(400).send({
        status: "failed",
        message: "credential is invalid",
      });
    }

    res.status(200).send({
      status: "success",
      data: {
        name: userExist.name,
        email: userExist.email,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "server error",
    });
  }
};
