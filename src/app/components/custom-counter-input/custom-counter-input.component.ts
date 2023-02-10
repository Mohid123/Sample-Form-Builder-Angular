import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { changeName, customIncrement } from '../state/counter.actions';
import { CounterState } from '../state/counter.reducer';
import { getName } from '../state/counter.selector';

@Component({
  selector: 'app-custom-counter-input',
  templateUrl: './custom-counter-input.component.html',
  styleUrls: ['./custom-counter-input.component.scss'],
})
export class CustomCounterInputComponent implements OnInit {
  value!: number;
  name!: Observable<string>;

  constructor(private store: Store<CounterState>) { }

  ngOnInit() {
    this.name = this.store.select(getName);
  }

  onAdd() {
    this.store.dispatch(customIncrement({value: this.value}))
  }

  changeText(value: string) {
    this.store.dispatch(changeName({name: value}))
  }

}
