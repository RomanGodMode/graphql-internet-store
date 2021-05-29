import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core'
import { TreeNode } from './types/tree-node'
import { SelectCategoryService } from './select-category.service'
import { Subscription } from 'rxjs'
import { ExpandCategoryService } from './expand-category.service'
import { CategoryService } from '../category-service/category.service'

@Component({
  selector: 'app-category-tree',
  templateUrl: './category-tree.component.html',
  styleUrls: ['./category-tree.component.scss'],
  providers: [ExpandCategoryService, SelectCategoryService]
})
export class CategoryTreeComponent implements OnInit, OnDestroy {

  @Input()
  treeRoots: TreeNode[]

  @Output()
  selectNodeEvent = new EventEmitter<TreeNode>()


  constructor(private selectCategoryService: SelectCategoryService, private categoryService: CategoryService) {
  }

  private subscriptions: Subscription[] = []

  private set sub(subscription: Subscription) {
    this.subscriptions.push(subscription)
  }

  ngOnInit(): void {
    this.sub = this.categoryService.onDelete.subscribe(() => this.selectCategoryService.unselect())
    this.sub = this.selectCategoryService.selectedNode$.subscribe(node => {
      this.selectNodeEvent.emit(node)
      this.categoryService.error$.next('')
    })
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }

}
