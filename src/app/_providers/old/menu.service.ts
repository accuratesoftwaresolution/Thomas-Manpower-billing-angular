import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { apiUrl } from '../../_resources/api-url.properties';
import { IgenMenuDto } from 'src/app/_dto/igen-menu.dto';

/*
    Created By  : Arun Joy
    Created On  : 01-01-2020
    Created For : For handling the menu with its user rights.
*/

@Injectable({
  providedIn: 'root'
})
export class OldMenuService {

  menus: { menuId: string, description: string, rightsGiven: string, taskFlow: string }[] = [];

  selectedMenu: { menuId: string, description: string, rightsGiven: string, taskFlow: string };

  constructor(
    private http: HttpClient
  ) { }

  async getMenu(): Promise<IgenMenuDto> {
    return await this.http.get<IgenMenuDto>(`${environment.apiUrl}/${apiUrl.menu}`).toPromise();
  }

  async getMenuWithFilter(filter: any): Promise<IgenMenuDto[]> {
    return await this.http.get<IgenMenuDto[]>(`${environment.apiUrl}/${apiUrl.igenmenu}?${filter}`).toPromise();
  }

  async getMenuWithRights(userId: string, menuId: string): Promise<IgenMenuDto> {
    return await this.http.get<IgenMenuDto>(`${environment.apiUrl}/${apiUrl.menu}/menu-with-rights?where[menuId]=${menuId}&where[userId]=${userId}`).toPromise();
  }

  async setAllMenuRights(body: IgenMenuDto): Promise<IgenMenuDto> {
    return this.http.post<IgenMenuDto>(`${environment.apiUrl}/${apiUrl.menu}/set-all-menu-rights`, body).toPromise();
  }

  async setMenuRights(body: IgenMenuDto): Promise<IgenMenuDto> {
    return this.http.post<IgenMenuDto>(`${environment.apiUrl}/${apiUrl.menu}/menu-rights`, body).toPromise();
  }

}
