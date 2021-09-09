import isEmpty from 'lodash/isEmpty'
import Validator from 'validator'

//Validate cpu form data
export const validateProcessor = processorData => {
  let errors = {}
 let eur = processorData.eur.toString() 
 let tdp = processorData.tdp.toString() 
 let numberOfCores = processorData.numberOfCores.toString() 
 let numberOfThreads = processorData.numberOfThreads.toString() 
  //Validate Id
  if (Validator.isEmpty(processorData.brand)) {
    errors.brand = true
  }

  if (Validator.isEmpty(processorData.model)) {
    errors.model = true
  }
  
  if (Validator.isEmpty(processorData.clockSpeed)) {
    errors.clockSpeed = true
  }

  if (Validator.isEmpty(tdp)) {
    errors.tdp = true
  }

if (Validator.isEmpty(eur)) {
    errors.eur = true
  }


  if (Validator.isEmpty(numberOfCores)) {
    errors.numberOfCores = true
  }
  if (Validator.isEmpty(numberOfThreads)) {
    errors.numberOfThreads = true
  }
  return {
    errors,
    isValid: isEmpty(errors),
  }
}

export const validateInputId = data => {
  let errors = {}

  if (!validateID(data.idInSearch)) {
    errors.plainText = true
  }

  return {
    errors,
    isValid: isEmpty(errors),
  }
}

export const validateInputLastname = data => {
  let errors = {}

  if (!validatePlainText(data.lastnameInSearch)) {
    errors.plainText = true
  }

  return {
    errors,
    isValid: isEmpty(errors),
  }
}

export const validateInputEmail = data => {
  let errors = {}

  if (!validateEmail(data.emailInSearch)) {
    errors.plainText = true
  }

  return {
    errors,
    isValid: isEmpty(errors),
  }
}

export const validateInputAge = data => {
  let errors = {}

  if (Validator.isEmpty(data.ageInSearch)) {
    errors.ageInSearch = true
  }

  return {
    errors,
    isValid: isEmpty(errors),
  }
}

function validateNumberFloat(number) {
  const regEx = /^[+-]?([0-9]*[.])?[0-9]+$/
  return regEx.test(number)
}
function validateNumber(number) {
  const regEx = /^[1-9]\d*$$/
  return regEx.test(number)
}

function validateBrand(text) {
  const regEx = /^(?!\s)[a-zA-Z\s]+$/
  return regEx.test(text)
}

function validateElse(text) {
  const regEx = /^@"^(?!\W*$)(?=[ .\w]\w*\W*$).*$"$/
  return regEx.test(text)
}
