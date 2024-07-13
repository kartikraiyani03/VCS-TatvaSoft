import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommonService } from '../service/common.service';
import { Router } from '@angular/router';
import { NgToastModule, NgToastService } from 'ng-angular-popup';
import { Validators } from 'ngx-editor';
import { ClientService } from '../service/client.service';
import { AdminsideServiceService } from '../service/adminside-service.service';
import { error } from 'jquery';

@Component({
  selector: 'app-new-mission',
  templateUrl: './new-mission.component.html',
  styleUrls: ['./new-mission.component.css']
})
export class NewMissionComponent implements OnInit {

  myForm : FormGroup
  formValid:boolean;

  constructor(private fb: FormBuilder, public clientservice: ClientService,private router: Router, private toast: NgToastService) { }

  ngOnInit(): void
  {
    this.myForm = this.fb.group({
      country: ['', Validators.required],
      city: ['', Validators.required],
      missionTitle: ['', Validators.required],
      missionDescription: ['', Validators.required],
      missionOrganisationName: ['', Validators.required],
      missionOrganisationDetail: ['', Validators.required],
      startDate: [''],
      endDate: [''],
      totalSeats: ['', Validators.required],
      missionRegistrationDeadline: [''],
      missionTheme: [''],
      missionSkills: [''],
      missionImages: [null],
      missionDocuments: [null],
      missionAvailability: ['']
    })
  }
  onFileChange(event, controlName: string) {
    const file = (event.target as HTMLInputElement).files;
    this.myForm.patchValue({
      [controlName]: file
    });
  }

  onSubmit(){
    this.formValid = true;
    if(this.myForm.valid)
    {
      let mission = this.myForm.value;
      console.log(mission)
      // mission.userType = 'user';
      this.clientservice.AddMission(mission).subscribe
      ({
        next : (data : any) =>
        {
          this.toast.success({detail:"SUCCESS",summary:"Mission Added Successfully",duration:3000});
        }
      })
      this.formValid = false;
    }
}
  displayStyle = "none";

  openPopup() {

    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
  }
}
