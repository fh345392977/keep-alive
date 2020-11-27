import { useRequest } from 'ahooks';
import { useState } from 'react';
import { request } from 'umi';

export default () => {
  const [users, setUsers] = useState([]);
  const fetchUsers = useRequest(() => request('/api/users'), {
    onSuccess: (data) => {
      setUsers(data);
    },
  });
  return { users, fetchUsers };
};
