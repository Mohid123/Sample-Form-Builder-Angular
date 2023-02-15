import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IonModal } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';

class TextFieldAttributes {
  type: string;
  label: string;
  placeholder: string;
  validations: BehaviorSubject<any>;
  radioOptions: any;

  constructor() {
    this.type = "text";
    this.label = "";
    this.placeholder = "";
    this.validations = new BehaviorSubject([]);
    this.radioOptions = [];
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
  editMode: BehaviorSubject<boolean> = new BehaviorSubject(false);
  editMode$: Observable<boolean> = this.editMode.asObservable();
  formValueToJson: any;
  editIndex!: number;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.inputDataForm = new FormGroup({
      type: new FormControl(null, Validators.required),
      label: new FormControl(null, Validators.required),
      placeholder: new FormControl(null, Validators.required),
      radioOptions: new FormArray([
        this.fb.group({
          radioLabel: [null],
          radioValue: [null],
        })
      ]),
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

  get radioOptions() {
    return this.inputDataForm.controls['radioOptions'] as FormArray
  }

  get f() {
    return this.inputDataForm.controls;
  }

  addMoreOptions() {
    const itemForm = this.fb.group({
      radioLabel: [null],
      radioValue: [null]
    });
    this.radioOptions.push(itemForm);
  }

  deleteOption(itemIndex: number) {
    this.radioOptions.removeAt(itemIndex);
  }

  cancel() {
    this.modal!.dismiss(null, 'cancel');
    this.validations.reset();
    this.inputDataForm.reset();
    this.modal!.isOpen = false;
  }

  confirm() {
    this.modal!.dismiss();
  }

  submitForm() {
    if(this.editMode.value === false) {
      if(!this.isCheckBoxRadioSelected()) {
        if(this.f['type'].value && this.f['label'].value && this.f['placeholder'].value) {
          this.saveData()
        }
        else {
          this.inputDataForm.markAllAsTouched();
        }
      }
      else {
        if(this.f['type'].value === 'checkbox') {
          if(this.f['label'].value) {
           this.saveData()
          }
          else {
            this.f['label'].markAsTouched();
          }
        }
        if(this.f['type'].value === 'radio') {
          if(this.radioOptions.value) {
            this.saveData()
          }
          else {
            this.radioOptions.markAllAsTouched();
          }
        }
      }
    }
    else {
      this.saveEditModal(this.editIndex)
    }
  }

  returnUpdatedList(data: any) {
    this.textArray = data;
  }

  openModalEdit(index: number) {
    this.editMode.next(true);
    this.editIndex = index;
    const data = this.textArray[index]
    this.modal!.isOpen = true;
    this.inputDataForm.patchValue({
      type: data.type,
      label: data.label,
      placeholder: data.placeholder,
      validations: data.validations.value,
      radioOptions: data.radioOptions,
    })
  }

  saveEditModal(index: number) {
    this.confirm();
    this.textArray[index].type = this.inputDataForm.controls['type'].value;
    this.textArray[index].label = this.inputDataForm.controls['label'].value;
    this.textArray[index].placeholder = this.inputDataForm.controls['placeholder'].value;
    this.textArray[index].validations.next(this.validations.value);
    this.textArray[index].radioOptions = this.radioOptions.value;
    this.formValueToJson = this.inputDataForm.value;
    this.validations.reset();
    this.inputDataForm.reset();
    this.editMode.next(false);
    this.modal!.isOpen = false;
  }

  convertToInteger(value: any) {
    return Number(value)
  }

  removeTextField(index: number) {
    this.textArray.splice(index, 1);
  }

  saveData() {
    this.confirm();
    this.textFieldValues = new TextFieldAttributes();
    this.textFieldValues.type = this.inputDataForm.controls['type'].value;
    this.textFieldValues.label = this.inputDataForm.controls['label'].value;
    this.textFieldValues.placeholder = this.inputDataForm.controls['placeholder'].value;
    this.textFieldValues.validations.next(this.validations.value);
    this.textFieldValues.radioOptions = this.radioOptions.value;
    this.textArray = [...this.textArray, {...this.textFieldValues}];
    this.formValueToJson = this.inputDataForm.value;
    this.validations.reset();
    this.inputDataForm.reset();
  }

  isCheckBoxRadioSelected() {
    return ['checkbox', 'radio'].includes(this.f['type'].value);
  }

}
