import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WindowRef } from '@progress/kendo-angular-dialog';
import { NgToastService } from 'ng-angular-popup';
import { AdminsideServiceService } from 'src/app/service/adminside-service.service';
declare var window:any;
@Component({
  selector: 'app-mission-application',
  templateUrl: './mission-application.component.html',
  styleUrls: ['./mission-application.component.css']
})
export class MissionApplicationComponent implements OnInit {
  applicationList: any[] = [];
  searchText: any = "";
  page: number = 1;
  itemsPerPages: number = 5;
  applicationId: any;
  deleteApplicationmodal : any;
  
  constructor(public service: AdminsideServiceService, private toast: NgToastService, private route: Router) { }

  ngOnInit(): void {
    this.FetchMissionApplicationList();
    this.deleteApplicationmodal = new window.bootstrap.Modal(
      document.getElementById('removeMissionApplicationModal')
    );
  }

  OpenDeleteApplicationModel(id : any)
  {
    this.deleteApplicationmodal.show()
    this.applicationId = id
  }

  CloseDeleteSkillModal()
  {
    this.deleteApplicationmodal.hide()
  }

  getStatus(status) {
    return status ? 'Approve' : 'Pending';
  }

  FetchMissionApplicationList() {
    this.service.MissionApplicationList().subscribe
      ({
        next: (data: any) => {
          this.applicationList = data;

        }
      })
  }

  ApproveMissionApplication(id: any) {
    this.service.MissionApplicationApprove(id).subscribe
    console.log("Helo");
    ({
      next : (data : any) =>
      {
        this.toast.success({ detail: "SUCCESS", summary: "Approved", duration: 3000 });
          window.location.reload();
      }
    })
  }

  DeleteMissionApplication(){
    this.service.MissionApplicationDelete(this.applicationId).subscribe
    ({
      next: (data: any) => {
        this.toast.success({ detail: "SUCCESS", summary: "MissionSkill deleted Successfully", duration: 3000 });
        window.location.reload();
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
    })
  }
}
