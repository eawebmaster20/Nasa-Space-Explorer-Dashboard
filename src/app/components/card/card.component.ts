import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DataService } from '../../shared/services/data/data.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
//  @Input() movie:any;
//  @Input() bookmarked:boolean =false;
//  @Output() toggleBookmarkState:EventEmitter<any> = new EventEmitter();
//  @Input() image: string ='';
//  @Input() description: string='';
//  @Input() color: string ='';

 constructor(public dataService:DataService){}
 toggleBookmark():void {
  // this.bookmarked =!this.bookmarked;
  // this.toggleBookmarkState.emit(this.bookmarked)
 }
}
