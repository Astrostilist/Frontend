import React from 'react';
import { Skeleton, Box, Typography } from '@mui/material';
import { CardStatistic } from './CardStatistic/CardStatistic';
import type { CardStatisticProps } from './CardStatistic/CardStatistic.types';
import type { StatisticSectionProps } from './StatisticSection.types';
import styles from './StatisticSection.module.css';

export const StatisticSection: React.FC<StatisticSectionProps> = ({
  data,
  loading = false,
  skeletonCount = 4,
  onCardClick,
  className,
}) => {
  const handleCardClick = (cardId: string, cardType: CardStatisticProps['type']) => {
    if (onCardClick) {
      onCardClick(cardId, cardType);
    }
  };

  if (loading) {
    return (
      <Box className={`${styles.container} ${className || ''}`}>
        {Array.from({ length: skeletonCount }).map((_, index) => (
          <Skeleton
            key={index}
            className={styles.item}
            variant="rounded"
            height={85}
            animation="wave"
          />
        ))}
      </Box>
    );
  }

  if (!data.length) {
    return (
      <Box className={styles.emptyState}>
        <Typography className={styles.emptyText}>Нет данных для отображения</Typography>
      </Box>
    );
  }

  return (
    <Box className={`${styles.container} ${className || ''}`}>
      {data.map((item) => (
        <CardStatistic
          key={item.id}
          className={styles.item}
          type={item.type}
          value={item.value}
          changePercent={item.changePercent}
          changeAbsolute={item.changeAbsolute}
          unit={item.unit}
          onClick={() => handleCardClick(item.id, item.type)}
        />
      ))}
    </Box>
  );
};

export default StatisticSection;
