import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { distinctUntilChanged, map } from 'rxjs/operators'

@Component({
  selector: 'shop-catalog-sorter',
  templateUrl: './catalog-sorter.component.html',
  styleUrls: ['./catalog-sorter.component.scss']
})
export class CatalogSorterComponent implements OnInit {

  options = [
    { text: 'Выберите критерий', value: '' },
    { text: 'Возрастание цены', value: 'price' },
    { text: 'Убывание цены', value: '-price' },
    { text: 'По алфавиту', value: 'name' },
    { text: 'По алфавиту с конца', value: '-name' }
  ]

  form: FormGroup = this.fb.group({
    ordering: ['', [Validators.required]]
  })


  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.route.queryParams.pipe(
      map(query => query.ordering),
      distinctUntilChanged()
    ).subscribe(
      ordering => {
        this.form.setValue({
          ordering: ordering || ''
        })
      }
    )

    this.form.valueChanges.pipe(
      map(form => form.ordering),
      distinctUntilChanged()
    ).subscribe(ordering => {
      this.router.navigate(
        [],
        {
          relativeTo: this.route,
          queryParams: { ordering: ordering || null },
          queryParamsHandling: 'merge'
        })
    })
  }

}
