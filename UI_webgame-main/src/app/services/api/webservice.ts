  // src/app/services/api/webservice.ts
  import { Injectable } from '@angular/core';
  import { HttpClient } from '@angular/common/http';
  import { Constants } from '../../config/constants';
  import { lastValueFrom } from 'rxjs';
  import { UserGetResponse } from '../../model/user_res';
  import { GameGetResponse } from '../../model/game_res';

  @Injectable({
    providedIn: 'root',
  })
  export class Webservice {
    public constants: Constants;

    constructor(private http: HttpClient) {
      this.constants = new Constants();
    }

    public getApiEndpoint(): string {
      return this.constants.API_ENDPOINT;
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

    public getImageUrl(filename: string): string {
      if (!filename) {
        return 'assets/images/default.jpg';
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
      const url = this.getApiEndpoint() + '/user';
      const response = await lastValueFrom(this.http.get(url));
      return response as UserGetResponse[];
    }

    // เก่า: purchaseGames (สำหรับ compatibility)
    public async purchaseGames(userId: number, cartIds: number[], totalPrice: number) {
      const url = this.getApiEndpoint() + '/user/purchase';
      const body = { userId, totalPrice };
      const response = await lastValueFrom(this.http.post(url, body));
      return response;
    }

    // --------------------------
    // ใหม่: purchases API
    // --------------------------

    // ตรวจสอบว่า user ซื้อเกมนี้แล้วหรือไม่
    public async checkPurchased(userId: number, gameId: number) {
      const url = this.getApiEndpoint() + '/purchases/check';
      const response = await lastValueFrom(this.http.post(url, { userId, gameId }));
      return response as { success: boolean; purchased: boolean };
    }

    // ดึงรายการเกมทั้งหมดที่ user ซื้อแล้ว (join ข้อมูลเกม)
    public async getUserPurchases(userId: number) {
      const url = this.getApiEndpoint() + '/purchases/' + userId;
      const response = await lastValueFrom(this.http.get(url));
      return response as { success: boolean; data: GameGetResponse[] };
    }

    // ซื้อหลายเกมพร้อมกัน (ส่งเป็น gameIds array)
    public async buyGamesBulk(userId: number, gameIds: number[], totalPrice: number) {
      const url = this.getApiEndpoint() + '/purchases/buy';
      const body = { userId, gameIds, totalPrice };
      const response = await lastValueFrom(this.http.post(url, body));
      return response;
    }
  }
