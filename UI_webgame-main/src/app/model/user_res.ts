export interface UserGetResponse {
  id: number;
  username: string;
  email: string;
  role: string;
  image?: string; // optional (สามารถมีหรือไม่มีก็ได้)
}
