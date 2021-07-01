import { Component, ElementRef, ViewChild } from '@angular/core'
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms'

@Component({
  selector: 'cms-numeric',
  templateUrl: './numeric.component.html',
  styleUrls: ['./numeric.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: NumericComponent
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: NumericComponent
    }
  ]
})
export class NumericComponent implements ControlValueAccessor, Validator {

  @ViewChild('numeric')
  numeric: ElementRef

  constructor() {
  }

  increment() {
    this.numeric.nativeElement.stepUp()
  }

  decrement() {
    this.numeric.nativeElement.stepDown()
  }

  validate(control: AbstractControl): ValidationErrors {
    return null
  }

  value = ''
  touched = false
  disabled = false

  writeValue(value: string): void {
    this.value = value
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
