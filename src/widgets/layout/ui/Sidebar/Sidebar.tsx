import { List, Typography } from '@mui/material';
import Logo from '../../../../assets/A_Logo_v2.svg';
import { SIDEBAR_ITEMS } from '../../../../utils/constants';
import { CustomeListItem } from '../CustomeListItem/CustomeListItem';
import styles from './Sidebar.module.css';
import defaultAvatar from '../../../../shared/assets/image/6596121.png';
import type { SidebarProps } from './Sidebar.types';
import { useLocation, useNavigate } from 'react-router-dom';

export const Sidebar = ({ user, isAuthenticated }: SidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const hadleNavigate = (path: string) => {
    navigate(path);
  };


  return (
    <aside className={styles.sidebar}>
      <div className={styles.header}>
        <img src={Logo} alt="logo" className={styles.logo} />
      </div>

      <List className={styles.menu}>
        {SIDEBAR_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path ||
          location.pathname.startsWith(item.path + "/");

          return (
            <CustomeListItem
              key={item.path}
              label={item.label}
              icon={<Icon />}
              selected={isActive}
              disabled={!isAuthenticated}
              onClick={() => hadleNavigate(item.path)}
            />
          );
        })}
      </List>

      {user && (
        <div className={styles.footer}>
          <div className={styles.user}>
            <img src={user.avatar || defaultAvatar} alt="user" className={styles.avatar} />
            <Typography variant="body1">{user.name}</Typography>
          </div>
        </div>
      )}
    </aside>
  );
};
