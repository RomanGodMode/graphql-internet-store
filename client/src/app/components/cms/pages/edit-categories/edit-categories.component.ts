import { Component, OnDestroy, OnInit } from '@angular/core'
import { GetFullCategoryGQL } from '../../../shared/quyery/get-category.query'
import { map, switchMap } from 'rxjs/operators'
import { BehaviorSubject, Observable, Subscription } from 'rxjs'
import { EditCategoryGQL } from './mutation/edit-category.mutation'
import { FullCategory } from '../../../../types/category'
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-edit-categories',
  templateUrl: './edit-categories.component.html',
  styleUrls: ['./edit-categories.component.scss'],
  providers: [GetFullCategoryGQL, EditCategoryGQL]
})
export class EditCategoriesComponent implements OnInit, OnDestroy {

  get fields() {
    return this.editCategoryForm.get('productInfoFields') as FormArray
  }

  getVariants(field: AbstractControl) {
    return field.get('variants') as FormArray
  }

  addTextFieldToProductInfo() {
    const group = this.formBuilder.group({
      type: ['string'],
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]]
    })
    this.fields.push(group)
  }

  addNumFieldToProductInfo() {
    const group = this.formBuilder.group({
      type: ['num'],
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      min: [0, [Validators.required, Validators.min(Number.MIN_SAFE_INTEGER), Validators.max(Number.MAX_SAFE_INTEGER)]],
      max: [100, [Validators.required, Validators.min(Number.MIN_SAFE_INTEGER), Validators.max(Number.MAX_SAFE_INTEGER)]]
    })
    this.fields.push(group)
  }

  addBoolFieldToProductInfo() {
    const group = this.formBuilder.group({
      type: ['bool'],
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]]
    })
    this.fields.push(group)
  }

  addEnumFieldToProductInfo() {
    const group = this.formBuilder.group({
      type: ['enum'],
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      variants: this.formBuilder.array([])
    })
    this.fields.push(group)
  }

  addVariantToEnumField(field: AbstractControl) {
    (field.get('variants') as FormArray).push(this.formBuilder.control('', [Validators.required, Validators.minLength(1), Validators.maxLength(40)]))
  }

  removeProductInfoField(index: number) {
    this.fields.removeAt(index)
  }

  removeVariantFromEnumField(field: AbstractControl, index: number) {
    (field.get('variants') as FormArray).removeAt(index)
  }


  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private getFullCategoryGQL: GetFullCategoryGQL,
    private editCategoryGQL: EditCategoryGQL
  ) {
  }

  editCategoryForm: FormGroup

  setCategory() {
    this._loading$.next(true)
    this.editCategoryGQL.mutate({
      input: { id: this._category$.value.id, title: this.editCategoryForm.value.title },
      productInfoFields: this.editCategoryForm.value.productInfoFields
    }, {
      update: (cache, mutationResult) => {
        cache.writeQuery({
          query: this.getFullCategoryGQL.document,
          data: {
            editCategory: mutationResult.data.editCategory
          }
        })
      }
    }).pipe(
      map(r => r.data)
    ).subscribe(
      () => null,
      err => this._error$.next(err.message),
      () => this._loading$.next(false)
    )
  }


  private _category$ = new BehaviorSubject<FullCategory>({ id: 0, title: 'Форма загружается..', productInfoFields: [] })
  category$: Observable<FullCategory> = this._category$.asObservable()

  private _error$ = new BehaviorSubject('')
  error$ = this._error$.asObservable()

  private _loading$ = new BehaviorSubject(false)
  loading$ = this._loading$.asObservable()

  private subscriptions: Subscription[] = []

  private set sub(sub: Subscription) {
    this.subscriptions.push(sub)
  }


  ngOnInit(): void {
    this.sub = this.activatedRoute.params.pipe(
      map(params => +params['id']),
      switchMap(id => this.getFullCategoryGQL.watch({ id }).valueChanges.pipe(
        map(res => res.data.getCategory)
      ))
    ).subscribe(
      this._category$
    )
    this.sub = this.category$.subscribe(category => {
      this.editCategoryForm = this.formBuilder.group({
        title: [category.title, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
        productInfoFields: this.formBuilder.array(category.productInfoFields
          .map(fieldInfo => fieldInfo.type === 'enum'
            ? this.formBuilder.group({
              ...fieldInfo,
              name: [fieldInfo.name, [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
              variants: this.formBuilder.array(fieldInfo.variants.map(v => this.formBuilder.control(
                v,
                [Validators.required, Validators.minLength(1), Validators.maxLength(40)]
                ))
              )
            })
            : fieldInfo.type === 'num'
              ? this.formBuilder.group({
                ...fieldInfo,
                min: [fieldInfo.min, [Validators.required, Validators.min(Number.MIN_SAFE_INTEGER), Validators.max(Number.MAX_SAFE_INTEGER)]],
                max: [fieldInfo.max, [Validators.required, Validators.min(Number.MIN_SAFE_INTEGER), Validators.max(Number.MAX_SAFE_INTEGER)]],
                name: [fieldInfo.name, [Validators.required, Validators.minLength(2), Validators.maxLength(30)]]
              })
              : this.formBuilder.group({
                ...fieldInfo,
                name: [fieldInfo.name, [Validators.required, Validators.minLength(2), Validators.maxLength(30)]]
              })
          )
        )
      })
    })
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe())
  }

}
