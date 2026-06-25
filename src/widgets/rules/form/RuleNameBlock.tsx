import React from 'react'
import { Box, Typography, TextField } from '@mui/material'

interface RuleNameBlockProps {
  value: string
  onChange: (value: string) => void
}

export const RuleNameBlock: React.FC<RuleNameBlockProps> = ({ value, onChange }) => (
  <Box>
    <Typography variant="subtitle2" gutterBottom>Название правила</Typography>
    <TextField
      fullWidth
      label="Название правила"
      placeholder="Введите название"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </Box>
)