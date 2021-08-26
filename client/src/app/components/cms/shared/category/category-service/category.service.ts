import { EventEmitter, Injectable } from '@angular/core'
import { EntireCategoryTreeGQL } from '../../../../shared/quyery/entire-tree.query'
import { BehaviorSubject, Observable, PartialObserver } from 'rxjs'
import { TreeNode } from '../category-tree/types/tree-node'
import { map } from 'rxjs/operators'
import { AddSubCategoryGQL } from './mutations/add-sub-category.mutation'
import { getNodeById } from '../../../../../functions/get-node-by-id'
import { DeleteCategoryGQL } from './mutations/delete-category.mutation'
import { AddRootCategoryGQL } from './mutations/add-root-category.mutation'

@Injectable()
export class CategoryService {

  entireTree$: Observable<TreeNode[]>

  error$ = new BehaviorSubject('')

  onDelete = new EventEmitter()

  private handleErrorObserver: PartialObserver<any> = {
    next: () => this.error$.next(''),
    error: err => this.error$.next(err.message),
    complete: () => console.log('Конец')
  }

  constructor(
    private entireCategoryTreeGQL: EntireCategoryTreeGQL,
    private addSubCategoryGQL: AddSubCategoryGQL,
    private addRootCategoryGQL: AddRootCategoryGQL,
    private deleteCategoryGQL: DeleteCategoryGQL
  ) {
    this.entireTree$ = this.entireCategoryTreeGQL.watch().valueChanges.pipe(
      map(v => v.data.getEntireTree)
    )
  }

  addSubCategory(parentId: number, title: string) {
    if (!parentId) {
      return this.error$.next('Выберите категорию')
    }
    this.addSubCategoryGQL.mutate({ parentId, title }, {
      update: (cache, mutationResult) => {
        const treeRoots: TreeNode[] = JSON.parse(JSON.stringify((cache.readQuery({ query: this.entireCategoryTreeGQL.document }) as any).getEntireTree))
        const parent = getNodeById(treeRoots, parentId)

        const createdNode = mutationResult.data.addSubCategory
        parent.children.push({ ...createdNode, children: [] })

        cache.writeQuery({
          query: this.entireCategoryTreeGQL.document,
          data: {
            getEntireTree: treeRoots
          }
        })
      }
    }).subscribe(this.handleErrorObserver)
  }

  addRootCategory(title: string) {
    this.addRootCategoryGQL.mutate({ title }, {
      update: (cache, mutationResult) => {
        const treeRoots: TreeNode[] = JSON.parse(JSON.stringify((cache.readQuery({ query: this.entireCategoryTreeGQL.document }) as any).getEntireTree))

        treeRoots.push({ ...mutationResult.data.addRootCategory, children: [] })

        cache.writeQuery({
          query: this.entireCategoryTreeGQL.document,
          data: {
            getEntireTree: treeRoots
          }
        })
      }
    }).subscribe(this.handleErrorObserver)
  }

  deleteCategory(id: number) {
    if (!id) {
      return this.error$.next('Выберите категорию')
    }
    this.deleteCategoryGQL.mutate({ id }, {
      refetchQueries: [{ query: this.entireCategoryTreeGQL.document }]
    }).subscribe(this.handleErrorObserver)
    this.onDelete.emit()
  }

}
