import { useMemo } from 'react';
import { ErrorOutlineOutlined as ErrorIcon } from '@mui/icons-material';
import type {
  CardStatisticProps,
  ChipConfig,
  SuccessRateThresholds
} from '../widgets/StatisticSection/ui/CardStatistic/CardStatistic.types';

const DEFAULT_THRESHOLDS: SuccessRateThresholds = {
  critical: 50,
  attention: 80,
  normal: 100,
};

const getSuccessRateLevel = (
  value: number,
  thresholds: SuccessRateThresholds
): 'normal' | 'attention' | 'critical' => {
  if (value < thresholds.critical) return 'critical';
  if (value < thresholds.attention) return 'attention';
  return 'normal';
};

export const useCardStatistic = ({
  type,
  value,
  title,
  changePercent,
  changeAbsolute,
  unit,
  successRateThresholds,
}: CardStatisticProps) => {
  return useMemo(() => {
    const thresholds = { ...DEFAULT_THRESHOLDS, ...successRateThresholds };

    let computedTitle = title;
    let computedChipConfig: ChipConfig | null = null;
    let computedFormattedValue = `${value}${unit}`;
    let computedIsIconOnly = false;

    switch (type) {
      case 'inquiry': {
        computedTitle = computedTitle || 'Запросы за 24ч';

        if (changePercent !== undefined && changePercent !== 0) {
          const isPositive = changePercent > 0;
          computedChipConfig = {
            label: `${isPositive ? '+' : ''}${changePercent}%`,
            color: isPositive ? 'success' : 'warning',
          };
        }
        break;
      }

      case 'successRate': {
        computedTitle = computedTitle || 'Успешные генерации';
        const level = getSuccessRateLevel(value, thresholds);

        const levelConfig: Record<
          typeof level,
          { label: string; color: ChipConfig['color']; icon?: React.ReactElement }
        > = {
          normal: { label: 'Норма', color: 'success' },
          attention: { label: 'Внимание', color: 'warning' },
          critical: { label: 'Критично', color: 'error', icon: <ErrorIcon fontSize="small" /> },
        };

        computedChipConfig = levelConfig[level];
        computedFormattedValue = `${value}%`;
        break;
      }

      case 'retry': {
        computedTitle = computedTitle || 'Задачи Retry';

        if (changeAbsolute !== undefined && changeAbsolute !== 0) {
          const isPositive = changeAbsolute > 0;
          computedChipConfig = {
            label: `${isPositive ? '+' : ''}${changeAbsolute} за 24ч`,
            color: isPositive ? 'warning' : 'success',
          };
        } else if (changePercent !== undefined && changePercent !== 0) {
          const isPositive = changePercent > 0;
          computedChipConfig = {
            label: `${isPositive ? '+' : ''}${changePercent}%`,
            color: isPositive ? 'warning' : 'success',
          };
        }
        break;
      }

      case 'dlq': {
        computedTitle = computedTitle || 'Задачи DLQ';
        const hasTasks = value > 0;

        if (hasTasks) {
          computedChipConfig = {
            label: '',
            color: 'error',
            icon: <ErrorIcon fontSize="small" />,
            opacity: 1,
          };
          computedIsIconOnly = true;
        } else {
          computedChipConfig = {
            label: '',
            color: 'error',
            opacity: 0,
          };
          computedIsIconOnly = true;
        }
        break;
      }
    }

    return {
      cardTitle: computedTitle,
      chipConfig: computedChipConfig,
      formattedValue: computedFormattedValue,
      isIconOnly: computedIsIconOnly,
    };
  }, [type, value, title, changePercent, changeAbsolute, unit, successRateThresholds]);
};
