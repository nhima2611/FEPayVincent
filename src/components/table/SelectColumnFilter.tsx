import { MenuItem, Select } from '@mui/material';
import { memo } from 'react';

const SelectColumnFilterComp = ({ column: { filterValue, setFilter, id }, dataSelect }) => {
    return (
        <Select
            id="category"
            value={filterValue || ''}
            onChange={(e: any) => {
                setFilter(e.target.value);
            }}
            sx={{ height: 35, borderRadius: 8, width: '100%' }}
        >
            <MenuItem value="">All</MenuItem>
            {_.map(dataSelect(id), (key, value) => {
                return (
                    <MenuItem key={value} value={value.toString()}>
                        {key || 'N/A'}
                    </MenuItem>
                );
            })}
        </Select>
    );
};

export const SelectColumnFilter = memo(SelectColumnFilterComp);
