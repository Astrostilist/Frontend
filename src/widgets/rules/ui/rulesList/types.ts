import type { RuleCardProps } from "../../../../entities";

export interface RuleListProps {
  rules: RuleCardProps[];
  onCreateRule?: () => void;
  onDeleteRule?: (id: number) => void;
  onEditRule?: (id: number) => void;
  onToggleRule?: (id: number) => void;
}