import React from 'react';
import { TextField } from '@mui/material';

interface SearchFieldProps {
value: string;
onChange: (value: string) => void;
}

export const SearchField: React.FC<SearchFieldProps> = ({ value, onChange }) => {
return (
<TextField
label="Название товара"
variant="outlined"
fullWidth
value={value}
onChange={(e) => onChange(e.target.value)}
/>
);
};