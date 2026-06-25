import React from 'react'
import { Box, Button } from '@mui/material'

interface ActionsBlockProps {
  onSave: () => void
}

export const ActionsBlock: React.FC<ActionsBlockProps> = ({ onSave }) => (
  <Box>
    <Button variant="contained" color="primary" onClick={onSave}>
      Сохранить правило
    </Button>
  </Box>
)