import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { map, switchMap, takeUntil } from 'rxjs/operators'
import { BehaviorSubject, ReplaySubject } from 'rxjs'
import { CreateProductGQL } from './mutation/upload-file.mutation'
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { GetFullCategoryGQL } from '../../../../../shared/quyery/get-category.query'
import { FullCategory, ProductInfoField } from '../../../../../../types/category'

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
  providers: [GetFullCategoryGQL, CreateProductGQL]
})
export class AddProductComponent implements OnInit, OnDestroy {

  private _destroyed$ = new ReplaySubject()
  private _image$ = new BehaviorSubject<File>(null)
  private _category$ = new BehaviorSubject<FullCategory>({ id: 0, title: 'Форма загружается..', productInfoFields: [] })
  category$ = this._category$.asObservable()

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private getFullCategoryGQL: GetFullCategoryGQL,
    private createProductGQL: CreateProductGQL
  ) {
  }

  createProductForm: FormGroup

  onFileSelect(event) {
    this._image$.next(<File> event.target.files[0])
  }

  createProduct() {
    const form = this.createProductForm.value

    console.log(form.infoValues)

    this.createProductGQL.mutate(
      {
        image: this._image$.value,
        infoValues: form.infoValues.map(infoValue => ({ name: infoValue.name, value: infoValue.value })),
        name: form.name,
        categoryId: this._category$.value.id,
        price: form.price
      },
      {
        context: {
          useMultipart: true
        }
      }
    ).subscribe(
      console.log,
      err => console.dir(err)
    )
  }

  get infoValues() {
    return this.createProductForm.get('infoValues') as FormArray
  }

  initForm(productInfoFields: ProductInfoField[]) {
    const generateInfoValueField = (productInfoField: ProductInfoField) => {
      const type = productInfoField.type
      switch (productInfoField.type) {
        case 'string':
          return this.formBuilder.group({
            type,
            name: productInfoField.name,
            value: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]]
          })
        case 'bool':
          return this.formBuilder.group({
            type,
            name: productInfoField.name,
            value: ['']
          })
        case 'num':
          return this.formBuilder.group({
            type,
            name: productInfoField.name,
            value: [productInfoField.min, [Validators.required, Validators.min(productInfoField.min), Validators.max(productInfoField.max)]]
          })
        case 'enum':
          return this.formBuilder.group({
            type,
            name: productInfoField.name,
            value: ['', [Validators.required]],
            variants: this.formBuilder.array(productInfoField.variants.map(v => ({ value: v, text: v })))
          })
      }
    }

    this.createProductForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      price: ['', Validators.required],
      image: [],
      infoValues: this.formBuilder.array(productInfoFields.map(generateInfoValueField))
    })
  }

  ngOnInit(): void {
    this.activatedRoute.params.pipe(
      map(params => +params.categoryId),
      switchMap(id => this.getFullCategoryGQL.fetch({ id })),
      map(res => res.data.getCategory),
      takeUntil(this._destroyed$)
    ).subscribe(this._category$)

    this._category$.subscribe(category => this.initForm(category.productInfoFields))
  }

  ngOnDestroy(): void {
    this._destroyed$.next()
    this._destroyed$.complete()
  }

}
