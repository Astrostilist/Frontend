import React from 'react'
import { Box, Typography, Slider } from '@mui/material'
import InfoIconTooltip from '../../../shared/ui/InfoIconTooltip/InfoIconTooltip'

interface PriorityBlockProps {
  value: number
  onChange: (value: number) => void
}

export const PriorityBlock: React.FC<PriorityBlockProps> = ({ value, onChange }) => (
  <Box>
    <Typography
      variant="subtitle2"
      gutterBottom
    >
      Приоритет
      <InfoIconTooltip tooltipText="Установите вес правила от 1 до 100, где 1 – высший приоритет.
Если у пользователя одновременно совпадет несколько астрологических условий, система отдаст предпочтение правилам с наиболее высоким приоритетом" 
        tooltipWidth={200}
        tooltipHeight={106} 
/>
    </Typography>
    <Slider
      value={value}
      onChange={(_e, newValue) => {
        if (typeof newValue === 'number') onChange(newValue)
      }}
      min={1}
      max={100}
      valueLabelDisplay="auto"
      marks={[
        { value: 1, label: '1' },
        { value: 100, label: '100' }
      ]}
    />
  </Box>
)