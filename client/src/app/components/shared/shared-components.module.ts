import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ContainerComponent } from './container/container.component'
import { DecoratedTitleWrapperComponent } from './decorated-title-wrapper/decorated-title-wrapper.component'
import { ColoredSvgComponent } from './colored-svg/colored-svg.component'
import { LongLoaderComponent } from './long-loader/long-loader.component'


@NgModule({
  declarations: [ContainerComponent, DecoratedTitleWrapperComponent, ColoredSvgComponent, LongLoaderComponent],
  imports: [
    CommonModule
  ],
  exports: [ContainerComponent, DecoratedTitleWrapperComponent, ColoredSvgComponent, LongLoaderComponent]
})
export class SharedComponentsModule {
}
