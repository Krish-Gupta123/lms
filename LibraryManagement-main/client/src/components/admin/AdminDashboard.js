// src/components/admin/AdminDashboard.js
import { useState } from 'react';
import useSocketEvents from '../../hooks/useSocketEvents';

export default function AdminDashboard() {
  const [onlineUsers, setOnlineUsers] = useState(0);
  const [activity, setActivity] = useState([]);

  useSocketEvents({
    onAdminStats: ({ onlineUsers: count, activity: act }) => {
      if (count !== undefined) setOnlineUsers(count);
      if (act) setActivity((prev) => [act, ...prev].slice(0, 10));
    },
  });

  return (
    <div style={{ padding: 24 }}>
      <h2>Admin Dashboard (Live)</h2>
      <div>Online Students: {onlineUsers}</div>
      <div style={{ marginTop: 16 }}>
        <h4>Latest Activity</h4>
        <ul>
          {activity.map((a, i) => (
            <li key={i}>{JSON.stringify(a)}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
