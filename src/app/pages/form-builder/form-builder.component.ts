import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IonModal } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

class TextFieldAttributes {
  label: string;
  placeholder: string;
  validations: BehaviorSubject<any>;

  constructor() {
    this.label = "";
    this.placeholder = "";
    this.validations = new BehaviorSubject([]);
  }
}

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss']
})
export class FormBuilderComponent implements OnInit {
  @ViewChild(IonModal) modal?: IonModal;
  @ViewChild('fieldTarget') fieldTarget: any;
  inputDataForm!: FormGroup;
  textFieldValues!: TextFieldAttributes;
  textArray: any[] = [];

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.initForm()
  }

  initForm() {
    this.inputDataForm = new FormGroup({
      label: new FormControl(null, Validators.required),
      placeholder: new FormControl(null, Validators.required),
      validations: new FormArray([
        this.fb.group({
          required: [false, Validators.required],
          minlength: ['', Validators.required],
          maxlength: ['', Validators.required],
          requiredMessage: [null],
          minLengthMessage: [null],
          maxLengthMessage: [null]
        })
      ])
    })
  }

  get validations() {
    return this.inputDataForm.controls['validations'] as FormArray
  }

  cancel() {
    this.modal!.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal!.dismiss();
  }

  submitForm() {
    this.confirm();
    this.textFieldValues = new TextFieldAttributes();
    this.textFieldValues.label = this.inputDataForm.controls['label'].value;
    this.textFieldValues.placeholder = this.inputDataForm.controls['placeholder'].value;
    this.textFieldValues.validations.next(this.validations.value);
    this.textArray = [...this.textArray, {...this.textFieldValues}];
    this.validations.reset();
    this.inputDataForm.reset();
  }

  returnUpdatedList(data: any) {
    this.textArray = data;
  }

}
