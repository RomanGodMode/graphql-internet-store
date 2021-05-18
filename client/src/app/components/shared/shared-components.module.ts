import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ContainerComponent } from './container/container.component'
import { DecoratedTitleWrapperComponent } from './decorated-title-wrapper/decorated-title-wrapper.component'
import { ColoredSvgComponent } from './colored-svg/colored-svg.component'


@NgModule({
  declarations: [ContainerComponent, DecoratedTitleWrapperComponent, ColoredSvgComponent],
  imports: [
    CommonModule
  ],
  exports: [ContainerComponent, DecoratedTitleWrapperComponent, ColoredSvgComponent]
})
export class SharedComponentsModule {
}
