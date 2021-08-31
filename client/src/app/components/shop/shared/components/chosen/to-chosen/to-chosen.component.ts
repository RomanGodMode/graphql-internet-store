import { Component, Input, OnInit } from '@angular/core'
import { ChosenService } from '../chosen.service'
import { map } from 'rxjs/operators'
import { Router } from '@angular/router'

@Component({
  selector: 'shop-to-chosen',
  templateUrl: './to-chosen.component.html',
  styleUrls: ['./to-chosen.component.scss']
})
export class ToChosenComponent implements OnInit {

  @Input()
  productId: number

  isInChosen$ = this.chosenService.chosenProducts$.pipe(
    map(products => !!products[this.productId])
  )


  constructor(
    public chosenService: ChosenService,
    public router: Router
  ) {
  }

  ngOnInit(): void {
  }

}
