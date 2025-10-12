import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../../config/constants';
import { lastValueFrom } from 'rxjs';

import { UserGetResponse } from '../../model/user_res';
import { GameGetResponse } from '../../model/game_res';

@Injectable({
  providedIn: 'root',
})
export class Webservice {
  constructor(private constants: Constants, private http: HttpClient) {}

  // public async register(data: RegisterRequest, selectedFile: File | null) {
  //   const url = this.constants.API_ENDPOINT + '/register';
  //   const formData = new FormData();

  //   formData.append('username', data.username);
  //   formData.append('email', data.email);
  //   formData.append('password', data.password);

  //   if (data.image) {
  //     formData.append('image', data.image);
  //   }

  //   const response = await lastValueFrom(this.http.post(url, formData));
  //   return response;
  // }

  // public async register(data: any, selectedFile: File | null) {
  //   const url = this.constants.API_ENDPOINT + '/user/register';
  //   const response = await lastValueFrom(this.http.post(url, data));
  //   return response;
  // }
  public async register(formData: FormData) {
    const url = this.constants.API_ENDPOINT + '/user/register';
    const response = await lastValueFrom(this.http.post(url, formData));
    return response;
  }

  public async login(data: any) {
    const url = this.constants.API_ENDPOINT + '/user/login';
    const response = await lastValueFrom(this.http.post(url, data));
    return response;
  }

  public async getOneProfile(id: number) {
    const url = this.constants.API_ENDPOINT + '/user/profile/' + id;
    const response = await lastValueFrom(this.http.get(url));
    console.log('API Profile Response:', response);
    // return response as UserGetResponse;
    return (response as any).data as UserGetResponse;
  }

  public async updateProfile(id: number, data: any) {
    const url = this.constants.API_ENDPOINT + '/user/profile/' + id;
    const response = await lastValueFrom(this.http.put(url, data));
    return response;
  }

  public async addNewGame(formData: FormData) {
    const url = this.constants.API_ENDPOINT + '/game/addgame';
    const response = await lastValueFrom(this.http.post(url, formData));
    return response;
  }

  public async getGames() {
    const url = this.constants.API_ENDPOINT + '/game';
    const response = await lastValueFrom(this.http.get(url));
    return response as GameGetResponse[];
  }

  public async getOneGame(id: number) {
    const url = this.constants.API_ENDPOINT + '/game/sellpage/' + id;
    const response = await lastValueFrom(this.http.get(url));
    // console.log('API Profile Response:', response);
    // return response as UserGetResponse;
    return (response as any).data as GameGetResponse;
  }

  public getImageUrl(filename: string): string {
    if (!filename) {
      return 'assets/images/default.jpg'; // ถ้าไม่มีรูป ใช้ default
    }
    return `${this.constants.API_ENDPOINT}/uploads/${filename}`;
  }
}
