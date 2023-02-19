import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastModule, NgToastService } from 'ng-angular-popup';
import { user } from '../models/user.model';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-create-registration',
  templateUrl: './create-registration.component.html',
  styleUrls: ['./create-registration.component.scss']
})
export class CreateRegistrationComponent implements OnInit {
  public packages: string[] = [
    "Monthly",
    "Quarterly",
    "Yearly"
  ];
  public gender: string[] = [
    "Male",
    "Female"
  ];

  public importantlist: string[] = [
    "Toxic Fat",
    "Energy",
    "Fitness",
    "Sugar",
    "Lean Muscle"
  ];
  

  public registerForm!: FormGroup;
  public userIdToUpdate !: number;
  public isUpdateActive: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private api: ApiService,
    private toastService: NgToastService) {

  }
  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      mobile: [''],
      weight: [''],
      height: [''],
      bmi: [''],
      bmiResult: [''],
      gender: [''],
      requireTrainer: [''],
      package: [''],
      important: [''],
      enquiryDate: ['']
    });

    this.registerForm.controls['height'].valueChanges.subscribe(res => {
      this.calculateBmi(res);
    });

    this.activatedRoute.params.subscribe(val => {
      this.userIdToUpdate = val['id'];
      this.api.getRegisterUserId(this.userIdToUpdate)
        .subscribe(res => {
          this.isUpdateActive = true;
          
          this.fillFormToUpdate(res);
        })
    })

  }

  submit() {
    this.api.postRegisteration(this.registerForm.value)
      .subscribe(res => {
        this.toastService.success({ detail: "success", summary: "Enquiry Added", duration: 3000 });
        this.registerForm.reset();
      });

  }
  update() {
    this.api.UpdateRegisteration(this.registerForm.value, this.userIdToUpdate)
      .subscribe(res => {
        this.toastService.success({ detail: "success", summary: "Enquiry Updated", duration: 3000 });
        this.registerForm.reset();
        this.router.navigate(['list']);
      });
  }

  calculateBmi(heightValue: number) {
    const weight = this.registerForm.value.weight;
    const height = heightValue;
    const bmi = weight / (height * height);

    this.registerForm.controls['bmi'].patchValue(bmi);
    switch (true) {
      case bmi < 18.5:
        this.registerForm.controls['bmiResult'].patchValue("UnderWeight");
        break;
      case (bmi >= 18.5 && bmi < 25):
        this.registerForm.controls['bmiResult'].patchValue("Normal");
        break;
      case (bmi >= 25 && bmi < 30):
        this.registerForm.controls['bmiResult'].patchValue("OverWeight");
        break;

      default:
        this.registerForm.controls['bmiResult'].patchValue("Obese");
        break;
    }
  }

  fillFormToUpdate(UserModel: user) {

    this.registerForm.setValue({
      firstName: UserModel.firstName,
      lastName: UserModel.lastName,
      email: UserModel.email,
      mobile: UserModel.mobile,
      weight: UserModel.weight,
      height: UserModel.height,
      bmi: UserModel.bmi,
      bmiResult: UserModel.bmiResult,
      gender: UserModel.gender,
      requireTrainer: UserModel.requireTrainer,
      package: UserModel.package,
      important: UserModel.important,
      enquiryDate: UserModel.enquiryDate,
    })
  }
}
