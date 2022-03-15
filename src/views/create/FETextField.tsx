import { TextField, InputLabel, MenuItem, Select, Stack, OutlinedInput } from '@mui/material';
import React from 'react';

const FETextField = ({ formik, title }) => {
    return (
        <div>
            <InputLabel sx={{ color: '#4C4C4C', fontWeight: 'bold', marginBottom: 1 }} required>
                {title}
            </InputLabel>
            <input
                style={{
                    width: '100%',
                    height: 36,
                    borderRadius: 8,
                    border: '1px solid',
                    borderColor: '#e5e5e5',
                    padding: `4px 12px`,
                    marginTop: 4
                }}
            />
        </div>
    );
};

export default FETextField;
