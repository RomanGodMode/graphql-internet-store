import { Component, OnInit } from '@angular/core'
import { AdminAuthService } from '../../../admin-auth/admin-auth.service'

@Component({
  selector: 'cms-header',
  templateUrl: './cms-header.component.html',
  styleUrls: ['./cms-header.component.scss']
})
export class CmsHeaderComponent implements OnInit {

  constructor(
    public authService: AdminAuthService
  ) {
  }

  ngOnInit(): void {
  }

}
