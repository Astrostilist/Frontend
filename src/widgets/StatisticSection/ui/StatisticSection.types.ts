import type { CardType } from './CardStatistic/CardStatistic.types';
export interface StatisticData {
  id: string;
  type: CardType;
  value: number;
  changePercent?: number;
  changeAbsolute?: number;
  title?: string;
  unit?: string;
}
export interface StatisticSectionProps {
  data: StatisticData[];
  loading?: boolean;
  skeletonCount?: number;
  onCardClick?: (cardId: string, cardType: CardType) => void;
  className?: string;
}
