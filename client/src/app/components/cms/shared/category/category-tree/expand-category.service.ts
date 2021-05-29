import { Injectable } from '@angular/core'

@Injectable()
export class ExpandCategoryService {

  private _expandInfo: { [key: number]: boolean } = {}

  isExpanded(categoryId: number): boolean {
    return this._expandInfo[categoryId]
  }

  toggleExpanded(categoryId: number) {
    this._expandInfo[categoryId] = !this._expandInfo[categoryId]
  }
}
