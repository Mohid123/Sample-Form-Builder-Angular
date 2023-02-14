import { Component, Input, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';

interface ValidationObj {
  validationType: string,
  validationMessage: string | null
}

@Component({
  selector: 'app-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.scss'],
})
export class TextFieldComponent implements OnInit, OnDestroy {

  @Input() labelTxt!: string;
  @Input() type!: string;
  @Input() validations!: BehaviorSubject<any[]>;
  @Input() placeholder!: string;
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
      if(val.maxlength) {
        this.f.addValidators(Validators.maxLength(Number(val.maxlength)));
        this.maxLengthValidation.validationType = 'maxlength'
        val.maxLengthMessage ? this.maxLengthValidation.validationMessage = val.maxLengthMessage : this.maxLengthValidation.validationMessage = `A maximum of ${val.maxlength} characters are allowed`;
        this.f.updateValueAndValidity({onlySelf: true})
      }
      if(val.minlength) {
        this.f.addValidators(Validators.minLength(Number(val.minlength)));
        this.minLengthValidation.validationType = 'minlength';
        val.minLengthMessage ? this.minLengthValidation.validationMessage = val.minLengthMessage : this.minLengthValidation.validationMessage = `Please provide at least ${val.minlength} characters`;
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
