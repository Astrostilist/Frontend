import { RuleEditForm } from './RuleEditForm'

const defaultData = {
  ruleName: 'Тестовое правило',
  astroConditions: {
    moon: 'Марс',
    libra: 'Овен'
  },
  tags: ['Тег1', 'Тег2'],
  priority: 50,
  slot: 'active'
}

export default {
  title: 'Формы/RuleEditForm',
  component: RuleEditForm,
  argTypes: {
    onSave: { action: 'сохранили правило' }
  }
}

// ✅ Базовая история — через args
export const Default = {
  args: {
    initialData: defaultData
  }
}

// ✅ Без тегов
export const NoTags = {
  args: {
    initialData: { ...defaultData, tags: [] }
  }
}

// ✅ Неактивное правило
export const InactiveRule = {
  args: {
    initialData: { ...defaultData, slot: 'base' }
  }
}

// ✅ Максимальный приоритет
export const MaxPriority = {
  args: {
    initialData: { ...defaultData, priority: 100 }
  }
}

// ✅ Пустое название
export const EmptyName = {
  args: {
    initialData: { ...defaultData, ruleName: '' }
  }
}
