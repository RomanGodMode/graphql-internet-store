import { Component, Input } from '@angular/core'
import { TreeNode } from '../../../../shared/category/category-tree/types/tree-node'
import { CategoryService } from '../../../../shared/category/category-service/category.service'
import { ActivatedRoute, Router } from '@angular/router'
import { FormControl } from '@angular/forms'

@Component({
  selector: 'edit-category-tree-panel',
  templateUrl: './edit-category-tree-panel.component.html',
  styleUrls: ['./edit-category-tree-panel.component.scss']
})
export class EditCategoryTreePanelComponent {

  @Input()
  selectedCategory?: TreeNode
  public title: FormControl

  constructor(public categoryService: CategoryService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.title = new FormControl('')
  }

  toEditCategory() {
    if (!this.selectedCategory?.id) {
      return this.categoryService.error$.next('Выберите категорию')
    }
    this.router.navigate([this.selectedCategory?.id], { relativeTo: this.activatedRoute }).then()
  }


}
