import React, { useState } from 'react'
import { Box, Typography } from '@mui/material'

import { RuleNameBlock } from './RuleNameBlock'
import { AstroConditionsBlock } from './AstroConditionsBlock'
import { TagsBlock } from './TagsBlock'
import { PriorityBlock } from './PriorityBlock'
import { StatusBlock } from './StatusBlock'
import { ActionsBlock } from './ActionsBlock'

import './styles.css'

interface RuleEditFormProps {
  initialData?: {
    ruleName?: string
    astroConditions?: { moon?: string; libra?: string }
    tags?: string[]
    priority?: number
    slot?: string 
  }
  onSave?: (data: any) => void
}

export const RuleEditForm: React.FC<RuleEditFormProps> = ({ initialData, onSave }) => {
  const [ruleName, setRuleName] = useState<string>(initialData?.ruleName || '')
  const [astroConditions, setAstroConditions] = useState<{ moon: string; libra: string }>({
    moon: initialData?.astroConditions?.moon || '',
    libra: initialData?.astroConditions?.libra || ''
  })
  const [tags, setTags] = useState<string[]>(initialData?.tags || [])
  const [priority, setPriority] = useState<number>(initialData?.priority || 1)
  const [slot, setSlot] = useState<'base' | 'active'>('base')

  const handleAstroChange = (field: 'moon' | 'libra', value: string) => {
    setAstroConditions(prev => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    if (onSave) {
      onSave({ ruleName, astroConditions, tags, priority, slot })
    }
  }

  const handleToggle = () => {
    setSlot(prev => (prev === 'active' ? 'base' : 'active'))
  }

  const availableTags: string[] = ['Тег1', 'Тег2', 'Тег3', 'Тег4', 'Тег5', 'Тег6']

  const isActive = slot === 'active'

  return (
    <Box className="section rule-form">
      <Typography variant="h6" gutterBottom>Редактирование правила</Typography>

      <RuleNameBlock value={ruleName} onChange={setRuleName} />

      <AstroConditionsBlock
        astroConditions={astroConditions}
        onChange={handleAstroChange}
      />

      <TagsBlock
        tags={tags}
        onChange={setTags}
        availableTags={availableTags}
      />

      <PriorityBlock value={priority} onChange={setPriority} />

      <StatusBlock isActive={isActive} onToggle={handleToggle} />

      <ActionsBlock onSave={handleSave} />
    </Box>
  )
}
