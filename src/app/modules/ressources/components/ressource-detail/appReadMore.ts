import { Directive, ElementRef, Input, Renderer2 } from "@angular/core";


@Directive({
  selector: '[appReadMore]'
})
export class ReadMoreDirective {
  @Input('appReadMore') maxLength: number = 100;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    const content = this.el.nativeElement.textContent.trim();
    if (content.length > this.maxLength) {
      const shortenedContent = content.slice(0, this.maxLength) + '...';
      const readMoreLink = this.renderer.createElement('a');
      this.renderer.setProperty(readMoreLink, 'textContent', 'Lire la suite');
      this.renderer.addClass(readMoreLink, 'read-more-link');
      this.renderer.setStyle(readMoreLink, 'cursor', 'pointer');
      this.renderer.listen(readMoreLink, 'click', () => {
        this.el.nativeElement.textContent = content;
      });
      
      this.el.nativeElement.textContent = shortenedContent;
      this.renderer.addClass(this.el.nativeElement, 'shortened-content');
      this.el.nativeElement.appendChild(readMoreLink);
    }
  }
  
}