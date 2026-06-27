import React from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material/Select';

interface TagFilterProps {
  tag: string;
  allTags: string[];
  onTagChange: (event: SelectChangeEvent<string>) => void;
}

export const TagFilter: React.FC<TagFilterProps> = ({ tag, allTags, onTagChange }) => {
  return (
    <Box sx={{ flex: { xs: 1, sm: 1 } }}>
      <FormControl fullWidth>
        <InputLabel>Тег</InputLabel>
        <Select
          value={tag}
          onChange={onTagChange}
          label="Тег"
          sx={{ minWidth: 120 }}
        >
          <MenuItem value="Все">Все</MenuItem>
          {allTags.map((tagOption) => (
            <MenuItem key={tagOption} value={tagOption}>
              {tagOption}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
