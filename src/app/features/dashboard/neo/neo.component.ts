import { AsyncPipe, CommonModule, JsonPipe } from '@angular/common';
import {ChangeDetectionStrategy, Component} from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatToolbarModule} from '@angular/material/toolbar';
import { takeWhile } from 'rxjs';
import { DataService } from '../../../shared/services/data/data.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-neo',
  standalone: true,
  imports: [MatFormFieldModule, MatDatepickerModule,MatButtonModule, MatIconModule, FormsModule, ReactiveFormsModule, MatToolbarModule, JsonPipe, AsyncPipe, CommonModule, MatCardModule],
  templateUrl: './neo.component.html',
  styleUrl: './neo.component.scss',
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NeoComponent {
  startDate: string = '';
  endDate: string = '';
  isComponentActive = true;
  data = []
  maxDate: Date = new Date();
  constructor(public dataService:DataService){}
  readonly range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  ngOnInit(): void {
    this.range.valueChanges.pipe(takeWhile(() => this.isComponentActive)).subscribe(() => this.update());
    this.dataService.neoData.subscribe({
      next: (data) => {
        console.log(data);
      }
    })
  }

  update(){
    this.startDate = JSON.stringify(this.range.value.start)?.split('T')[0].replace('"','')
    this.endDate = JSON.stringify(this.range.value.end)?.split('T')[0].replace('"','')
    // console.log(this.startDate !=='null' && this.endDate !=='null')
    if (this.startDate !=='null' && this.endDate !=='null' && this.range.value.end! < this.maxDate) {
      console.log(this.endDate)
      this.dataService.fetchNeo(this.startDate, this.endDate)
    }
  }
}
