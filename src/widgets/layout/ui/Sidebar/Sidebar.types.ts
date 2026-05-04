export interface SidebarUser {
  name: string;
  avatar?: string;
}

export interface SidebarItem {
  label: string;
  icon: React.ElementType;
  selected?: boolean;
  onClick?: () => void;
}

export interface SidebarProps {
  user: SidebarUser;
}