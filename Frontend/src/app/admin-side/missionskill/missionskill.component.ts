import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WindowRef } from '@progress/kendo-angular-dialog';
import { NgToastService } from 'ng-angular-popup';
import { AdminsideServiceService } from 'src/app/service/adminside-service.service';
declare var window:any;
@Component({
  selector: 'app-missionskill',
  templateUrl: './missionskill.component.html',
  styleUrls: ['./missionskill.component.css']
})
export class MissionskillComponent implements OnInit {
  missionSkillList:any[]=[];
  deleteSkillmodal:any;
  page:number=1;
  itemsPerPages:number=10;
  searchText:any;
  skillId:any;
  
  constructor(private service:AdminsideServiceService,private route:Router,private toast:NgToastService) { }

  ngOnInit(): void {
    this.GetMissionSkillList();
    this.deleteSkillmodal = new window.bootstrap.Modal(
      document.getElementById('removeMissionSkillModal')
    );
  }
  GetMissionSkillList(){
    this.service.MissionSkillList().subscribe
    ({
      next : (data : any) =>
      {
        this.missionSkillList = data;
      }
    })
  }
  OpenDeleteSkillModel(id : any)
  {
    this.deleteSkillmodal.show();
    this.skillId = id
  }
 
  CloseDeleteSkillModal()
  {
    this.deleteSkillmodal.hide();
  }
  DeleteSkillModal(){
    this.service.DeleteMissionSkill(this.skillId).subscribe
    ({
      next: (data: any) => {
        this.deleteSkillmodal.hide();
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
