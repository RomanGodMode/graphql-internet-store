import { Component, OnInit } from '@angular/core'
import { UploadFileGQL } from './mutation/upload-file.mutation'
import { Apollo } from 'apollo-angular'

@Component({
  selector: 'app-edit-product-list',
  templateUrl: './edit-product-list.component.html',
  styleUrls: ['./edit-product-list.component.scss'],
  providers: [UploadFileGQL]
})
export class EditProductListComponent implements OnInit {
  private file: File

  constructor(private uploadFileGQL: UploadFileGQL, private apollo: Apollo) {
  }

  onFileSelect(event) {
    const file = <File> event.target.files[0]
    console.log(file)
    this.uploadFileGQL.mutate(
      { file },
      {
        context: {
          useMultipart: true
        }
      }
    ).subscribe(
      console.log,
      console.error,
      () => console.log('Ого, конец')
    )
  }

  ngOnInit(): void {
  }

}

// const formData = new FormData()
// formData.append('image', this.file, this.file.name)
// console.log(formData)
