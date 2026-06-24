// src\entities\rules\ui\RuleCard\types.ts
export interface RuleCardProps {
  isActive: boolean;
  ruleName: string;
  contentText: string;
  priority: string;
  disabled?: boolean;
  onDelete?: () => void;
  onEdit?: () => void;
  onToggleActive?: () => void;
}
