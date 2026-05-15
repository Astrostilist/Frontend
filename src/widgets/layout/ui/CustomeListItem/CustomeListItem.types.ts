export interface CustomeListItemProps {
    label: string;
    icon?: React.ReactNode;
    selected?: boolean; // активный пункт
    disabled?: boolean; //неактивный
    onClick?: () => void;
    className?: string;
}