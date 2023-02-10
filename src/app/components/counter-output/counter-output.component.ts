import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CounterState } from '../state/counter.reducer';
import { getCounter } from '../state/counter.selector';

@Component({
  selector: 'app-counter-output',
  templateUrl: './counter-output.component.html',
  styleUrls: ['./counter-output.component.scss'],
})
export class CounterOutputComponent implements OnInit {
  // @Input() counter!: number;
  counter!: Observable<number>;
  constructor(private store: Store<CounterState>) { }

  ngOnInit() {
    this.counter = this.store.select(getCounter);
  }

}
