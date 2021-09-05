import Validator from 'validator'
import isEmpty from 'lodash/isEmpty'
import { toInteger } from 'lodash'

//Validate student form data
export const validateStudent = studentData => {
  let errors = {};

  //Validate Id
  if (!validateID(studentData.studentId)) {
    errors.studentId = true;
  }
  //Validate name
  if (!validatePlainText(studentData.name)) {
    errors.name = true;
  }
  //Validate lastname
  if (!validatePlainText(studentData.lastname)) {
    errors.lastname = true;
  }
  //Validate telephone
  if (!validateTelephone(studentData.telephone)) {
    errors.telephone = true;
  }
  //Validate email
  if (!validateEmail(studentData.studentEmail)) {
    errors.studentEmail = true;
  }
  //Validate address
  if (Validator.isEmpty(studentData.address)) {
    errors.address = true;
  }
  //Validate genre
  if (Validator.isEmpty(studentData.genre)) {
    errors.genre = true;
  }
  //Validate birthdate
  if (Validator.isEmpty(studentData.birthdate)) {
    errors.birthdate = true;
  }

  return {
    errors,
    isValid: isEmpty(errors),
  }
};

export const validateInputId = data => {
  let errors = {};

  if (!validateID(data.idInSearch)) {
    errors.plainText = true;
  }

  return {
    errors,
    isValid: isEmpty(errors),
  }
};

export const validateInputLastname = data => {
  let errors = {};

  if (!validatePlainText(data.lastnameInSearch)) {
    errors.plainText = true;
  }

  return {
    errors,
    isValid: isEmpty(errors),
  }
};

export const validateInputEmail = data => {
  let errors = {};

  if (!validateEmail(data.emailInSearch)) {
    errors.plainText = true;
  }

  return {
    errors,
    isValid: isEmpty(errors),
  }
};

export const validateInputAge = data => {
  let errors = {};

  if (Validator.isEmpty(data.ageInSearch)) {
    errors.ageInSearch = true;
  }

  return {
    errors,
    isValid: isEmpty(errors),
  }
};

export const validateInputAgeRange = data => {
  let errors = {};

  if (Validator.isEmpty(data.ageInSearchFloor)) {
    errors.ageInSearchFloor = true;
  }
  if (Validator.isEmpty(data.ageInSearchCeil)) {
    errors.ageInSearchCeil = true;
  }
  if (toInteger(data.ageInSearchFloor) >= toInteger(data.ageInSearchCeil)) {
    errors.ageInSearchCeil = true;
    errors.ageInSearchFloor = true;
  }

  return {
    errors,
    isValid: isEmpty(errors),
  }
};

// Aux functions
function validateID(id) {
  const regEx = /^(V|E)\d{7,8}$/;
  return regEx.test(id);
};

function validateTelephone(number) {
  const regEx = /^0((2\d{2}-\d{7})|(4(1[246]|2[46])-\d{7}))$/;
  return regEx.test(number);
};

function validateEmail(email) {
  const regEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regEx.test(email);
};

function validatePlainText(text) {
  const regEx = /^(?!\s)[a-zA-Z\s]+$/;
  return regEx.test(text);
};