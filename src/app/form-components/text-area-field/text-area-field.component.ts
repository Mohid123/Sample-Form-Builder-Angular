import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';

interface ValidationObj {
  validationType: string,
  validationMessage: string | null
}

@Component({
  selector: 'app-text-area-field',
  templateUrl: './text-area-field.component.html',
  styleUrls: ['./text-area-field.component.scss'],
})
export class TextAreaFieldComponent implements OnInit {

  @Input() labelTxt!: string;
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
      if(val.required === true && val.maxlength && val.minlength) {
        this.f.setValidators([
          Validators.required,
          Validators.maxLength(Number(val.maxlength)),
          Validators.minLength(Number(val.minlength))
        ]);
        this.requiredValidation.validationType = 'required';
        this.requiredValidation.validationMessage = val.requiredMessage;
        this.maxLengthValidation.validationType = 'maxlength'
        val.maxLengthMessage ? this.maxLengthValidation.validationMessage = val.maxLengthMessage : this.maxLengthValidation.validationMessage = `A maximum of ${val.maxlength} characters are allowed`;
        this.minLengthValidation.validationType = 'minlength';
        val.minLengthMessage ? this.minLengthValidation.validationMessage = val.minLengthMessage : this.minLengthValidation.validationMessage = `Please provide at least ${val.minlength} characters`;
        this.f.updateValueAndValidity()
      }
      else {
        this.f.clearValidators();
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
