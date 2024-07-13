import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ToastrService } from 'ngx-toastr';
import ValidateForm from 'src/app/Helper/ValidateForm';
import { AdminsideServiceService } from 'src/app/service/adminside-service.service';

@Component({
  selector: 'app-add-mission-theme',
  templateUrl: './add-mission-theme.component.html',
  styleUrls: ['./add-mission-theme.component.css']
})
export class AddMissionThemeComponent implements OnInit {
  addMissionThemeForm:FormGroup;
  themeId:any;
  editData:any;
  constructor(public fb:FormBuilder,public router:Router,public toast:NgToastService,public service:AdminsideServiceService,public activeRoute:ActivatedRoute) {
    this.themeId = this.activeRoute.snapshot.paramMap.get("Id")
    if(this.themeId != null)
    {
      // this.FetchDataById(this.themeId);
    }
  }

  ngOnInit(): void {
    this.MissionThemeFormValidate();
  }

  MissionThemeFormValidate(){
    this.addMissionThemeForm = this.fb.group({
      id:[0],
      themeName:['',Validators.compose([Validators.required])],
      status:['',Validators.compose([Validators.required])]
    })
  }

  OnSubmit(){
      let value = this.addMissionThemeForm.value;
        console.log("hello")
        if(value.id == 0)
        {
          this.InsertData(value);
        }
        else
        {
          this.UpdateData(value)
        }
  }

  InsertData(value:any){
    this.service.AddMissionTheme(value).subscribe
    ({
      next : (data : any) =>
      {
        this.toast.success({detail:"SUCCESS",summary:"MissionTheme Added Successfully",duration:3000});
        setTimeout(() => {
          this.router.navigate(['admin/missionTheme']);
        }, 1000);
      }
    })
  }
  UpdateData(value:any){
    this.service.UpdateMissionTheme(value).subscribe
    ({
      next : (data : any) =>
        {
          this.toast.success({detail:"SUCCESS",summary:"MissionTheme Added Successfully",duration:3000});
          setTimeout(() => {
            this.router.navigate(['admin/missionTheme']);
          }, 1000);
        }
    })
  }
  OnCancel(){
    this.router.navigateByUrl('admin/missionTheme');
  }
}
