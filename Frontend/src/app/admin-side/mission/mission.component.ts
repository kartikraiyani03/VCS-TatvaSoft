import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ToastrService } from 'ngx-toastr';
import { AdminsideServiceService } from 'src/app/service/adminside-service.service';
declare var window:any;
@Component({
  selector: 'app-mission',
  templateUrl: './mission.component.html',
  styleUrls: ['./mission.component.css']
})
export class MissionComponent implements OnInit {
  deleteModal:any;
  missionList:any[]=[];
  page:number = 1;
  itemsPerPages = 10;
  searchText:any='';
  missionId:any;
  constructor(public service:AdminsideServiceService,public toastr:ToastrService,public router:Router,private toast:NgToastService) { }

  ngOnInit(): void {

    this.FetchData();
    this.deleteModal = new window.bootstrap.Modal(
      document.getElementById('removeMissionModal')
    );
  }

  FetchData()
  {
    this.service.MissionList().subscribe
    ({
      next : (data : any) =>
      {
        console.log("API response",data)
        this.missionList = data;
        this.missionList = this.missionList.map(x=> {
                  return {
                      id:x.id,
                      missionTitle:x.missionTitle,
                      missionDescription:x.missionDescription,
                      missionOrganisationName:x.missionOrganisationName,
                      missionOrganisationDetail:x.missionOrganisationDetail,
                      countryId:x.countryId,
                      cityId:x.cityId,
                      missionType:x.missionType,
                      startDate:x.startDate,
                      endDate:x.endDate,
                      totalSheets:x.totalSheets,
                      registrationDeadLine:x.registrationDeadLine,
                      missionTheme:x.missionTheme,
                      missionSkill:x.missionSkill,
                      missionImages:x.missionImages ? this.service.imageUrl + '/' + x.missionImages : 'assets/NoImg.png',
                      missionDocuments:x.missionDocuments,
                      missionAvilability:x.missionAvilability
                    }
                  })
      },
      error : (err) =>
      {
        console.error("API Response",err)
        this.toast.error({ detail: "ERROR", summary: "Network Error", duration: 3000 });
      } 
    })
  }
  OpenRemoveMissionModal(id:any){
    this.deleteModal.show();
    this.missionId = id;
  }
  CloseRemoveMissionModal(){
    this.deleteModal.hide();
  }

  DeleteMissionData() {
    this.service.DeleteMission(this.missionId).subscribe({
      next: (data: any) => {
        this.toast.success({ detail: "SUCCESS", summary: "Mission deleted Successfully", duration: 3000 });
        this.deleteModal.hide();
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        if (data.result === 1) {
        } else {
          this.toast.error({ detail: "ERROR", summary: data.message, duration: 3000 });
        }
      },
      error: (err) => {
        this.toast.error({ detail: "ERROR", summary: err.message, duration: 3000 });
      },
      complete: () => {
        console.log("DeleteMission API call completed.");
      }
    });
  }
}
