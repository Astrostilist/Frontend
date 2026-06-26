// src\widgets\rules\ui\rulesList\RuleList.tsx

import React from 'react';
import {
  Box,
  Button,
  Typography,
  Stack,
} from '@mui/material';

import type { RuleListProps } from './types';
import { RuleCard } from '../../../../entities';

// const rules = [
//   { isActive: true, ruleName: 'Луна в Весах', contentText: 'luxury, premium, classic, harmonious, unique', priority: '01' },
//   { isActive: false, ruleName: 'Луна в Весах', contentText: 'luxury, premium, classic, harmonious, unique', priority: '01' },
//   { isActive: false, ruleName: 'Луна в Весах', contentText: 'luxury, premium, classic, harmonious, unique', priority: '01' },
//   { isActive: false, ruleName: 'Луна в Весах', contentText: 'luxury, premium, classic, harmonious, unique', priority: '01' },
//   { isActive: false, ruleName: 'Луна в Весах', contentText: 'luxury, premium, classic, harmonious, unique', priority: '01' },
//   { isActive: false, ruleName: 'Луна в Весах', contentText: 'luxury, premium, classic, harmonious, unique', priority: '01' },
// ];

export const RuleList: React.FC<RuleListProps> = ({
    rules
}) => {
    return (
    <Box
      sx={{
        height: '100vh',
        p: 0.5,
        boxSizing: 'border-box',
        backgroundColor: '#fff',
      }}
    >
      <Box
        sx={{
          height: '100%',
          border: '1px solid #7fb0d8',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          p: 1,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexShrink: 0,
            mb: 2,
          }}
        >
          <Typography sx={{ fontSize: 24, fontWeight: 700 }}>
            Список правил
          </Typography>

          <Button variant="outlined" sx={{ textTransform: 'uppercase', fontWeight: 700 }}>
            Новое правило
          </Button>
        </Box>

        <Box
          sx={{
            flex: 1,
            minHeight: 0,
            overflowY: 'auto',
            pr: 1,
          }}
        >
          <Stack spacing={1.5}>
            {rules.map((rule) => (
              <RuleCard
                key={rule.id}
                id={rule.id}
                isActive={rule.isActive}
                ruleName={rule.ruleName}
                contentText={rule.contentText}
                priority={rule.priority}
              />
            ))}
          </Stack>
        </Box>
      </Box>
    </Box>
)}