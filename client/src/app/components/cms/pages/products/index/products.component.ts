import { Component, OnDestroy, OnInit } from '@angular/core'
import { CategoryService } from '../../../shared/category/category-service/category.service'
import { TreeNode } from '../../../shared/category/category-tree/types/tree-node'
import { Router } from '@angular/router'

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {

  selectCategory(categoryNode: TreeNode) {
    if (categoryNode) {
      this.router.navigateByUrl(`admin/products/${categoryNode.id}`).then()
    }
  }

  constructor(public categoryService: CategoryService, private router: Router) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

}
