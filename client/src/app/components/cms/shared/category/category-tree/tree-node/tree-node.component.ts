import { Component, Input } from '@angular/core'
import { TreeNode } from '../types/tree-node'
import { SelectCategoryService } from '../select-category.service'
import { ExpandCategoryService } from '../expand-category.service'

@Component({
  selector: 'app-tree-node',
  templateUrl: './tree-node.component.html',
  styleUrls: ['./tree-node.component.scss']
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class TreeNodeComponent {

  @Input()
  node: TreeNode

  constructor(public expandCategoryService: ExpandCategoryService, public selectCategoryService: SelectCategoryService) {
  }

  selectThis = () => this.selectCategoryService.selectNode(this.node)
}
