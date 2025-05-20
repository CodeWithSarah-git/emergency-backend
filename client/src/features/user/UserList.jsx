import React from "react";
import { useGetUsersQuery, useDeleteUserMutation } from "../../features/user/userApi";

const UserList = () => {
  const { data: users, isLoading, isError, error } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();

  if (isLoading) return <p>טוען נתונים...</p>;
  if (isError) return <p>שגיאה: {error?.data || error?.message}</p>;

  const handleDelete = (id) => {
    if (window.confirm("האם את/ה בטוח/ה שברצונך למחוק את המשתמש?")) {
      deleteUser(id);
    }
  };

  return (
    <div>
      <h2>רשימת משתמשים</h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>שם פרטי</th>
            <th>שם משפחה</th>
            <th>אימייל</th>
            <th>טלפון</th>
            <th>תפקיד</th>
            <th>פעולות</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.firstname}</td>
              <td>{user.lastname}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.role}</td>
              <td>
                {/* כאן אפשר להוסיף גם כפתור עריכה */}
                <button onClick={() => handleDelete(user._id)}>🗑️ מחק</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
