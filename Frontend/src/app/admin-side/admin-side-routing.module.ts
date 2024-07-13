import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { MissionComponent } from './mission/mission.component';
import { MissionApplicationComponent } from './mission-application/mission-application.component';
import { MissionthemeComponent } from './missiontheme/missiontheme.component';
import { MissionskillComponent } from './missionskill/missionskill.component';
import { LoginComponent } from '../LoginRegister/login/login.component';
import { UpdateMissionComponent } from './mission/update-mission/update-mission.component';
import { AddMissionComponent } from './mission/add-mission/add-mission.component';
import { UserTypeGuard } from '../service/user-type.guard';
import { AddMissionThemeComponent } from './missiontheme/add-mission-theme/add-mission-theme.component';
import { AddMissionSkillComponent } from './missionskill/add-mission-skill/add-mission-skill.component';
import { AddUserComponent } from './user/add-user/add-user.component';
import { UpdateUserComponent } from './user/update-user/update-user.component';


const routes: Routes = [
  {path:'',component:LoginComponent},
 // {path:'login',component:LoginComponent},
//  canActivate:[UserTypeGuard],data: {expectedUserType: 'admin'}
  {path:'dashboard',component:DashboardComponent, },
  {path:'userPage',component:UserComponent},
  {path:'mission',component:MissionComponent},
  {path:'addMission',component:AddMissionComponent},
  {path:'editMission/:Id',component:UpdateMissionComponent},
  {path:'addUser',component:AddUserComponent},
  {path:'editUser/:Id',component:UpdateUserComponent},
  {path:'missionTheme',component:MissionthemeComponent},
  {path:'addMissionTheme',component:AddMissionThemeComponent},
  {path:'updateMissionTheme/:Id',component:AddMissionThemeComponent},
  {path:'missionSkill',component:MissionskillComponent},
  {path:'addMissionSkill',component:AddMissionSkillComponent},
  {path:'updateMissionSkill/:Id',component:AddMissionSkillComponent},
  {path:'missionApplication',component:MissionApplicationComponent},
  {path:'**',component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminSideRoutingModule { }
