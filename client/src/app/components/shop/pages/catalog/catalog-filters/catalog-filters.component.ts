import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators'
import { ActivatedRoute, Router } from '@angular/router'

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
    private route: ActivatedRoute,
    private router: Router
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
      debounceTime(2000),
      distinctUntilChanged()
    ).subscribe(({ name }) => {
        this.router.navigate(
          [],
          {
            relativeTo: this.route,
            queryParams: { name },
            queryParamsHandling: 'merge'
          })
      }
    )

  }

}
