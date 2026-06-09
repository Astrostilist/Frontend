import React from 'react'
import { Box, Typography, Switch } from '@mui/material'
import InfoIconTooltip from '../../../shared/ui/InfoIconTooltip/InfoIconTooltip'

interface StatusBlockProps {
  isActive: boolean
  onToggle: () => void
}

export const StatusBlock: React.FC<StatusBlockProps> = ({ isActive, onToggle }) => (
  <Box className="section-status">
    <Typography
      variant="body2"
    >
      Статус правила
      <InfoIconTooltip tooltipText="Переключатель для активации или временного отключения правила" 
        tooltipWidth={200}
        tooltipHeight={36} 
/>
    </Typography>
    <Switch checked={isActive} onChange={onToggle} />
  </Box>
)