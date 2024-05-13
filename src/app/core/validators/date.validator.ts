import {FormControl} from "@angular/forms"

export function actualDateValidator(control: FormControl): { [key: string]: any } | null {
  if(!control.value){
    return null
  }
  const today = new Date();
  const [yearInput, monthInput, dayInput] = control.value.split('-').map(Number);

  const dayActual = today.getDate();
  const monthActual = today.getMonth()+1;
  const yearActual = today.getFullYear();

  if (
    yearInput > yearActual ||
    (yearInput === yearActual && monthInput > monthActual) ||
    (yearInput === yearActual && monthInput === monthActual && dayInput >= dayActual)
  ) {
    return null
  } else {
    return { 'fechaActualInvalida': true }
  }
}

export function futureDateValidator(control: FormControl): { [key: string]: any } | null {
  const fechaActual = new Date()
  const fechaInput = new Date(control.value)

  if (isNaN(fechaInput.getTime()) || fechaInput <= fechaActual) {
    return {'fechaFuturaInvalida': true}
  }

  return null
}
