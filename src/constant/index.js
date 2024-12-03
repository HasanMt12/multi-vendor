const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
const alphanumericRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
const bdPhoneRegex = /^(\+88)?01[0-9]{9}$/;

module.exports = {
  gmailRegex,
  alphanumericRegex,
  bdPhoneRegex,
};
