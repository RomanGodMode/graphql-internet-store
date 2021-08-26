import { Component, Input, OnInit } from '@angular/core'
import { TreeNode } from '../../../../../cms/shared/category/category-tree/types/tree-node'

@Component({
  selector: 'shop-category-node',
  templateUrl: './category-node.component.html',
  styleUrls: ['./category-node.component.scss']
})
export class CategoryNodeComponent implements OnInit {

  constructor() {
  }

  @Input()
  node!: TreeNode

  ngOnInit(): void {
  }

}
