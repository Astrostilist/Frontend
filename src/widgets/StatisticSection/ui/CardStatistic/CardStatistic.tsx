import { Card, CardContent, Typography, Chip, Avatar } from '@mui/material';
import { useCardStatistic } from '../../../../hooks/useCardStatistic';
import type { CardStatisticProps } from './CardStatistic.types';
import styles from './CardStatistic.module.css';

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
  const { cardTitle, chipConfig, formattedValue, isIconOnly } = useCardStatistic({
    type,
    value,
    title,
    changePercent,
    changeAbsolute,
    unit,
    successRateThresholds,
  });

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
