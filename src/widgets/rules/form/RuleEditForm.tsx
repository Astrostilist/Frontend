import { useState } from 'react'
import {
  TextField,
  Slider,
  Switch,
  Typography,
  Box,
  Autocomplete,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button
} from '@mui/material'
import type { AutocompleteRenderInputParams } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import InfoIconTooltip from '../../../shared/ui/InfoIconTooltip/InfoIconTooltip'

// Определение интерфейса для пропсов
interface RuleEditFormProps {
  initialData?: {
    ruleName?: string
    astroConditions?: {
      moon?: string
      libra?: string
    }
    tags?: string[]
    priority?: number
  }
  onSave?: (data: any) => void
}

export const RuleEditForm: React.FC<RuleEditFormProps> = ({ initialData, onSave }) => {
  const [ruleName, setRuleName] = useState<string>(initialData?.ruleName || '')
  const [astroConditions, setAstroConditions] = useState<{
    moon: string
    libra: string
  }>({
    moon: initialData?.astroConditions?.moon || '',
    libra: initialData?.astroConditions?.libra || ''
  })
  const [tags, setTags] = useState<string[]>(initialData?.tags || [])
  const [tagInput, setTagInput] = useState<string>('')
  const [priority, setPriority] = useState<number>(initialData?.priority || 1)
  const [slot, setSlot] = useState<'base' | 'active'>('base')
  const [openTags, setOpenTags] = useState<boolean>(false)

  const handleAstroChange = (field: 'moon' | 'libra', value: string) => {
    setAstroConditions(prev => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    if (onSave) {
      onSave({
        ruleName,
        astroConditions,
        tags,
        priority,
        slot
      })
    }
  }

  const handleToggle = () => {
    setSlot(prev => (prev === 'active' ? 'base' : 'active'))
  }

  const availableTags: string[] = ['Тег1', 'Тег2', 'Тег3', 'Тег4', 'Тег5', 'Тег6']

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      const trimmed = tagInput.trim()
      if (trimmed && !tags.includes(trimmed)) {
        setTags(prev => [...prev, trimmed])
        setTagInput('')
      }
    }
  }

  const planets = [
    'Меркурий', 'Венера', 'Марс', 'Юпитер', 'Сатурн', 'Уран', 'Нептун', 'Плутон'
  ]

  const zodiacSigns = [
    'Овен', 'Телец', 'Близнецы', 'Рак', 'Лев', 'Дева', 'Весы', 'Скорпион',
    'Стрелец', 'Козерог', 'Водолей', 'Рыбы'
  ]

  const isActive = slot === 'active'

  return (
    <Box className="section" sx={{ padding: 2, maxWidth: 600, margin: '0 auto' }}>
      {/* Заголовок */}
      <Typography variant="h6" gutterBottom>
        Форма редактирования
      </Typography>

      {/* Название правила */}
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="subtitle2"
          gutterBottom
          sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
        >
          Название правила
        </Typography>
        <TextField
          fullWidth
          label="Название правила"
          placeholder="Введите название"
          value={ruleName}
          onChange={(e) => setRuleName(e.target.value)}
        />
      </Box>

      {/* Астрологические условия */}
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="subtitle2"
          gutterBottom
          sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
        >
          Астрологическое условие
          <InfoIconTooltip tooltipText="Выберите планету и знак зодиака" />
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          {/* Планета */}
          <FormControl sx={{ minWidth: 200 }} size="small">
            <InputLabel>Луна</InputLabel>
            <Select
              value={astroConditions.moon}
              label="Луна"
              onChange={(e) => handleAstroChange('moon', e.target.value as string)}
            >
              <MenuItem value="">
                <em>Выберите планету</em>
              </MenuItem>
              {planets.map((planet) => (
                <MenuItem key={planet} value={planet}>
                  {planet}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {/* Знак */}
          <FormControl sx={{ minWidth: 200 }} size="small">
            <InputLabel>Знак</InputLabel>
            <Select
              value={astroConditions.libra}
              label="Знак"
              onChange={(e) => handleAstroChange('libra', e.target.value as string)}
            >
              <MenuItem value="">
                <em>Выберите знак зодиака</em>
              </MenuItem>
              {zodiacSigns.map((sign) => (
                <MenuItem key={sign} value={sign}>
                  {sign}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>

      {/* Теги товаров */}
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="subtitle2"
          gutterBottom
          sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
        >
          Теги товаров
          <InfoIconTooltip tooltipText="Добавляйте теги для классификации товаров" />
        </Typography>
        <Autocomplete
          multiple
          freeSolo
          options={availableTags}
          value={tags}
          onChange={(_event, newValue) => {
            if (newValue) {
              const filtered = newValue.filter((val): val is string => typeof val === 'string')
              setTags(filtered)
            }
          }}
          inputValue={tagInput}
          onInputChange={(_event, newInputValue) => {
            setTagInput(newInputValue)
          }}
          open={openTags}
          onOpen={() => setOpenTags(true)}
          onClose={() => setOpenTags(false)}
          renderInput={(params: AutocompleteRenderInputParams) => (
            <TextField
              {...params}
              label="Добавить тег..."
              placeholder="Добавить тег..."
              onKeyDown={handleKeyDown}
              // Используем slotProps для endAdornment
              slotProps={{
                input: {
                  ...params.slotProps?.input,
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setOpenTags(prev => !prev)} size="small">
                        <ExpandMoreIcon
                          style={{
                            transform: openTags ? 'rotate(180deg)' : 'rotate(0deg)',
                            transition: 'transform 0.2s'
                          }}
                        />
                      </IconButton>
                    </InputAdornment>
                  )
                }
              }}
            />
          )}
        />
      </Box>

      {/* Приоритет */}
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="subtitle2"
          gutterBottom
          sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
        >
          Приоритет
          <InfoIconTooltip tooltipText="Настройте приоритет правила" />
        </Typography>
        <Slider
          value={priority}
          onChange={(_e, newValue) => {
            if (typeof newValue === 'number') setPriority(newValue)
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

      {/* Статус */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          mb: 3
        }}
      >
        <Typography
          variant="body2"
          sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
        >
          Статус правила
          <InfoIconTooltip tooltipText="Активировать или деактивировать правило" />
        </Typography>
        <Switch checked={isActive} onChange={handleToggle} />
      </Box>

      {/* Кнопка сохранить */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
        >
          Сохранить правило
        </Button>
      </Box>
    </Box>
  )
}