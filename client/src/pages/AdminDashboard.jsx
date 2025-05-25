import React from 'react';
import UserList from '../features/user/UserList' // או הנתיב המדויק שלך

const AdminDashboard = () => {
  return (
    <div>
      <h1>לוח בקרה מנהל</h1>
      <UserList />
      {/* כאן אפשר להוסיף עוד רכיבים לפי הצורך */}
    </div>
  );
};

export default AdminDashboard;