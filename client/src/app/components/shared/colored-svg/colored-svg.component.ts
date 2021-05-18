import { Component, HostBinding, Input, OnInit } from '@angular/core'

@Component({
  selector: 'app-colored-svg',
  templateUrl: './colored-svg.component.html',
  styleUrls: ['./colored-svg.component.scss']
})
export class ColoredSvgComponent implements OnInit {

  @Input()
  src: string

  constructor() {
  }

  ngOnInit(): void {
  }

  @HostBinding('style.-webkit-mask') get webVkid() {
    return `url(${this.src}) no-repeat 50% 50%`
  }

}
