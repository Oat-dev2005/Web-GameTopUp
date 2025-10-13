export interface UserGetResponse {
  topup_history: never[];
  balance: any;  // หากเลือกใช้ any
  id: number;
  username: string;
  email: string;
  role: string;
  image?: string; // optional
}
