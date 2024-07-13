import { Component, OnInit } from '@angular/core';
import { data } from 'jquery';
import { NgToastService } from 'ng-angular-popup';
import { AdminsideServiceService } from 'src/app/service/adminside-service.service';
declare var window:any;
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  page: number = 1;
  itemsPerPages: number = 10;
  searchText:any='';
  userList:any[]=[];
  deleteModal:any;
  userId:any;
  constructor(private service:AdminsideServiceService,private toast:NgToastService) { }

  ngOnInit(): void {
    this.FetchUserList();
    this.deleteModal = new window.bootstrap.Modal(
      document.getElementById('removeMissionModal')
    );
  }
  FetchUserList() 
  {
    this.service.UserList().subscribe
    ({
      next: (data: any) => 
      {
        console.log("API Response:", data);
        this.userList = data;
      },
      error: (err) => {
        console.error("API Error:", err);
        this.toast.error({ detail: "ERROR", summary: "Network Error", duration: 3000 });
      }
    });
  }


  
  CloseRemoveMissionModal(){
    this.deleteModal.hide();
  }

  DeleteUser(userId: number) {
    console.log("Deleting user with ID:", userId);
    this.service.DeleteUser(userId).subscribe({
      next: (data: any) => 
      {
        this.toast.success({ detail: "SUCCESS", summary: "User Deleted Successfully", duration: 3000 });
        this.userList = this.userList.filter(user => user.id !== this.userId);
        window.location.reload();
        if (data.result == 1) 
        {
        } 
        else 
        {
          this.toast.error({ detail: "ERROR", summary: data.message, duration: 3000 });
        }
      },
      error: err => 
      {
        console.error("DeleteUser API Error:", err);
        this.toast.error({ detail: "ERROR", summary: err.error.message, duration: 3000 });
      },
      complete: () => {
        console.log("DeleteUser request completed.");
      }
    });
  }
  
  

}
