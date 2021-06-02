import { Component, OnDestroy, OnInit } from '@angular/core'
import { GetFullCategoryGQL } from './quyery/get-category.query'
import { map, switchMap, tap } from 'rxjs/operators'
import { BehaviorSubject, Observable, Subscription } from 'rxjs'
import { EditCategoryGQL } from './mutation/edit-category.mutation'
import { FullCategory, ProductInfoField } from '../../../../types/category'
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-edit-categories',
  templateUrl: './edit-categories.component.html',
  styleUrls: ['./edit-categories.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [GetFullCategoryGQL, EditCategoryGQL]
})
export class EditCategoriesComponent implements OnInit, OnDestroy {

  isProductInfoField = (productInfoFieldWithCounter: { data: ProductInfoField, i: number }) => productInfoFieldWithCounter
  isVariantOfEnumField = (variantWithCounter: { data: string, i: number }) => variantWithCounter

  log(d) {
    console.log(d)
  }

  addProductInfoField() {
    const group = this.formBuilder.group({
      input: ['Игорь']
    })
    this.productInfoFieldsList.push(group)
  }

  removeProductInfoField(obj: any) {
    this.productInfoFieldsList.removeAt(this.productInfoFieldsList.value.indexOf(obj))
  }

  submitToServer() { //submitToServer|editCategory (кринжовый нейминг)
    console.log(this.editCategoryForm.value)
  }

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private getFullCategoryGQL: GetFullCategoryGQL,
    private editCategoryGQL: EditCategoryGQL
  ) {
  }

  editCategoryForm: FormGroup

  get productInfoFieldsList() {
    return this.editCategoryForm.get('productInfoFields') as FormArray
  }

  private _category$ = new BehaviorSubject<FullCategory>({ id: 0, title: 'Имя категории', productInfoFields: [] })
  category$: Observable<FullCategory> = this._category$.asObservable()


  private subscriptions: Subscription[] = []

  private set sub(sub: Subscription) {
    this.subscriptions.push(sub)
  }


  ngOnInit(): void {
    this.sub = this.activatedRoute.params.pipe(
      map(params => +params['id']),
      switchMap(id => this.getFullCategoryGQL.watch({ id }).valueChanges.pipe(
        map(res => res.data.getCategory)
      )),
      tap(console.log)
    ).subscribe(
      this._category$
    )
    this.sub = this.category$.subscribe(category => {
      this.editCategoryForm = this.formBuilder.group({
        title: [category.title, [Validators.required]],
        productInfoFields: this.formBuilder.array(category.productInfoFields
          .map(fieldInfo => fieldInfo.type === 'enum'
            ? this.formBuilder.group({
              ...fieldInfo,
              variants: this.formBuilder.array(fieldInfo.variants.map(v => this.formBuilder.control(v))
              )
            })
            : this.formBuilder.group(fieldInfo)
          )
        )
      })
    })
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe())
  }

}
