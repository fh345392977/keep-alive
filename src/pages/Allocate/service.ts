import { request } from 'umi';

export interface AssignToProps {
  pre_generator: 1 | 0;
  assign_to: number;
}

export async function assignTo(data: AssignToProps) {
  return request('/api/rule', {
    method: 'post',
    data,
  });
}
