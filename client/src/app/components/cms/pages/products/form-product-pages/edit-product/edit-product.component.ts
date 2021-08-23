import { Component, OnDestroy, OnInit } from '@angular/core'
import { BehaviorSubject, ReplaySubject, zip } from 'rxjs'
import { map, switchMap, takeUntil } from 'rxjs/operators'
import { FullCategory, ProductInfoField } from '../../../../../../types/category'
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { GetFullCategoryGQL } from '../../../../../shared/quyery/get-category.query'
import { EditProductGQL } from './mutation/edit-product.mutation'
import { GetProductsGQL } from '../../../../../shared/quyery/get-full-product'
import { FullProduct } from '../../../../../../types/product'
import { mateInfosWithValues } from '../../../../../../functions/mate-infos-with-values'
import { GetCategoryWithProductsGQL } from '../../../../../shared/quyery/get-category-with-products.query'
import { DeleteProductGQL } from './mutation/delete-product.mutation'

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
  providers: [GetFullCategoryGQL, GetProductsGQL, EditProductGQL, GetCategoryWithProductsGQL, DeleteProductGQL]
})
export class EditProductComponent implements OnInit, OnDestroy {
  private _destroyed$ = new ReplaySubject()

  private _image$ = new BehaviorSubject<File>(null)
  private _category$ = new BehaviorSubject<FullCategory>({ id: 0, title: 'Форма загружается..', productInfoFields: [] })
  category$ = this._category$.asObservable()
  private _product$ = new BehaviorSubject<FullProduct>(null)
  // product$ = this._category$.asObservable()

  private _message$ = new BehaviorSubject('')
  message$ = this._message$.asObservable()
  private _isLoading$ = new BehaviorSubject(false)
  isLoading$ = this._isLoading$.asObservable()

  initForm(productInfoFields: ProductInfoField[], product: FullProduct) {

    const generateInfoValueField = ({ info, value }: { info: ProductInfoField, value: string }) => {
      const type = info.type
      switch (info.type) {
        case 'string':
          return this.formBuilder.group({
            type,
            name: info.name,
            value: [value, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]]
          })
        case 'bool':
          return this.formBuilder.group({
            type,
            name: info.name,
            value: [value]
          })
        case 'num':
          return this.formBuilder.group({
            type,
            name: info.name,
            value: [value, [Validators.required, Validators.min(info.min), Validators.max(info.max)]]
          })
        case 'enum':
          return this.formBuilder.group({
            type,
            name: info.name,
            value: [value, [Validators.required]],
            variants: this.formBuilder.array(info.variants.map(v => ({ value: v, text: v })))
          })
      }
    }

    this.editProductForm = this.formBuilder.group({
      name: [product.name, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      price: [product.price, Validators.required],
      amount: [product.amount, Validators.required],
      image: [],
      infoValues: this.formBuilder.array(mateInfosWithValues(productInfoFields, product.infoValues).map(generateInfoValueField))
    })
  }

  editProductForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    price: ['', Validators.required],
    amount: ['', Validators.required],
    image: [],
    infoValues: this.formBuilder.array([])
  })

  onFileSelect(event) {
    this._image$.next(<File> event.target.files[0])
  }

  deleteProduct() {
    this.deleteProductGQL.mutate(
      { id: +this.route.snapshot.params['productId'] }
    ).subscribe(
      () => this.router.navigateByUrl(`/admin/products/${this.route.snapshot.params['categoryId']}`),
      err => {
        this._message$.next(err.message)
        console.dir(err)
        this._isLoading$.next(false)
      }
    )

  }

  editProduct() {
    const form = this.editProductForm.value

    this._isLoading$.next(true)
    this.editProductGQL.mutate(
      {
        id: this._product$.value.id,
        image: this._image$.value,
        infoValues: form.infoValues.map(infoValue => ({ name: infoValue.name, value: infoValue.value })),
        name: form.name,
        price: form.price,
        amount: form.amount
      },
      {
        context: {
          useMultipart: true
        }
      }
    ).subscribe(
      () => this.router.navigateByUrl(`/admin/products/${this.route.snapshot.params['categoryId']}`),
      err => {
        this._message$.next(err.message)
        console.dir(err)
        this._isLoading$.next(false)
      }
    )
  }

  get infoValues() {
    return this.editProductForm.get('infoValues') as FormArray
  }

  constructor(private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private getFullCategoryGQL: GetFullCategoryGQL,
              private getProductGQL: GetProductsGQL,
              private editProductGQL: EditProductGQL,
              private getCategoryWithProductsGQL: GetCategoryWithProductsGQL,
              private deleteProductGQL: DeleteProductGQL,
              private router: Router) {
  }

  ngOnInit(): void {
    this.route.params.pipe(
      map(params => ({ categoryId: +params.categoryId, productId: +params.productId })),
      switchMap(({ categoryId, productId }) => zip(
        this.getProductGQL.fetch({ id: productId }), this.getFullCategoryGQL.fetch({ id: categoryId }))
      ),
      takeUntil(this._destroyed$)
    ).subscribe(
      ([product, category]) => {
        this._product$.next(product.data.getProduct)
        this._category$.next(category.data.getCategory)
        this.initForm(this._category$.value.productInfoFields, this._product$.value)
      },
      (err) => {
        console.log('АШИБК')
        console.log(err)
        console.log('АШИБК')
      }
    )
  }

  ngOnDestroy(): void {
    this._destroyed$.next()
    this._destroyed$.complete()
  }

}
