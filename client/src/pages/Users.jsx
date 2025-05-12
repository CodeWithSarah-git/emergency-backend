import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../features/userSlice';

const Users = () => {
  const dispatch = useDispatch();
  const { data: users, status, error } = useSelector((state) => state.users);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUsers());
    }
  }, [dispatch, status]);

  if (status === 'loading') return <p>טוען משתמשים...</p>;
  if (status === 'failed') return <p>שגיאה: {error}</p>;

  return (
    <div>
      <h2>רשימת משתמשים</h2>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>שם פרטי</th>
            <th>שם משפחה</th>
            <th>אימייל</th>
            <th>טלפון</th>
            <th>כתובת</th>
            <th>תפקיד</th>
            <th>פעיל</th>
            <th>נוצר בתאריך</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.firstname}</td>
              <td>{user.lastname}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.address}</td>
              <td>{user.role}</td>
              <td>{user.active ? '✔️' : '❌'}</td>
              <td>{new Date(user.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
