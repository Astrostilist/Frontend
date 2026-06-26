import HomeIcon from '@mui/icons-material/Home';
import ViewListIcon from '@mui/icons-material/ViewList';
import EditIcon from '@mui/icons-material/Edit';
import type { SidebarItem } from '../widgets/layout/ui/Sidebar/Sidebar.types';

export const SIDEBAR_ITEMS: SidebarItem[] = [
  { label: 'Главная', icon: HomeIcon },
  { label: 'Каталог', icon: ViewListIcon },
  { label: 'Редактор', icon: EditIcon, selected: true },
];
