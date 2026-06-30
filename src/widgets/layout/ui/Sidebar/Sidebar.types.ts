export interface SidebarUser {
  name: string;
  avatar?: string;
}

export interface SidebarItem {
  label: string;
  icon: React.ElementType;
  path: string;
  selected?: boolean;
  onClick?: () => void;
}

export interface SidebarProps {
  user?: SidebarUser | null;
  isAuthenticated: boolean;
}