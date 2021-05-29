import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CategoryTreeComponent } from './category-tree.component'
import { TreeNodeComponent } from './tree-node/tree-node.component'
import { SharedComponentsModule } from '../../../../shared/shared-components.module'


@NgModule({
  declarations: [
    CategoryTreeComponent,
    TreeNodeComponent
  ],
  exports: [
    CategoryTreeComponent
  ],
  imports: [
    CommonModule,
    SharedComponentsModule
  ]
})
export class CategoryTreeModule {
}
