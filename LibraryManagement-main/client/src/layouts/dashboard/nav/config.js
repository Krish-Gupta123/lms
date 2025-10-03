import {FiBookOpen, FiCheckCircle, FiHome, FiList, FiLock, FiUsers} from "react-icons/fi";

// Only show Borrow Requests for admin users
import { useAuth } from '../../../hooks/useAuth';

const navConfig = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: <FiHome/>,
  },
  {
    title: 'Books',
    path: '/books',
    icon: <FiBookOpen/>,
  },
  {
    title: 'Authors',
    path: '/authors',
    icon: <FiUsers/>,
  },
  {
    title: 'Genres',
    path: '/genres',
    icon: <FiList/>,
  },
  {
    title: 'Borrowals',
    path: '/borrowals',
    icon: <FiCheckCircle/>,
  },
  {
    title: 'Users',
    path: '/users',
    icon: <FiLock/>,
  },
  {
    title: 'Borrow Requests',
    path: '/borrow-requests',
    icon: <FiCheckCircle/>,
    adminOnly: true
  },
];

// Export a function so we can filter based on user role
export default function getNavConfig(user) {
  if (!user || !user.isAdmin) {
    // Remove Dashboard, Users, and Borrow Requests for normal users
    return navConfig.filter(item => item.title !== 'Dashboard' && item.title !== 'Users' && item.title !== 'Borrow Requests');
  }
  return navConfig;
}
