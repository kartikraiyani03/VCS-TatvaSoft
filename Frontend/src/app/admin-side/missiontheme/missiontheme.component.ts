import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AdminsideServiceService } from 'src/app/service/adminside-service.service';
declare var window:any;
@Component({
  selector: 'app-missiontheme',
  templateUrl: './missiontheme.component.html',
  styleUrls: ['./missiontheme.component.css'],
})
export class MissionthemeComponent implements OnInit {
  missionThemeList: any[] = [];
  page: number = 1;
  itemsPerPages: number = 10;
  searchText: any;
  themeId: any;
  deleteThemeModal:any;
  deleteModal:any;
  constructor(
    private service: AdminsideServiceService,
    private router: Router,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.getMissionThemeList();
    this.deleteThemeModal = new window.bootstrap.Modal(
      document.getElementById('removemissionThemeModal')
    );
  }
  getMissionThemeList() {
    this.service.MissionThemeList().subscribe
    ({
      next : (data : any) =>
      {
        this.missionThemeList = data;
        // this.toast.success({summary: "Theme Added Successfully"})
      },
      error : (err) =>
      {
        this.toast.error({ summary: "Not Added", duration: 3000 })
      }
    })
  }

  OpenRemoveMissionThemeModal(id:any)
  {
    this.deleteThemeModal.show();
    this.themeId = id;
  }
 
  CloseRemoveMissionThemeModal()
  {
    this.deleteThemeModal.hide();
  }

  DeleteMissionTheme() {
    this.service.DeleteMissionTheme(this.themeId).subscribe
    ({
      next: (data: any) => {
        this.toast.success({ detail: "SUCCESS", summary: "MissionTheme deleted Successfully", duration: 3000 });
        this.deleteThemeModal.hide();
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
        console.log("DeleteMissionTheme API call completed.");
      }
    })
  }
}
