import { useState } from 'react'
import {
  TextField,
  Slider,
  Switch,
  Typography,
  Box,
  Chip,
  Autocomplete,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button
} from '@mui/material'
import './styles.css'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import InfoIconTooltip from '../../../shared/ui/InfoIconTooltip/InfoIconTooltip'
import '../../../shared/ui/InfoIconTooltip/InfoIconTooltip.css'

export const RuleEditForm = ({ initialData, onSave }) => {
  const [ruleName, setRuleName] = useState(initialData?.ruleName || '')
  const [ruleNameFocused, setRuleNameFocused] = useState(false)

  const [astroConditions, setAstroConditions] = useState({
    moon: initialData?.astroConditions?.moon || '',
    libra: initialData?.astroConditions?.libra || ''
  })

  const [tags, setTags] = useState(initialData?.tags || [])
  const [tagInput, setTagInput] = useState('')
  const [priority, setPriority] = useState(initialData?.priority || 1)
  const [slot, setSlot] = useState('base')
  const [openTags, setOpenTags] = useState(false)

  const handleAstroChange = (field, value) => {
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

  const availableTags = ['Тег1', 'Тег2', 'Тег3', 'Тег4', 'Тег5', 'Тег6']

  const handleDeleteTag = (tagToDelete) => {
    setTags(prev => prev.filter(t => t !== tagToDelete))
  }

  const handleKeyDown = (e) => {
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
    'Меркурий',
    'Венера',
    'Марс',
    'Юпитер',
    'Сатурн',
    'Уран',
    'Нептун',
    'Плутон'
  ]

  const zodiacSigns = [
    'Овен',
    'Телец',
    'Близнецы',
    'Рак',
    'Лев',
    'Дева',
    'Весы',
    'Скорпион',
    'Стрелец',
    'Козерог',
    'Водолей',
    'Рыбы'
  ]

  const isActive = slot === 'active'

  return (
    <Box className="section" sx={{ padding: 2, maxWidth: 600, margin: '0 auto' }}>

      <Typography variant="h6" gutterBottom>
        Форма редактирования
      </Typography>

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
          placeholder="Введите название"
          value={ruleName}
          onChange={(e) => setRuleName(e.target.value)}
          onFocus={() => setRuleNameFocused(true)}
          onBlur={() => setRuleNameFocused(false)}
          label={ruleNameFocused ? 'Название правила' : ''}
        />
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography
          variant="subtitle2"
          gutterBottom
          sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
        >
          Астрологическое условие
          <InfoIconTooltip
            tooltipText="Укажите астрологический фактор, при наступлении которого правило начнет влиять на подбор"
            tooltipWidth={200}
            tooltipHeight={50}
          />
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>

          <FormControl sx={{ minWidth: 200 }} size="small">
            <InputLabel>Луна</InputLabel>
            <Select
              value={astroConditions.moon}
              label="Луна"
              onChange={(e) => handleAstroChange('moon', e.target.value)}
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

          <FormControl sx={{ minWidth: 200 }} size="small">
            <InputLabel>Знак</InputLabel>
            <Select
              value={astroConditions.libra}
              label="Знак"
              onChange={(e) => handleAstroChange('libra', e.target.value)}
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

      <Box sx={{ mb: 3 }}>
        <Typography
          variant="subtitle2"
          gutterBottom
          sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
        >
          Теги товаров
          <InfoIconTooltip
            tooltipText="Выберите характеристики и стили одежды, которые система будет рекомендовать пользователю при срабатывании этого условия"
            tooltipWidth={200}
            tooltipHeight={64}
          />
        </Typography>
        <Autocomplete
          multiple
          freeSolo
          options={availableTags}
          value={tags}
          onChange={(event, newValue) => {
            setTags(newValue)
          }}
          inputValue={tagInput}
          onInputChange={(event, newInputValue) => {
            setTagInput(newInputValue)
          }}
          open={openTags}
          onOpen={() => setOpenTags(true)}
          onClose={() => setOpenTags(false)}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                key={option}
                label={option}
                {...getTagProps({ index })}
                onDelete={() => handleDeleteTag(option)}
              />
            ))
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label="Добавить тег..."
              placeholder="Добавить тег..."
              onKeyDown={handleKeyDown}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setOpenTags(prev => !prev)}
                      size="small"
                    >
                      <ExpandMoreIcon
                        style={{
                          transform: openTags ? 'rotate(180deg)' : 'rotate(0deg)',
                          transition: 'transform 0.2s'
                        }}
                      />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          )}
        />
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography
          variant="subtitle2"
          gutterBottom
          sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
        >
          Приоритет
          <InfoIconTooltip
            tooltipText="Установите вес правила от 1 до 100, 
            где 1 – высший приоритет. Если у пользователя одновременно совпадет несколько астрологических условий, система отдаст предпочтение правилам с наиболее высоким приоритетом"
            tooltipWidth={200}
            tooltipHeight={106}
          />
        </Typography>
        <Slider
          value={priority}
          onChange={(e, newValue) => setPriority(newValue)}
          min={1}
          max={100}
          valueLabelDisplay="auto"
          marks={[
            { value: 1, label: '1' },
            { value: 100, label: '100' }
          ]}
        />
      </Box>

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
          <InfoIconTooltip
            tooltipText="Переключатель для активации или временного отключения правила"
            tooltipWidth={200}
            tooltipHeight={36}
          />
        </Typography>
        <Switch checked={isActive} onChange={handleToggle} />
      </Box>

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
