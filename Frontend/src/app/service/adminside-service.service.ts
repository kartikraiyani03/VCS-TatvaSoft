import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { City, CMS, Country, Mission } from '../model/cms.model';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MissionApplication } from '../model/missionApplication.model';
import { MissionTheme } from '../model/missionTheme.model';
import { MissionSkill } from '../model/missionSkill.model';
@Injectable({
  providedIn: 'root',
})
export class AdminsideServiceService {
  constructor(
    public http: HttpClient,
    public toastr: ToastrService,
    public router: Router
  ) {}
  // apiUrl:string='http://localhost:63943/api';
  // apiUrl: string = 'http://localhost:56577/api';
  // imageUrl: string = 'http://localhost:56577';
  apiUrl: string = 'https://localhost:44332/api';
  imageUrl: string = 'http://localhost:44332';

  //User
  UserList(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/AdminUSer/ListUser`);
  }
  DeleteUser(userId: any) { 
    return this.http.delete(
      `${this.apiUrl}/AdminUSer/deleteUser/${userId}`
    );
  }

  //CMS
  CMSList(): Observable<CMS[]> {
    return this.http.get<CMS[]>(`${this.apiUrl}/CMS/CMSList`);
  }
  CMSDetailById(id: number): Observable<CMS[]> {
    return this.http.get<CMS[]>(`${this.apiUrl}/CMS/CMSDetailById/${id}`);
  }
  AddCMS(data: CMS) {
    return this.http.post(`${this.apiUrl}/CMS/AddCMS`, data, {
      responseType: 'json',
    });
  }
  UpdateCMS(data: CMS) {
    return this.http.post(`${this.apiUrl}/CMS/UpdateCMS`, data);
  }
  DeleteCMS(data: any) {
    return this.http.delete(`${this.apiUrl}/CMS/DeleteCMS/${data}`);
  }

  //Mission

  GetMissionThemeList():Observable<MissionTheme[]>{
    return this.http.get<MissionTheme[]>(`${this.apiUrl}/Common/MissionThemeList`);
  }
  GetMissionSkillList():Observable<MissionSkill[]>{
    return this.http.get<MissionSkill[]>(`${this.apiUrl}/Common/MissionSkillList`);
  }
  GetMissionTitleList():Observable<Mission[]>{
    return this.http.get<Mission[]>(`${this.apiUrl}/Common/MissionTitleList`);
  }

  
  UploadImage(data: any) {
    return this.http.post(`${this.apiUrl}/Common/UploadImage`,data);
  }
  UploadDoc(data: any) {
    return this.http.post(`${this.apiUrl}/Mission/UploadImage`,data);
  }
  MissionList(): Observable<Mission[]> {
    return this.http.get<Mission[]>(`${this.apiUrl}/Mission/getMission`);
  }
  MissionDetailById(id: number): Observable<Mission[]> {
    return this.http.get<Mission[]>(
      `${this.apiUrl}/Mission/getMissionById/${id}`
    );
  }
  CountryList(): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.apiUrl}/Common/CountryList`);
  }
  CityList(): Observable<City[]> {
    return this.http.get<City[]>(`${this.apiUrl}/Common/CityList`);
  }
  AddMission(data: Mission) {
    return this.http.post(`${this.apiUrl}/Mission/addMission`, data);
  }
  UpdateMission(data: Mission) {
    return this.http.post(`${this.apiUrl}/Mission/updateMission`, data);
  }
  DeleteMission(data: any) {
    return this.http.delete(`${this.apiUrl}/Mission/deleteMission/${data}`);
  }


  //Mission Application
  MissionApplicationList(): Observable<MissionApplication[]> {
    return this.http.get<MissionApplication[]>(
      `${this.apiUrl}/MissionApplication/getMissionApplication`
    );
  }

  MissionApplicationDelete(id: any){
    return this.http.delete(`${this.apiUrl}/MissionApplication/deleteMissionApplication/${id}`,);
  }

  MissionApplicationApprove(data: MissionApplication){
    return this.http.post(`${this.apiUrl}/MissionApplication/updateMissionApplication`, data);
  }

  //Mission Theme
  MissionThemeList(): Observable<MissionTheme[]> {
    return this.http.get<MissionTheme[]>(
      `${this.apiUrl}/MissionTheme/getMissionTheme`
    );
  }
  MissionThemeById(id: any): Observable<MissionTheme[]> {
    return this.http.get<MissionTheme[]>(
      `${this.apiUrl}/MissionTheme/getMissionThemeById/${id}`
    );
  }
  AddMissionTheme(data: MissionTheme) {
    return this.http.post(`${this.apiUrl}/MissionTheme/addMissionTheme`, data);
  }
  UpdateMissionTheme(data: MissionTheme) {
    return this.http.post(
      `${this.apiUrl}/MissionTheme/updateMissionTheme`,
      data
    );
  }
  DeleteMissionTheme(id: any) {
    return this.http.delete(
      `${this.apiUrl}/MissionTheme/deleteMissionTheme/${id}`
    );
  }

  //Mission Skill
  MissionSkillList(): Observable<MissionSkill[]> {
    return this.http.get<MissionSkill[]>(
      `${this.apiUrl}/MissionSkill/getMissionSkill`
    );
  }
  MissionSkillById(id: any): Observable<MissionSkill[]> {
    return this.http.get<MissionSkill[]>(
      `${this.apiUrl}/MissionSkill/getMissionSkillById/${id}`
    );
  }
  AddMissionSkill(data: MissionSkill) {
    return this.http.post(`${this.apiUrl}/MissionSkill/addMissionSkill`, data);
  }
  UpdateMissionSkill(data: MissionSkill) {
    return this.http.post(
      `${this.apiUrl}/MissionSkill/updateMissionSkill`,
      data
    );
  }
  DeleteMissionSkill(data: any) {
    return this.http.delete(
      `${this.apiUrl}/MissionSkill/deleteMissionSkill/${data}`
    );
  }
}
