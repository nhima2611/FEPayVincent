import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import SaveIcon from '@mui/icons-material/Save';
import { LoadingButton } from '@mui/lab';
import { Button } from '@mui/material';
// material-ui
import { useTheme } from '@mui/material/styles';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import MainCard from 'ui-component/cards/MainCard';

export default function ToolbarUpdate({ onBack, loading }: { onBack?: () => void; loading?: boolean }) {
    const theme = useTheme();
    const navigate = useNavigate();

    return (
        <MainCard
            boxShadow
            shadow="0px 4px 4px rgba(0, 0, 0, 0.05)"
            sx={{
                boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.05)',
                border: '1px solid #E5E5E5 !important',
                mb: 3
            }}
            contentSX={{ padding: '8px !important' }}
        >
            <Button
                disableElevation
                // size="small"
                type="button"
                variant="contained"
                // color="secondary"
                startIcon={<KeyboardBackspaceIcon />}
                onClick={() => {
                    onBack ? onBack?.() : navigate(-1);
                }}
                sx={{ mr: 2, bgcolor: theme.palette.grey.A200, color: '#000' }}
            >
                Back
            </Button>
            <LoadingButton
                disableElevation
                disabled={loading}
                // size="small"
                type="submit"
                variant="contained"
                color="primary"
                startIcon={<SaveIcon />}
                loading={loading}
                loadingPosition="start"
            >
                Save
            </LoadingButton>
        </MainCard>
    );
}
