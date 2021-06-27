import { Component, OnInit } from '@angular/core'
import { UploadFileGQL } from './mutation/upload-file.mutation'

@Component({
  selector: 'app-edit-product-list',
  templateUrl: './edit-product-list.component.html',
  styleUrls: ['./edit-product-list.component.scss'],
  providers: [UploadFileGQL]
})
export class EditProductListComponent implements OnInit {

  constructor(private uploadFileGQL: UploadFileGQL) {
  }

  onFileSelect(event) {
    const file = <File> event.target.files[0]
    this.uploadFileGQL.mutate(
      { image: file },
      {
        context: {
          useMultipart: true
        }
      }
    ).subscribe(
      console.log,
      err => console.dir(err)
      // () => console.log('Ого, конец')
    )
  }

  ngOnInit(): void {
  }

}

// const formData = new FormData()
// formData.append('image', this.file, this.file.name)
// console.log(formData)
