import { OutlinedInput } from '@mui/material';

export const DefaultColumnFilter = ({ column: { filterValue, setFilter } }) => {
    const onChange = (e) => {
        setFilter(e.target.value || undefined);
    };
    return <OutlinedInput value={filterValue || ''} onChange={onChange} sx={{ height: 35, borderRadius: 8 }} />;
};
