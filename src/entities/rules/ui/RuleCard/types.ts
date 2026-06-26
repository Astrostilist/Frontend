// src\entities\rules\ui\RuleCard\types.ts
export interface RuleCardProps {
  id: number;
  isActive: boolean;
  ruleName: string;
  contentText: string;
  priority: string;
  disabled?: boolean;
  onDelete?: (id: number) => void;
  onEdit?: (id: number) => void;
  onToggleActive?: (id: number) => void;
}
