import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appMatchingFields]',
  providers: [{ provide: NG_VALIDATORS, useExisting: MatchingFieldsValidatorDirective, multi: true }]
})
export class MatchingFieldsValidatorDirective implements Validator {

  constructor() { }

  validate(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const passwordRepeat = control.get('password-repeat')?.value;
    if(password !== passwordRepeat){
      return { noMatch: true}
   }
   else{
        return null;
   }
  }
}
