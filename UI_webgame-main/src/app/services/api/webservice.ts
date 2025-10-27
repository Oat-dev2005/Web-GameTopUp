import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../../config/constants'; // ที่เก็บค่าคงที่ของ API
import { lastValueFrom } from 'rxjs';
import { UserGetResponse } from '../../model/user_res';
import { GameGetResponse } from '../../model/game_res';

@Injectable({
  providedIn: 'root',
})
export class Webservice {
  // เปลี่ยนจาก private เป็น public
  public constants: Constants;

  constructor(private http: HttpClient) {
    this.constants = new Constants(); // ตัวอย่างการตั้งค่า constants
  }

  // ฟังก์ชันที่ให้ค่าของ API_ENDPOINT
  public getApiEndpoint(): string {
    return this.constants.API_ENDPOINT; // คืนค่า API_ENDPOINT
  }

  public async register(formData: FormData) {
    const url = this.getApiEndpoint() + '/user/register';
    const response = await lastValueFrom(this.http.post(url, formData));
    return response;
  }

  public async login(data: any) {
    const url = this.getApiEndpoint() + '/user/login';
    const response = await lastValueFrom(this.http.post(url, data));
    return response;
  }

  public async getOneProfile(id: number): Promise<{ data: UserGetResponse }> {
    const url = `${this.getApiEndpoint()}/user/profile/${id}`;
    const response = await lastValueFrom(this.http.get(url));
    return response as { data: UserGetResponse };
  }

  public async updateProfile(id: number, data: any) {
    const url = this.getApiEndpoint() + '/user/profile/' + id;
    const response = await lastValueFrom(this.http.put(url, data));
    return response;
  }

  public async addNewGame(formData: FormData) {
    const url = this.getApiEndpoint() + '/game/addgame';
    const response = await lastValueFrom(this.http.post(url, formData));
    return response;
  }

  public async getGames() {
    const url = this.getApiEndpoint() + '/game';
    const response = await lastValueFrom(this.http.get(url));
    return response as GameGetResponse[];
  }

  public async getOneGame(id: number) {
    const url = this.getApiEndpoint() + '/game/' + id;
    const response = await lastValueFrom(this.http.get(url));
    return response as GameGetResponse;
  }

  // ใช้ getApiEndpoint() เพื่อดึง URL ของภาพ
  public getImageUrl(filename: string): string {
    if (!filename) {
      return 'assets/images/default.jpg'; // ถ้าไม่มีรูป ใช้ default
    }
    return `${this.getApiEndpoint()}/uploads/${filename}`;
  }

  public async deleteGame(id: number) {
    const url = this.getApiEndpoint() + '/game/' + id;
    const response = await lastValueFrom(this.http.delete(url));
    return response;
  }

  public async editGame(id: number, formData: FormData) {
    const url = this.getApiEndpoint() + '/game/' + id;
    const response = await lastValueFrom(this.http.put(url, formData));
    return response;
  }

  public async topUp(userId: number, amount: number) {
    const url = this.getApiEndpoint() + '/user/topup';
    const body = { userId, amount };
    const response = await lastValueFrom(this.http.post(url, body));
    return response;
  }

  public async getAllUsers(): Promise<UserGetResponse[]> {
    const url = this.getApiEndpoint() + '/user'; // Endpoint ที่ดึงข้อมูลผู้ใช้ทั้งหมด
    const response = await lastValueFrom(this.http.get(url));
    return response as UserGetResponse[];
  }

  public async purchaseGames(userId: number, totalPrice: number) {
    const url = this.getApiEndpoint() + '/user/purchase';
    const body = { userId, totalPrice };
    const response = await lastValueFrom(this.http.post(url, body));
    return response;
  }

  public async getUserLibrary(userId: number) {
    const url = this.getApiEndpoint() + '/user/library/' + userId;
    const response = await lastValueFrom(this.http.get(url));
    return response;
  }
}
