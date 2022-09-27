import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appNext]'
})
export class NextDirective {

  constructor(private el:ElementRef) { }

  @HostListener ('click')

  nextFun(){
    let el = this.el.nativeElement.parentElement.parentElement.children[0];
    let item = el.getElementsByClassName('item');
    el.append(item[0]);
  }

}
