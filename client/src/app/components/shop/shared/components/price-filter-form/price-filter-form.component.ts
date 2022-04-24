import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { debounceTime, distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators'
import { CatalogService } from '../../../pages/catalog/catalog.service'
import { ActivatedRoute, Router } from '@angular/router'
import { combineLatest } from 'rxjs'

@Component({
  selector: 'shop-price-filter-form',
  templateUrl: './price-filter-form.component.html',
  styleUrls: ['./price-filter-form.component.scss']
})
export class PriceFilterFormComponent implements OnInit {

  form: FormGroup = this.fb.group({
    maxPrice: ['', [Validators.required]],
    minPrice: ['', [Validators.required]]
  })

  constructor(
    private fb: FormBuilder,
    public catalogService: CatalogService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    combineLatest([this.route.queryParams, this.catalogService.catalogData$]).pipe(
      tap(([query, data]) => {
        this.form = this.fb.group({
          maxPrice: [query.maxPrice || data.maxPrice, [Validators.required]],
          minPrice: [query.minPrice || data.minPrice, [Validators.required]]
        })
      }),
      map(([_, data]) => data),
      switchMap(data => this.form.valueChanges
        .pipe(
          debounceTime(500),
          distinctUntilChanged(),
          map(({ maxPrice, minPrice }) => ({
            maxPrice: Math.max(Math.min(maxPrice, data.maxPrice), data.minPrice),
            minPrice: Math.max(Math.min(minPrice, data.maxPrice), data.minPrice)
          }))
        )
      )
    ).subscribe(({ maxPrice, minPrice }) => {
      this.router.navigate(
        [],
        {
          relativeTo: this.route,
          queryParams: { maxPrice, minPrice, pageNumber: '1' },
          queryParamsHandling: 'merge'
        })
    })
  }

  discard() {
    this.catalogService.catalogData$.subscribe(
      data => this.form.setValue({
        maxPrice: data.maxPrice,
        minPrice: data.minPrice
      })
    )
  }

}
