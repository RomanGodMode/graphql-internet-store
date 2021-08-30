import { Component, ElementRef, Input, ViewChild } from '@angular/core'
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms'

@Component({
  selector: 'cart-numeric',
  templateUrl: './cart-numeric.component.html',
  styleUrls: ['./cart-numeric.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: CartNumericComponent
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: CartNumericComponent
    }
  ]
})
export class CartNumericComponent implements ControlValueAccessor, Validator {

  @ViewChild('numeric')
  numeric: ElementRef

  constructor() {
  }

  increment() {
    this.numeric.nativeElement.stepUp()
    this.onChange(+this.numeric.nativeElement.value)
  }

  decrement() {
    this.numeric.nativeElement.stepDown()
    this.onChange(+this.numeric.nativeElement.value)
  }

  validate(control: AbstractControl): ValidationErrors {
    return null
  }

  @Input()
  max: number | null

  // @Input()
  // min: number | null

  value = ''
  touched = false
  disabled = false

  writeValue(value: string) {
    // Math.max(minPrice, this.min)
    // this.value = value
    this.value = value
    // if (this.max) {
    //   this.value = +value > this.max ? this.max.toString() : value
    // }
    // if (this.min) {
    //   this.value = +value < this.min ? this.min.toString() : value
    // }
  }

  onChange = (value: any) => {
  }

  registerOnChange(onChange: any) {
    this.onChange = (newValue: any) => {
      if (!+newValue || newValue <= 0) {
        newValue = 1
        this.numeric.nativeElement.stepUp()
      }
      if (newValue > this.max) {
        newValue = this.max
        this.numeric.nativeElement.stepDown()
      }
      onChange(newValue)
    }
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
