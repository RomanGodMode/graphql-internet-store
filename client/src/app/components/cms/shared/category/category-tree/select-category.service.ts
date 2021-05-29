import { Injectable } from '@angular/core'
import { TreeNode } from './types/tree-node'
import { BehaviorSubject, Observable } from 'rxjs'


@Injectable()
export class SelectCategoryService {

  private selectedNodeSubject = new BehaviorSubject<TreeNode>(null)
  selectedNode$: Observable<TreeNode> = this.selectedNodeSubject.asObservable()

  constructor() {
  }

  selectNode(node: TreeNode) {
    this.selectedNodeSubject.next(node)
  }

  unselect() {
    this.selectedNodeSubject.next(null)
  }
}
