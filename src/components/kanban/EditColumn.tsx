import { Box } from '@mui/material';
// material-ui
import { useTheme } from '@mui/material/styles';
import { ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
// project imports
import { useDispatch, useSelector } from 'store';
import { editColumn } from 'store/slices/kanban';
// types
import { KanbanColumn } from 'types/kanban';

interface Props {
    column: KanbanColumn;
}

// ==============================|| KANBAN BOARD - COLUMN EDIT ||============================== //

const EditColumn = ({ column }: Props) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const navi = useNavigate();

    const { columns } = useSelector((state) => state.kanban);

    const handleColumnRename = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch(
            editColumn(
                {
                    id: column.id,
                    title: event.target.value,
                    itemIds: column.itemIds,
                    color: column.color
                },
                columns
            )
        );
    };

    const onNaviList = () => {
        if (column.type === 1) {
            navi(`/waiting-tickets?status=${column.type}`);
        } else {
            navi(`/tickets?status=${column.type}`);
        }
    };

    return (
        // <OutlinedInput
        //     fullWidth
        //     value={column.title}
        //     onChange={handleColumnRename}
        //     sx={{
        //         mb: 1.5,
        //         '& input:focus': {
        //             bgcolor: theme.palette.mode === 'dark' ? theme.palette.dark[800] : theme.palette.grey[50]
        //         },
        //         '& input:hover': {
        //             bgcolor: theme.palette.mode === 'dark' ? theme.palette.dark[800] : theme.palette.grey[50]
        //         },
        //         '& input:hover + fieldset': {
        //             display: 'block'
        //         },
        //         '&, & input': { bgcolor: 'transparent' },
        //         '& fieldset': { display: 'none' },
        //         '& input:focus + fieldset': { display: 'block' }
        //     }}
        // />
        <Box
            component="div"
            sx={{
                mb: 1.5,
                textAlign: 'center',
                color: column.color,
                fontSize: 12,
                fontWeight: 'bold',
                cursor: 'pointer'
            }}
            onClick={onNaviList}
        >
            {`${column.title} (${column.itemIds?.length})`}
        </Box>
    );
};

export default EditColumn;
