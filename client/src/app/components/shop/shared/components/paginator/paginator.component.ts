import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { map, tap } from 'rxjs/operators'
import { BehaviorSubject, combineLatest, Observable } from 'rxjs'

const PER_PAGE_SET = 5

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit, OnChanges {

  @Input()
  totalCount!: number | null

  @Input()
  perPage: number = 6

  currentPage: Observable<number>
  private pageSetNumber: Observable<number>
  pageSet: Observable<number[]>

  get PagesCount() {
    return Math.ceil(this.totalCount / this.perPage)
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.currentPage = this.route.queryParams.pipe(
      map(({ pageNumber }) => +pageNumber),
      tap(pageNumber => !pageNumber && this.router.navigate(
        [],
        {
          relativeTo: this.route,
          queryParams: { pageNumber: '1' },
          queryParamsHandling: 'merge'
        }))
    )
    this.pageSetNumber = this.currentPage.pipe(
      map(pageNumber => {
        return Math.ceil(pageNumber / PER_PAGE_SET)
      })
    )
    this.pageSet = combineLatest([this.pageSetNumber, this._pagesCount$]).pipe(
      map(([pageSetNumber, pagesCount]) => {
        const pastPagesCount = (pageSetNumber - 1) * PER_PAGE_SET
        const pageLimit = Math.min(pastPagesCount + PER_PAGE_SET, pagesCount)
        const pageSet = []
        for (let page = pastPagesCount + 1; page <= pageLimit; page++) {
          pageSet.push(page)
        }
        return pageSet
      })
    )

  }

  _pagesCount$ = new BehaviorSubject(0)

  ngOnChanges(changes: SimpleChanges) {
    for (let propName in changes) {
      if (propName === 'totalCount') {
        this._pagesCount$.next(this.PagesCount)
      }
    }
  }

}
