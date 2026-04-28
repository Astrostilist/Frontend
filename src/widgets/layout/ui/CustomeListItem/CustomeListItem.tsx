import {
  ListItemButton,
  ListItemIcon,
  styled,
} from "@mui/material";
import type { CustomeListItemProps } from "./CustomeListItem.types";

const StyledListItemButton = styled(ListItemButton)(() => ({
  position: 'relative',
  width: 260,
  height: 48,
  padding: '0',
  boxSizing: 'border-box',
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  borderRadius: 8,
  border: '1px solid transparent',
  transition: 'all 0.2s ease',

  // // Линия внизу
  // '&::after': {
  //   content: '""',
  //   position: 'absolute',
  //   bottom: 0,
  //   left: 0,
  //   right: 0,
  //   height: 1,
  //   backgroundColor: 'rgba(0, 0, 0, 0.12)',
  // },

  '&:hover': {
    backgroundColor: '#f5f5f5',
    borderColor: '#ccc',
  },

  // Selected
  '&.Mui-selected': {
    backgroundColor: 'rgba(25, 118, 210, 0.08)',
    color: 'rgba(25, 118, 210, 1)',
    borderColor: 'rgba(25, 118, 210, 1)',

    '& .iconWrapper svg': {
      fill: 'rgba(25, 118, 210, 1)',
    },
  },

  // Focus
  '&.Mui-focusVisible': {
    outline: '2px solid #1976d2',
    outlineOffset: '-2px',
  },

  // Disabled
  '&.Mui-disabled': {
    opacity: 0.5,
    pointerEvents: 'none',
  },
}));

// Стили для иконки
const StyledListItemIcon = styled(ListItemIcon)({
  minWidth: 24,
  marginRight: 0,
  padding: 0,

  '& svg': {
    width: 24,
    height: 24,
    fill: 'rgba(0, 0, 0, 0.54)',
    transition: 'fill 0.2s ease',
  },
});

export const CustomeListItem = ({
  label,
  icon,
  selected,
  disabled,
  onClick,
}: CustomeListItemProps) => {
  return (
    <StyledListItemButton
      onClick={onClick}
      selected={selected}
      disabled={disabled}
    >
      {icon && (
        <StyledListItemIcon className="iconWrapper">
          {icon}
        </StyledListItemIcon>
      )}
      <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
        {label}
      </span>
    </StyledListItemButton>
  );
};