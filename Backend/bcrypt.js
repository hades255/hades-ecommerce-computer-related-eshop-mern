const bcrypt = require("bcryptjs");

const hashPassword = (password) => {
  try {
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password, salt);
    return hash;
  } catch (err) {
    console.log(err);
  }
};

const checkPassword = (dbPwd, pwd) => {
  try {
    let res = bcrypt.compare(pwd, dbPwd);
    return res;
  } catch (err) {
    console.log(err);
  }
};

module.exports = { hashPassword, checkPassword };
