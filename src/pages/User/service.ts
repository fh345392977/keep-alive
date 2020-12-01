import User from '@/model/User';
import { request } from 'umi';

export async function getUserList() {
  return request('/api/user').then((res) => res.data.map((i: any) => new User(i)));
}
