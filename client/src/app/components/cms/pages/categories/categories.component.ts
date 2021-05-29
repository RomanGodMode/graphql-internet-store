import { Component, OnDestroy, OnInit } from '@angular/core'
import { CategoryService } from '../../shared/category/category-service/category.service'
import { TreeNode } from '../../shared/category/category-tree/types/tree-node'
import { BehaviorSubject } from 'rxjs'

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
  // providers: [SelectCategoryService]
})
export class CategoriesComponent implements OnInit, OnDestroy {

  private selectedCategorySubject = new BehaviorSubject<TreeNode>(null)
  selectedCategory = this.selectedCategorySubject.asObservable()


  selectCategory(node: TreeNode) {
    this.selectedCategorySubject.next(node)
  }

  constructor(public categoryService: CategoryService) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.selectedCategorySubject.complete()
  }

}
