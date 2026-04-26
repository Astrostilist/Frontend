import React, { useMemo } from 'react';
import { Card, CardContent, Typography, Chip, Avatar } from '@mui/material';
import { ErrorOutlineOutlined as ErrorIcon } from '@mui/icons-material';
import type { CardStatisticProps, ChipConfig, SuccessRateThresholds } from './CardStatistic.types';
import styles from './CardStatistic.module.css';

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

const IconOnlyChip: React.FC<{ icon: React.ReactElement; color: string; opacity?: number }> = ({
  icon,
  color,
  opacity = 1,
}) => (
  <Avatar
    sx={{
      bgcolor: `${color}.main`,
      width: 24,
      height: 24,
      opacity,
      '& svg': {
        fontSize: 16,
      },
    }}
  >
    {icon}
  </Avatar>
);

export const CardStatistic: React.FC<CardStatisticProps> = ({
  type,
  value,
  title,
  changePercent,
  changeAbsolute,
  unit = '',
  successRateThresholds = {},
  className,
  onClick,
}) => {
  const { cardTitle, chipConfig, formattedValue, isIconOnly } = useMemo(() => {
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

  const cardClasses = [styles.card, onClick ? styles['card--clickable'] : '', className]
    .filter(Boolean)
    .join(' ');

  const chipClassName =
    chipConfig?.opacity !== undefined && chipConfig.opacity === 0
      ? styles.chipHidden
      : styles.chipWithOpacity;

  const renderIconOnlyChip = () => {
    if (!chipConfig?.icon || chipConfig.opacity === 0) return null;
    return (
      <IconOnlyChip icon={chipConfig.icon} color={chipConfig.color} opacity={chipConfig.opacity} />
    );
  };

  const renderTextChip = () => {
    if (isIconOnly) return null;
    if (!chipConfig?.label || chipConfig.label === '') return null;
    return (
      <Chip
        label={chipConfig.label}
        color={chipConfig.color}
        size="small"
        {...(chipConfig.icon && { icon: chipConfig.icon })}
        className={chipClassName}
        style={
          chipConfig?.opacity !== undefined && chipConfig.opacity !== 0
            ? { opacity: chipConfig.opacity }
            : undefined
        }
        sx={{ pl: 0.3, pr: 0.3 }}
      />
    );
  };

  return (
    <Card sx={{ boxShadow: 'none' }} className={cardClasses}>
      <CardContent
        sx={{
          padding: 1.5,
          '&:last-child': {
            paddingBottom: 1.5,
          },
          display: 'flex',
          flexDirection: 'column',
          gap: 0.5,
        }}
      >
        <div className={styles.header}>
          <Typography variant="body2" color="text.primary" className={styles.title}>
            {cardTitle}
          </Typography>

          {isIconOnly ? renderIconOnlyChip() : renderTextChip()}
        </div>

        <Typography variant="h5" component="div" sx={{ fontWeight: 600 }}>
          {formattedValue}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CardStatistic;
