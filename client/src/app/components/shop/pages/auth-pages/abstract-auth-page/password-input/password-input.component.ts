import { Component, Input } from '@angular/core'
import { ShowPasswordService } from './show-password.service'
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms'

@Component({
  selector: 'app-password-input',
  templateUrl: './password-input.component.html',
  styleUrls: ['./password-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: PasswordInputComponent
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: PasswordInputComponent
    }
  ]
})
export class PasswordInputComponent implements ControlValueAccessor, Validator {

  @Input()
  placeholder: string
  @Input()
  name: string

  constructor(public showPasswordService: ShowPasswordService) {
  }

  validate(control: AbstractControl): ValidationErrors {
    return null
  }

  password = ''
  touched = false
  disabled = false

  writeValue(password: string): void {
    this.password = password
  }

  onChange = (password: string) => {
  }

  registerOnChange(onChange: any) {
    this.onChange = onChange
  }


  onTouched = () => {
  }

  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched()
      this.touched = true
    }
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled
  }

}
