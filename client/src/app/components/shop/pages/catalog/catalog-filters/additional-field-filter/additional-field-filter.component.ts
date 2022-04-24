import { Component, Input, OnDestroy, OnInit } from '@angular/core'
import { ProductInfoField } from '../../../../../../types/category'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { debounceTime, distinctUntilChanged, map, takeUntil, tap } from 'rxjs/operators'
import { booleanPrefix, infoPrefix, maxNumFieldPrefix, minNumFieldPrefix } from '../../../../../../consts'
import { BehaviorSubject, ReplaySubject } from 'rxjs'
import { deepEqual } from '../../../../../../functions/deep-equal'

@Component({
  selector: 'shop-additional-field-filter',
  templateUrl: './additional-field-filter.component.html',
  styleUrls: ['../../../../shared/components/price-filter-form/price-filter-form.component.scss', './additional-field-filter.component.scss']
})
export class AdditionalFieldFilterComponent implements OnInit, OnDestroy {

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  form: FormGroup

  get fieldQueryKey() {
    if (this.field.type === 'bool') {
      return `${booleanPrefix}${this.field.name}`
    }
    return `${infoPrefix}${this.field.name}`
  }

  _options$ = new BehaviorSubject([])

  ngOnInit(): void {

    if (this.field.type === 'num') {
      this.form = this.fb.group({
        minValue: ['', [Validators.required]],
        maxValue: ['', [Validators.required]]
      })

      this.route.queryParams.pipe(
        map(query => ({
          minValue: query[minNumFieldPrefix + this.field.name],
          maxValue: query[maxNumFieldPrefix + this.field.name]
        })),
        distinctUntilChanged(deepEqual),
        takeUntil(this._destroyed$)
      ).subscribe(
        ({ minValue, maxValue }) => this.form.setValue({
          minValue: minValue || (this.field as any).min,
          maxValue: maxValue || (this.field as any).max
        })
      )
    } else {
      this.form = this.fb.group({
        value: ['', [Validators.required]]
      })

      if (this.field.type === 'enum') {
        this._options$.next([
          { value: '', text: 'Все' },
          ...this.field.variants.map(value => ({ value, text: value }))
        ])
      }

      this.route.queryParams.pipe(
        map(query => query[this.fieldQueryKey]),
        distinctUntilChanged(),
        takeUntil(this._destroyed$)
      ).subscribe(
        name => this.form.setValue({
          value: name || ''
        })
      )
    }


    this.form.valueChanges.pipe(
      debounceTime(500),
      tap(form => console.log(form)),
      distinctUntilChanged(deepEqual),
      takeUntil(this._destroyed$)
    ).subscribe(
      form => {
        const updatedFilter = this.field.type === 'num'
          ? { [minNumFieldPrefix + this.field.name]: form.minValue, [maxNumFieldPrefix + this.field.name]: form.maxValue }
          : { [this.fieldQueryKey]: (this.field.type === 'enum' || this.field.type === 'bool') && form.value === '' ? null : form.value }

        this.router.navigate(
          [],
          {
            relativeTo: this.route,
            queryParams: { ...updatedFilter, pageNumber: '1' },
            queryParamsHandling: 'merge'
          })
      }
    )
  }

  discard() {
    const { min, max } = this.field as any
    this.form.setValue({
      minValue: min,
      maxValue: max
    })
  }

  booleanFieldOptions = [
    { value: '', text: 'Нет фильтра' },
    { value: true, text: 'Есть' },
    { value: false, text: 'Нет' }
  ]

  @Input()
  field!: ProductInfoField


  _destroyed$ = new ReplaySubject()

  ngOnDestroy(): void {
    this._destroyed$.next()
    this._destroyed$.complete()
  }

}
