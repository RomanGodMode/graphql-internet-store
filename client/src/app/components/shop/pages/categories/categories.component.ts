import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { EntireCategoryTreeGQL } from '../../../shared/quyery/entire-tree.query'
import { catchError, map, tap } from 'rxjs/operators'
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs'
import { TreeNode } from '../../../cms/shared/category/category-tree/types/tree-node'
import { ActivatedRoute } from '@angular/router'
import { getNodeById } from '../../../../functions/get-node-by-id'

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  providers: [EntireCategoryTreeGQL],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoriesComponent implements OnInit {
  category$: Observable<TreeNode>
  private isLoading$ = new BehaviorSubject(false)

  constructor(
    private route: ActivatedRoute,
    private getEntireCategoryTreeGQL: EntireCategoryTreeGQL
  ) {
  }

  ngOnInit(): void {
    this.isLoading$.next(true)
    this.category$ = combineLatest([
      this.getEntireCategoryTreeGQL.fetch().pipe(
        tap(() => this.isLoading$.next(false)),
        catchError(() => of({ data: { getEntireTree: { id: 0, title: 'Категория не смогла загрузится!', children: [] } } }))
      ),
      this.route.params
    ]).pipe(
      map(([res, params]) => [res.data.getEntireTree, +params.categoryId as any]),
      map(([roots, id]) => id ? getNodeById(roots, id) : { id: 0, title: 'Все', children: roots })
    )
  }

  selectCategory(category: TreeNode) {
    console.log(category)
  }

}

