import React, { useState } from 'react'
import { Box, Typography, Autocomplete, TextField, Chip } from '@mui/material'
import InfoIconTooltip from '../../../shared/ui/InfoIconTooltip/InfoIconTooltip'

interface TagsBlockProps {
  tags: string[]
  onChange: (tags: string[]) => void
  availableTags?: string[]
}

export const TagsBlock: React.FC<TagsBlockProps> = ({
  tags,
  onChange,
  availableTags = []
}) => {
  const [inputValue, setInputValue] = useState('')

  const handleChange = (_event: React.SyntheticEvent, newValue: (string | string[])[]) => {
    onChange(newValue as string[])
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault()
      e.stopPropagation()
      const newTag = inputValue.trim()
      if (!tags.includes(newTag)) {
        onChange([...tags, newTag])
      }
      setInputValue('')
    }
  }

  return (
    <Box>
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
        onChange={handleChange}
        inputValue={inputValue}
        onInputChange={(_event, newInputValue) => {
          setInputValue(newInputValue)
        }}
        onKeyDown={handleKeyDown}
        disableClearable
        renderTags={(value: string[], getTagProps: (arg0: { index: number }) => { [x: string]: any; key: any }) =>
          (value as string[]).map((option, index) => {
            const { key, ...tagProps } = getTagProps({ index })
            return (
              <Chip
                key={key}
                label={option}
                size="small"
                {...tagProps}
              />
            )
          })
        }
        renderInput={(params) => (
          <TextField
            {...params}
            label="Добавить тег..."
            placeholder="Добавить тег..."
          />
        )}
        {...({} as any)}
      />
    </Box>
  )
}
