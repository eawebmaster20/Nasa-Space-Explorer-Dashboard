import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DataService } from '../../shared/services/data/data.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IRov } from '../../shared/models/rov.interface';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
 @Input() photo!:IRov;
 @Input() bookmarked:boolean =false;
 @Output() toggleBookmarkState:EventEmitter<any> = new EventEmitter();

 constructor(public dataService:DataService){}
 toggleBookmark():void {
  this.bookmarked =!this.bookmarked;
  this.toggleBookmarkState.emit(this.bookmarked)
 }
}
