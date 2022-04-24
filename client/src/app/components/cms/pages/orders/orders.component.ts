import { Component, OnDestroy, OnInit } from '@angular/core'
import { SearchOrdersGQL } from '../../../shop/shared/query/search-orders.query'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { debounceTime, distinctUntilChanged, map, startWith, switchMap, takeUntil, tap } from 'rxjs/operators'
import { OrderService } from '../../../shop/shared/components/order/order.service'
import { falsyValuesToNull } from '../../../../functions/falsy-values-to-null'
import { combineLatest, ReplaySubject } from 'rxjs'
import { PatchOrderGQL } from '../../../shop/shared/mutation/patch-order.mutation'

@Component({
  selector: 'cms-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  providers: [SearchOrdersGQL, PatchOrderGQL, OrderService]
})
export class OrdersComponent implements OnInit, OnDestroy {

  constructor(
    private fb: FormBuilder,
    private orderService: OrderService
  ) {
  }

  statusOptions = [
    { text: 'Все', value: '' },
    { text: 'Заказан', value: 'ordered' },
    { text: 'Завершён', value: 'completed' },
    { text: 'Просрочен', value: 'expired' }
  ]

  searchForm: FormGroup = this.fb.group({
    id: ['', [Validators.required]],
    status: ['', [Validators.required]]
  })

  ngOnInit(): void {
    const selectedId$ = this.searchForm.controls.id.valueChanges.pipe(
      startWith(''),
      debounceTime(500),
      distinctUntilChanged()
    )

    const selectedStatus$ = this.searchForm.controls.status.valueChanges.pipe(
      startWith(''),
      distinctUntilChanged()
    )

    combineLatest([selectedId$, selectedStatus$]).pipe(
      map(([id, status]) => ({ id, status })),
      map(falsyValuesToNull),
      tap(values => this.orderService._selectedOrderFilter$.next(values)),
      switchMap(values => this.orderService.searchOrders(values)),
      takeUntil(this._destroyed$)
    ).subscribe()
  }

  _destroyed$ = new ReplaySubject()

  ngOnDestroy(): void {
    this._destroyed$.next()
    this._destroyed$.complete()
  }
}
