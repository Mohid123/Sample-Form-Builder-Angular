import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';

interface ValidationObj {
  validationType: string,
  validationMessage: string | null
}

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
})
export class CheckboxComponent implements OnInit {

  @Input() labelTxt!: string;
  @Input() validations!: BehaviorSubject<any[]>;
  @Output() editField = new EventEmitter<void>();
  @Output() removeField = new EventEmitter<void>();
  textFieldControl: FormControl = new FormControl(null);
  destroy$ = new Subject();
  requiredValidation: ValidationObj = {validationType: "", validationMessage: null};
  minLengthValidation: ValidationObj = {validationType: "", validationMessage: ""};
  maxLengthValidation: ValidationObj = {validationType: "", validationMessage: ""};

  constructor() { }

  ngOnInit() {
    this.validations.pipe(takeUntil(this.destroy$)).subscribe(val => {
      if(val.length > 0) {
        this.initValidations(val);
      }
    })
  }

  get f() {
    return this.textFieldControl
  }

  initValidations(validations: any[]) {
    validations.map(val => {
      if(val.required === true) {
        this.f.addValidators(Validators.required);
        this.requiredValidation.validationType = 'required';
        this.requiredValidation.validationMessage = val.requiredMessage;
        this.f.updateValueAndValidity({onlySelf: true})
      }
    })
  }

  setEditFields() {
    this.editField.emit();
  }

  setRemoveField() {
    this.removeField.emit();
  }

  ngOnDestroy(): void {
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }

}
