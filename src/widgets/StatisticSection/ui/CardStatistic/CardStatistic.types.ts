export type CardType = 'inquiry' | 'successRate' | 'retry' | 'dlq';
export type ChipColor = 'success' | 'warning' | 'error' | 'default';
export type SuccessRateLevel = 'normal' | 'attention' | 'critical';

export interface SuccessRateThresholds {
  critical: number;
  attention: number;
  normal: number;
}

export interface CardStatisticProps {
  type: CardType;
  value: number;
  title?: string;
  changePercent?: number;
  changeAbsolute?: number;
  unit?: string;
  successRateThresholds?: Partial<SuccessRateThresholds>;
  className?: string;
  onClick?: () => void;
}

export interface ChipConfig {
  label: string;
  color: ChipColor;
  icon?: React.ReactElement;
  opacity?: number;
}

export interface UseCardConfigReturn {
  title: string;
  chipConfig: ChipConfig | null;
  formattedValue: string;
}
