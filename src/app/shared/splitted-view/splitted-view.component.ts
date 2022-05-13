import {
  Component,
  ContentChild,
  ElementRef,
  OnInit,
  TemplateRef,
} from '@angular/core';

@Component({
  selector: 'app-splitted-view',
  templateUrl: './splitted-view.component.html',
  styleUrls: ['./splitted-view.component.scss'],
})
export class SplittedViewComponent implements OnInit {
  // @ContentChild('left') left: ElementRef | undefined;
  // @ContentChild('right') right: TemplateRef<Component> | undefined;

  constructor() {}

  ngOnInit(): void {}
}
