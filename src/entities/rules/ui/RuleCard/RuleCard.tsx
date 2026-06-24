// src\entities\rules\ui\RuleCard\RuleCard.tsx

//for test in app
//  <div>
//         <RuleCard
//             isActive={true}
//             ruleName="testing"
//             contentText="something something something something"
//             priority="2"
//         />
//       </div>

import React from 'react';
import type { RuleCardProps } from './types';
import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  Chip,
} from '@mui/material';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

export const RuleCard: React.FC<RuleCardProps> = ({
  isActive,
  ruleName,
  contentText,
  priority,
  disabled = false,
  onDelete,
  onEdit,
  onToggleActive,
}) => {
  return (
    <Card
      data-active={isActive}
      data-disabled={disabled}
      sx={{
        borderRadius: '8px',
        border: '1px solid transparent',
        boxShadow:
          '0px 1px 3px rgba(0, 0, 0, 0.12), 0px 1px 1px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.2)',
        backgroundColor: '#fff',
        overflow: 'hidden',
        transition: 'background-color 0.2s ease, opacity 0.2s ease',
        opacity: disabled ? 0.14 : 1,
        pointerEvents: disabled ? 'none' : 'auto',
        '&:hover': {
          backgroundColor: disabled ? '#fff' : 'grey.500',
        },

        '&:hover .ruleCard-actions': {
          opacity: 1,
          visibility: 'visible',
          pointerEvents: 'auto',
        },

        '&[data-active="true"] .ruleCard-actions': {
          opacity: 1,
          visibility: 'visible',
          pointerEvents: 'auto',
        },
      }}
    >
      <CardContent sx={{ p: 2, pb: '16px !important' }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 0, flex: 1 }}>
            {isActive ? (
              <RadioButtonCheckedIcon sx={{ fontSize: 12, color: 'success.main', flexShrink: 0 }} />
            ) : (
              <RadioButtonUncheckedIcon sx={{ fontSize: 12, color: 'grey.400', flexShrink: 0 }} />
            )}

            <Typography
              component="h3"
              sx={{
                fontSize: 18,
                fontWeight: 700,
                lineHeight: 1.2,
                color: 'text.primary',
                minWidth: 0,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {ruleName}
            </Typography>
          </Box>

          <Box
            sx={{
              width: 24,
              height: 24,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              color: 'text.secondary',
            }}
          >
            <DragIndicatorIcon fontSize="small" />
          </Box>
        </Box>

        <Typography
          sx={{
            mt: 1.5,
            fontSize: 16,
            lineHeight: 1.5,
            color: 'text.primary',
            wordBreak: 'break-word',
          }}
        >
          {contentText}
        </Typography>

        <Box
          sx={{
            mt: 1.5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 1,
          }}
        >
          <Chip
            label={priority}
            size="small"
            sx={{
              height: 24,
              borderRadius: '999px',
              backgroundColor: 'grey.100',
              color: 'text.primary',
              fontSize: 14,
              '& .MuiChip-label': {
                px: 1.25,
              },
            }}
          />

          <Box
            className="ruleCard-actions"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              opacity: isActive ? 1 : 0,
              visibility: isActive ? 'visible' : 'hidden',
              pointerEvents: isActive ? 'auto' : 'none',
              transition: 'opacity 0.18s ease, visibility 0.18s ease',
            }}
          >
            <IconButton size="small" onClick={onDelete} aria-label="delete rule">
              <DeleteIcon sx={{ fontSize: 18 }} />
            </IconButton>

            <IconButton size="small" onClick={onEdit} aria-label="edit rule">
              <EditIcon sx={{ fontSize: 18 }} />
            </IconButton>

            <IconButton
              size="small"
              onClick={onToggleActive}
              aria-label={isActive ? 'pause rule' : 'activate rule'}
            >
              {isActive ? (
                <PauseIcon sx={{ fontSize: 18 }} />
              ) : (
                <PlayArrowIcon sx={{ fontSize: 18 }} />
              )}
            </IconButton>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};