import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizerPipe } from './dom-sanitizer.pipe';
import { ImageSanitizerPipe } from './image-sanitizer.pipe';
import { ImagenPostPipe } from './imagen-post.pipe';



@NgModule({
  declarations: [
    DomSanitizerPipe,
    ImageSanitizerPipe,
    ImagenPostPipe
  ],
  exports: [
    DomSanitizerPipe,
    ImageSanitizerPipe,
    ImagenPostPipe
  ]
})
export class PipesModule { }
