import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AppState } from '@capacitor/app';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { changeName, customIncrement } from '../state/counter.actions';
import { getName } from '../state/counter.selector';
import { addPost } from '../state/post.actions';
import { getPosts } from '../state/post.selector';
import { Posts } from '../state/post.state';

@Component({
  selector: 'app-custom-counter-input',
  templateUrl: './custom-counter-input.component.html',
  styleUrls: ['./custom-counter-input.component.scss'],
})
export class CustomCounterInputComponent implements OnInit {
  value!: number;
  name!: Observable<string>;
  posts!: Observable<Posts[]>;
  postForm!: FormGroup;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.name = this.store.select(getName);
    this.posts = this.store.select(getPosts);
    this.initPostForm()
  }

  initPostForm() {
    this.postForm = new FormGroup({
      id: new FormControl(null),
      title: new FormControl(null),
      description: new FormControl(null)
    })
  }

  addPost() {
    const id = Date.now().toString();
    this.postForm.controls['id'].setValue(id);
    console.log(this.postForm.value)
    // this.store.dispatch(addPost)
  }

  onAdd() {
    this.store.dispatch(customIncrement({value: this.value}))
  }

  changeText(value: string) {
    this.store.dispatch(changeName({name: value}))
  }

}
