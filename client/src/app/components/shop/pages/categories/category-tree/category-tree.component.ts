import { Component, Input, OnInit } from '@angular/core'
import { TreeNode } from '../../../../cms/shared/category/category-tree/types/tree-node'

@Component({
  selector: 'shop-category-tree',
  templateUrl: './category-tree.component.html',
  styleUrls: ['./category-tree.component.scss']
})
export class CategoryTreeComponent implements OnInit {

  constructor() {
  }

  @Input()
  treeRoots!: TreeNode[]

  ngOnInit(): void {
  }

}
