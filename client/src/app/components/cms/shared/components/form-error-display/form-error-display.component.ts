import { Component, Input, OnInit } from '@angular/core'
import { ValidationErrors } from '@angular/forms'

@Component({
  selector: 'cms-form-error-display',
  templateUrl: './form-error-display.component.html',
  styleUrls: ['./form-error-display.component.scss']
})
export class FormErrorDisplayComponent implements OnInit {

  @Input()
  errors!: ValidationErrors | null

  @Input()
  needToShow!: boolean

  constructor() {
  }

  ngOnInit(): void {
  }

}
