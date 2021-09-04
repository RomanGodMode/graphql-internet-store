import { Component, OnInit } from '@angular/core'
import { BuyerAuthService } from '../../../../buyer-auth/buyer-auth.service'

@Component({
  selector: 'shop-header',
  templateUrl: './shop-header.component.html',
  styleUrls: ['./shop-header.component.scss']
})
export class ShopHeaderComponent implements OnInit {

  isBurgirShown = false

  constructor(public authService: BuyerAuthService) {
  }


  ngOnInit(): void {
  }

  toggleShowBurgir() {
    this.isBurgirShown = !this.isBurgirShown
  }

}
