import { Component, inject, model, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormBuilder, Validators, ReactiveFormsModule} from '@angular/forms';
import {MatStepperModule} from '@angular/material/stepper';
import {DatePipe, formatDate} from '@angular/common';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { ApiserviceService } from '../api/apiservice.service';
export interface DialogData {
  animal: string;
  name: string;
}
interface common {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-membershipform',
  standalone: true,
  imports: [ MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatStepperModule,
    ReactiveFormsModule,
    MatSelectModule, DatePipe],
  templateUrl: './membershipform.component.html',
  styleUrl: './membershipform.component.css'
})
export class MembershipformComponent implements OnInit {
  personalDetailsFormGroup: any;
  feesDetailsFormGroup:any;
  otherDetailsFormGroup:any;
  readonly dialogRef = inject(MatDialogRef<MembershipformComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);
  genders: common[] = [
    {value: 'Male', viewValue: 'Male'},
    {value: 'Female', viewValue: 'Female'},
    {value: 'Other', viewValue: 'Other'},
  ];
  durations: common[] = [
    {value: '1 Month', viewValue: '1 Month'},
    {value: '3 Months', viewValue: '3 Months'},
    {value: '6 Months', viewValue: '6 Months'},
    {value: '1 Year', viewValue: '1 Year'},
  ];
  modes: common[] = [
    {value: 'Cash', viewValue: 'Cash'},
    {value: 'UPI', viewValue: 'UPI'}
  ];
  goals: common[] = [
    {value: 'Weight Loss', viewValue: 'Weight Loss'},
    {value: 'Weight Gain', viewValue: 'Weight Gain'}
  ];
  snacks: common[] = [
    {value: 'Yes', viewValue: 'Yes'},
    {value: 'No', viewValue: 'No'}
  ];
  timings: common[] = [
    {value: 'Morning', viewValue: 'Morning'},
    {value: 'Evening', viewValue: 'Evening'}
  ];
 
  isLinear = false;
  constructor(private _formBuilder: FormBuilder, private apiService: ApiserviceService) {
  console.log(this.data, 'data')
    this.personalDetailsFormGroup = this._formBuilder.group({
      name: ['', Validators.required],
      age: ['', Validators.required],
      gender: ['', Validators.required],
      weight: ['', Validators.required],
      height: ['', Validators.required],
      hipsize: ['', Validators.required],
      address: ['', Validators.required],
      contactnumber: ['', Validators.required],
    });
    this.feesDetailsFormGroup = this._formBuilder.group({
      duration: ['', Validators.required],
      feespaiddate: ['', Validators.required],
      mode: ['', Validators.required],
      feespaid: ['', Validators.required],
      feespending: ['', Validators.required],
    });
    this.otherDetailsFormGroup = this._formBuilder.group({
      referredby: ['', Validators.required],
      timing: ['', Validators.required],
      goal: ['', Validators.required],
      snacks: ['', Validators.required],
    });
  }
  
  ngOnInit(): void {
      this.personalDetailsFormGroup.setValue({
        name: this.data.formValues.name,
        age: this.data.formValues.age,
        gender: this.data.formValues.gender,
        weight:this.data.formValues.weight,
        height: this.data.formValues.height,
        hipsize: this.data.formValues.hipsize,
        address: this.data.formValues.address,
        contactnumber: this.data.formValues.contactnumber,
     });

     this.feesDetailsFormGroup.setValue({
      duration: this.data.formValues.duration,
      feespaiddate: formatDate(this.data.formValues.feespaiddate, 'yyyy-MM-dd', 'en-US'),
      mode: this.data.formValues.mode,
      feespaid: this.data.formValues.feespaid,
      feespending: this.data.formValues.feespending,
    });

    this.otherDetailsFormGroup.setValue({
      referredby: this.data.formValues.referredby,
      timing: this.data.formValues.timing,
      goal: this.data.formValues.goal,
      snacks:this.data.formValues.snacks
      ,
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  submit(){
    if(this.data.addMember){
      this.createMemberData();
    }else{
      this.updateMemberData();
    }
  }

  updateMemberData(){
    console.log(this.feesDetailsFormGroup.controls['feespaiddate'].value)
    let dat = new Date(this.feesDetailsFormGroup.controls['feespaiddate'].value)
    console.log(dat, 'dat');
    let editPayload = {
      id:  this.data.formValues.id,
      name:this.personalDetailsFormGroup.controls['name'].value,
      age: this.personalDetailsFormGroup.controls['age'].value,
      gender: this.personalDetailsFormGroup.controls['gender'].value,
      weight:this.personalDetailsFormGroup.controls['weight'].value,
      height: this.personalDetailsFormGroup.controls['height'].value,
      hipsize: this.personalDetailsFormGroup.controls['hipsize'].value,
      address: this.personalDetailsFormGroup.controls['address'].value,
      contactnumber: this.personalDetailsFormGroup.controls['contactnumber'].value,
      
      duration: this.feesDetailsFormGroup.controls['duration'].value,
      feespiddate: this.feesDetailsFormGroup.controls['feespaiddate'].value,
      modea: this.feesDetailsFormGroup.controls['mode'].value,
      feespaid: this.feesDetailsFormGroup.controls['feespaid'].value,
      feespending: this.feesDetailsFormGroup.controls['feespending'].value,

      referredby: this.otherDetailsFormGroup.controls['referredby'].value,
      timing: this.otherDetailsFormGroup.controls['timing'].value,
      goal: this.otherDetailsFormGroup.controls['goal'].value,
      snacks:this.otherDetailsFormGroup.controls['snacks'].value,
    }
    console.log(editPayload, 'editPayload')
    this.apiService
    .updateMember(editPayload)
    .subscribe(response => {
      if(response === "Membership updated successfully"){
        this.dialogRef.close();
      }else{

      }
      
    });
  }

  createMemberData(){
    let dat = new Date(this.feesDetailsFormGroup.controls['feespaiddate'].value)
    let createPayload = {
      name:this.personalDetailsFormGroup.controls['name'].value,
      age: this.personalDetailsFormGroup.controls['age'].value,
      gender: this.personalDetailsFormGroup.controls['gender'].value,
      weight:this.personalDetailsFormGroup.controls['weight'].value,
      height: this.personalDetailsFormGroup.controls['height'].value,
      hipsize: this.personalDetailsFormGroup.controls['hipsize'].value,
      address: this.personalDetailsFormGroup.controls['address'].value,
      contactnumber: this.personalDetailsFormGroup.controls['contactnumber'].value,
      
      duration: this.feesDetailsFormGroup.controls['duration'].value,
      feespaiddate: dat,
      mode: this.feesDetailsFormGroup.controls['mode'].value,
      feespaid: this.feesDetailsFormGroup.controls['feespaid'].value,
      feespending: this.feesDetailsFormGroup.controls['feespending'].value,

      referredby: this.otherDetailsFormGroup.controls['referredby'].value,
      timing: this.otherDetailsFormGroup.controls['timing'].value,
      goal: this.otherDetailsFormGroup.controls['goal'].value,
      snacks:this.otherDetailsFormGroup.controls['snacks'].value,
    }
    console.log(createPayload, 'createPayload')
    this.apiService
    .createMember(createPayload)
    .subscribe(response => {
      if(response === "Membership created successfully"){
        this.dialogRef.close();
      }else{

      }
      
    });
  }
}
