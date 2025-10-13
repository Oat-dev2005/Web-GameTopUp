export interface UserGetResponse {
  id: number;
  username: string;
  email: string;
  role: string;
  image?: File; // optional (สามารถมีหรือไม่มีก็ได้)
}
