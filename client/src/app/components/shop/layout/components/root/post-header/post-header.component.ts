import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core'
import { EntireCategoryTreeGQL } from '../../../../../shared/quyery/entire-tree.query'
import { ActivatedRoute } from '@angular/router'
import { catchError, map, takeUntil, tap } from 'rxjs/operators'
import { BehaviorSubject, Observable, of, ReplaySubject } from 'rxjs'
import { TreeNode } from '../../../../../cms/shared/category/category-tree/types/tree-node'
import { MessagesService } from '../../../../shared/components/buyer-notification/messages.service'

@Component({
  selector: 'shop-post-header',
  templateUrl: './post-header.component.html',
  styleUrls: ['./post-header.component.scss'],
  providers: [EntireCategoryTreeGQL],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostHeaderComponent implements OnInit, OnDestroy {

  destroyed$ = new ReplaySubject()

  categories$: Observable<TreeNode[]>
  isLoading$ = new BehaviorSubject(false)


  constructor(
    private route: ActivatedRoute,
    private getEntireCategoryTreeGQL: EntireCategoryTreeGQL,
    private messagesService: MessagesService
  ) {
  }

  ngOnInit(): void {
    this.isLoading$.next(true)
    this.categories$ = this.getEntireCategoryTreeGQL.fetch().pipe(
      catchError(() => {
        this.messagesService.showMessage('Категории не смогли загрузиться')
        return of({ data: { getEntireTree: [] } })
      }),
      tap(() => this.isLoading$.next(false)),
      map(res => res.data.getEntireTree),
      takeUntil(this.destroyed$)
    )
  }

  ngOnDestroy(): void {
    this.destroyed$.next()
    this.destroyed$.complete()
  }

}
