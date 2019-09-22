import {Directive, ElementRef, HostListener, Renderer2} from "@angular/core";

@Directive({
    selector: '[labelInputStyle]'
})

export class StyleLabelInputDirective{

    constructor(private element:ElementRef, private renderer: Renderer2){
    }

   @HostListener('mouseenter') onMouseenter(){
        console.log(this.element.nativeElement)
        this.renderer.setStyle(this.element.nativeElement,'color','red');
    }

    @HostListener('mouseleave') onMouseLeave(){
        console.log(this.element.nativeElement)
        this.renderer.setStyle(this.element.nativeElement,'color',null);
    }
}
