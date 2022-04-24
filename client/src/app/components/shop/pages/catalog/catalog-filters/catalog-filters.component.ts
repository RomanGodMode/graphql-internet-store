import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators'
import { ActivatedRoute, Router } from '@angular/router'
import { CatalogService } from '../catalog.service'

@Component({
  selector: 'shop-catalog-filters',
  templateUrl: './catalog-filters.component.html',
  styleUrls: ['./catalog-filters.component.scss']
})
export class CatalogFiltersComponent implements OnInit {

  form: FormGroup = this.fb.group({
    name: ['', [Validators.required]]
  })

  constructor(
    private fb: FormBuilder,
    public route: ActivatedRoute,
    private router: Router,
    public catalogService: CatalogService
  ) {
  }

  ngOnInit(): void {
    this.route.queryParams.pipe(
      map(query => query.name),
      distinctUntilChanged()
    ).subscribe(
      name => {
        this.form.setValue({
          name: name || ''
        })
      }
    )

    this.form.valueChanges.pipe(
      map(form => form.name),
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(name => {
        this.router.navigate(
          [],
          {
            relativeTo: this.route,
            queryParams: { name, pageNumber: '1' },
            queryParamsHandling: 'merge'
          })
      }
    )

  }

  without(values) {
    return values//?.filter(val => val.name === 'Производитель') || []
  }

}
