import { List, Typography } from '@mui/material';
import Logo from '../../../../assets/A_Logo_v2.svg';
import { SIDEBAR_ITEMS } from '../../../../utils/constants';
import { CustomeListItem } from '../CustomeListItem/CustomeListItem';
import styles from './Sidebar.module.css';
import defaultAvatar from '../../../../shared/assets/image/6596121.png';
import type { SidebarProps } from './Sidebar.types';

export const Sidebar = ({ user }: SidebarProps) => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.header}>
        <img src={Logo} alt="logo" className={styles.logo} />
      </div>

      <List className={styles.menu}>
        {SIDEBAR_ITEMS.map((item, index) => {
          const Icon = item.icon;
          return (
            <CustomeListItem
              key={index}
              label={item.label}
              icon={<Icon />}
              selected={item.selected}
              onClick={item.onClick}
            />
          );
        })}
      </List>

      <div className={styles.footer}>
        <div className={styles.user}>
          <img src={user.avatar || defaultAvatar} alt="user" className={styles.avatar} />
          <Typography variant="body1">{user.name}</Typography>
        </div>
      </div>
    </aside>
  );
};
