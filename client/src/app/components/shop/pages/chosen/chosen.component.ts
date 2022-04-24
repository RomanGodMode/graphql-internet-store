import { Component, OnInit } from '@angular/core'
import { ChosenService } from '../../shared/components/chosen/chosen.service'
import { map } from 'rxjs/operators'
import { staticUrl } from 'src/app/functions/static-url'

@Component({
  selector: 'app-chosen',
  templateUrl: './chosen.component.html',
  styleUrls: ['../cart/cart.component.scss', './chosen.component.scss']
})
export class ChosenComponent implements OnInit {

  staticUrl = staticUrl

  $items = this.chosenService.chosenProducts$.pipe(
    map(products => Object.values(products))
  )

  constructor(
    public chosenService: ChosenService
  ) {
  }

  ngOnInit(): void {
    this.chosenService.chosenProducts$.subscribe()
  }

}
