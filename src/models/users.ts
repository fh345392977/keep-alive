import User from '@/model/User';
import { useRequest } from 'ahooks';
import { useState } from 'react';
import { request } from 'umi';

export default () => {
  const [users, setUsers] = useState<User[]>([]);
  const fetchUsers = useRequest(() => request('/api/users'), {
    onSuccess: (data) => {
      setUsers(data);
    },
  });
  return { users, fetchUsers };
};
