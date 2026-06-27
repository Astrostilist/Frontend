import React, { useCallback } from 'react';
import { Box, Chip } from '@mui/material';

interface TagsChipGroupProps {
  tags: string[];
  hiddenTags: Record<string, string[]>;
  productId: string;
  onToggleHiddenTags: (productId: string) => void;
}

export const TagsChipGroup: React.FC<TagsChipGroupProps> = ({
  tags,
  hiddenTags,
  productId,
  onToggleHiddenTags
}) => {
  const visibleTags = tags.slice(0, 2);
  const hasHiddenTags = tags.length > 2;
  const hiddenTagCount = tags.length - 2;
  const isExpanded = hiddenTags[productId] !== undefined;

  const handleToggle = useCallback(() => {
    onToggleHiddenTags(productId);
  }, [productId, onToggleHiddenTags]);

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
      {visibleTags.map((tag) => (
        <Chip
          key={tag}
          label={tag}
          size="small"
          color="primary"
          variant="outlined"
          sx={{ mr: 1, mb: 1 }}
        />
      ))}

      {!isExpanded && hasHiddenTags && (
        <Chip
          label={`+${hiddenTagCount}`}
          size="small"
          color="primary"
          variant="outlined"
          sx={{ cursor: 'pointer', mr: 1, mb: 1 }}
          onClick={handleToggle}
        />
      )}

      {isExpanded && hasHiddenTags && (
        <>
          {hiddenTags[productId]?.map((hiddenTag) => (
            <Chip
              key={hiddenTag}
              label={hiddenTag}
              size="small"
              color="primary"
              variant="outlined"
              sx={{ mr: 1, mb: 1 }}
            />
          ))}
        </>
      )}
    </Box>
  );
};
