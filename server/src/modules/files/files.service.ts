import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { FileUpload } from 'graphql-upload'
import * as path from 'path'
import { createWriteStream } from 'fs'
import { v4 } from 'uuid'


@Injectable()
export class FilesService {

  createFile(file: FileUpload): Promise<string> {
    const extension = file.filename.split('.').pop()
    const filename = v4() + '.' + extension

    const dest = path.resolve(__dirname, '..', '..', '..', 'uploads', filename)

    return new Promise(async resolve =>
      file.createReadStream()
        .pipe(createWriteStream(dest, { autoClose: true }))
        .on('finish', () => resolve(filename))
        .on('error', () => {
          throw new InternalServerErrorException('Файл не смог загрузится')
        })
    )
  }

}
