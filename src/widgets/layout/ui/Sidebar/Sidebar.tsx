import { List, Typography } from "@mui/material";
import { CustomeListItem } from "../CustomeListItem/CustomeListItem";
import styles from "./Sidebar.module.css";
import defaultAvatar from "../../../../shared/assets/image/6596121.png";
import type { SidebarProps } from "./Sidebar.types";

export const Sidebar = ({companyName, user, items }: SidebarProps) => {
    return (
        <aside className={styles.sidebar}>
            <div className={styles.header}>
                <Typography variant="h5">{companyName}</Typography>
            </div>

            <List className={styles.menu}>
                {items.map((item, index) => (
          <CustomeListItem
            key={index}
            label={item.label}
            icon={item.icon}
            selected={item.selected}
            onClick={item.onClick}
          />
        ))}
            </List>

            <div className={styles.footer}>
                <div className={styles.user}>
                    <img
            src={user.avatar || defaultAvatar}
            alt="user"
            className={styles.avatar}
          />
          <Typography variant="body1">{user.name}</Typography>
                </div>
            </div>
        </aside>
    )
}