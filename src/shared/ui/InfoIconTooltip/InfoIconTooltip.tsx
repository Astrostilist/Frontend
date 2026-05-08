import React, { useState } from 'react';
import './InfoIconTooltip.css';

interface InfoIconTooltipProps {
  tooltipText?: string;
  tooltipWidth?: number;   // ширина в пикселях
  tooltipHeight?: number;  // высота в пикселях
  className?: string;
}

const InfoIconTooltip: React.FC<InfoIconTooltipProps> = ({
  tooltipText = 'Информация',
  tooltipWidth,
  tooltipHeight,
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className={`info-tooltip-wrapper ${className}`}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
      tabIndex={0}
      aria-label="Информация о поле"
    >
      {/* Иконка "i" */}
      <div className="info-tooltip-icon">i</div>

      {/* Тултип */}
      {isVisible && (
        <div
          className="info-tooltip-content"
          role="tooltip"
          style={{
            width: tooltipWidth ? `${tooltipWidth}px` : undefined,
            height: tooltipHeight ? `${tooltipHeight}px` : undefined,
          }}
        >
          {tooltipText}
          {/* Стрелочка  от тултипа */}
          <div className="info-tooltip-arrow"></div>
        </div>
      )}
    </div>
  );
};

export default InfoIconTooltip;
