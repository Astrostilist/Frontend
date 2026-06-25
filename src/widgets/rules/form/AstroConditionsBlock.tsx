import React from 'react'
import { Box, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import InfoIconTooltip from '../../../shared/ui/InfoIconTooltip/InfoIconTooltip'

interface AstroConditionsBlockProps {
  astroConditions: {
    moon: string
    libra: string
  }
  onChange: (field: 'moon' | 'libra', value: string) => void
}

const planets = [
  'Меркурий', 'Венера', 'Марс', 'Юпитер', 'Сатурн', 'Уран', 'Нептун', 'Плутон'
]

const zodiacSigns = [
  'Овен', 'Телец', 'Близнецы', 'Рак', 'Лев', 'Дева', 'Весы', 'Скорпион',
  'Стрелец', 'Козерог', 'Водолей', 'Рыбы'
]

export const AstroConditionsBlock: React.FC<AstroConditionsBlockProps> = ({ astroConditions, onChange }) => (
  <Box>
    <Typography
      variant="subtitle2"
      gutterBottom
    >
      Астрологическое условие
      <InfoIconTooltip 
      tooltipText="Укажите астрологический фактор, при наступлении которого правило начнет влиять на подбор"
        tooltipWidth={200}
        tooltipHeight={50} 
        />
    </Typography>
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
      {/* Планета */}
      <FormControl sx={{ minWidth: 200 }} size="small">
        <InputLabel>Луна</InputLabel>
        <Select
          value={astroConditions.moon}
          label="Луна"
          onChange={(e) => onChange('moon', e.target.value as string)}
        >
          <MenuItem value="">
            <em>Выберите планету</em>
          </MenuItem>
          {planets.map((planet) => (
            <MenuItem key={planet} value={planet}>{planet}</MenuItem>
          ))}
        </Select>
      </FormControl>
      {/* Знак */}
      <FormControl sx={{ minWidth: 200 }} size="small">
        <InputLabel>Знак</InputLabel>
        <Select
          value={astroConditions.libra}
          label="Знак"
          onChange={(e) => onChange('libra', e.target.value as string)}
        >
          <MenuItem value="">
            <em>Выберите знак зодиака</em>
          </MenuItem>
          {zodiacSigns.map((sign) => (
            <MenuItem key={sign} value={sign}>{sign}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  </Box>
)