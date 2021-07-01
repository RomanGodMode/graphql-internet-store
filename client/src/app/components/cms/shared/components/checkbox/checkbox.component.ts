import { Component, Input } from '@angular/core'
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms'

@Component({
  selector: 'cms-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: CheckboxComponent
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: CheckboxComponent
    }
  ]
})
export class CheckboxComponent implements ControlValueAccessor, Validator {

  @Input()
  name!: string

  @Input()
  title!: string

  constructor() {
  }

  validate(control: AbstractControl): ValidationErrors {
    return null
  }

  value = ''
  touched = false
  disabled = false

  writeValue(password: string): void {
    this.value = password
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
