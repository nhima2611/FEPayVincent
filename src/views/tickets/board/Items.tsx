import { CSSProperties, useState } from 'react';

// material-ui
import { useTheme, Theme } from '@mui/material/styles';
import { ButtonBase, CardMedia, IconButton, Link, Menu, MenuItem, Stack, Tooltip, Typography } from '@mui/material';

// third-party
import { Draggable, DraggingStyle, NotDraggingStyle } from 'react-beautiful-dnd';
import Highlighter from 'react-highlight-words';

// project imports
import useConfig from 'hooks/useConfig';
// import EditStory from '../Backlogs/EditStory';
import AlertItemDelete from './AlertItemDelete';
import { openSnackbar } from 'store/slices/snackbar';
import { useDispatch, useSelector } from 'store';
import { selectItem, deleteItem } from 'store/slices/kanban';

// assets
import MoreVertTwoToneIcon from '@mui/icons-material/MoreVertTwoTone';
import MenuBookTwoToneIcon from '@mui/icons-material/MenuBookTwoTone';

// types
import { DefaultRootStateProps } from 'types';
import { KanbanItem } from 'types/kanban';
import { TicketItem } from 'types/ticket';
import { lastStatusType } from '../constant';
import { useNavigate } from 'react-router-dom';

interface Props {
    item: TicketItem;
    index: number;
    columnColor?: string;
}

// const backImage = require.context('assets/images/profile', true);

// item drag wrapper
const getDragWrapper = (
    isDragging: boolean,
    draggableStyle: DraggingStyle | NotDraggingStyle | undefined,
    theme: Theme,
    radius: string,
    columnColor?: string
): CSSProperties | undefined => {
    const bgcolor = theme.palette.mode === 'dark' ? theme.palette.background.paper + 90 : theme.palette.grey[50];
    return {
        userSelect: 'none',
        margin: `0 0 ${8}px 0`,
        padding: 8,
        border: '1px solid',
        borderColor: columnColor,
        backgroundColor: isDragging ? bgcolor : theme.palette.background.paper,
        borderRadius: radius,
        ...draggableStyle
    };
};

// ==============================|| KANBAN BOARD - ITEMS ||============================== //

const Items = ({ item, index, columnColor }: Props) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    // const backProfile = item.image && backImage(`./${item.image}`).default;
    const { borderRadius } = useConfig();
    const kanban = useSelector((state: DefaultRootStateProps) => state.kanban);
    const { userStory, items, columns } = kanban;
    const itemStory = userStory.filter((story) => story?.itemIds?.filter((itemId) => itemId === item.ticket_id.toString())[0])[0];

    const handlerDetails = (id: string) => {
        dispatch(selectItem(id));
    };

    const [anchorEl, setAnchorEl] = useState<Element | ((element: Element) => Element) | null | undefined>(null);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement> | undefined) => {
        setAnchorEl(event?.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const [open, setOpen] = useState(false);
    const handleModalClose = (status: boolean) => {
        setOpen(false);
        if (status) {
            dispatch(deleteItem('', items, columns, userStory));
            dispatch(
                openSnackbar({
                    open: true,
                    message: 'Task Deleted successfully',
                    anchorOrigin: { vertical: 'top', horizontal: 'right' },
                    variant: 'alert',
                    alert: {
                        color: 'success'
                    },
                    close: false
                })
            );
        }
    };

    const [openStoryDrawer, setOpenStoryDrawer] = useState<boolean>(false);
    const handleStoryDrawerOpen = () => {
        setOpenStoryDrawer((prevState) => !prevState);
    };

    const editStory = () => {
        setOpenStoryDrawer((prevState) => !prevState);
    };

    const navi = useNavigate();

    const onClickRowItem = (id: string) => {
        navi(id);
    };

    return (
        <Draggable key={item.ticket_id.toString()} draggableId={item.ticket_id.toString()} index={index} isDragDisabled>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getDragWrapper(snapshot.isDragging, provided.draggableProps.style, theme, `${borderRadius}px`, columnColor)}
                >
                    <Stack
                        onClick={() => onClickRowItem(item.ticket_id.toString())}
                        direction="column"
                        justifyContent="space-between"
                        alignItems="flex-start"
                        sx={{ mb: itemStory ? -0.75 : 0 }}
                    >
                        <Highlighter
                            highlightStyle={{ ...styles.ticket, fontWeight: 'bold' }}
                            unhighlightStyle={styles.ticket}
                            searchWords={['Ticket ID: ']}
                            autoEscape
                            textToHighlight={`Ticket ID: ${item.ticket_id}`}
                        />
                        <Highlighter
                            highlightStyle={{ ...styles.ticket, fontWeight: 'bold' }}
                            unhighlightStyle={styles.ticket}
                            searchWords={['Contract ID: ']}
                            autoEscape
                            textToHighlight={`Contract ID: ${item.contract_id}`}
                        />
                        <Highlighter
                            highlightStyle={{ ...styles.ticket, fontWeight: 'bold' }}
                            unhighlightStyle={styles.ticket}
                            searchWords={['Ref#: ']}
                            autoEscape
                            textToHighlight={`Ref#: ${item.ref_number}`}
                        />
                        <Highlighter
                            highlightStyle={{ ...styles.ticket, fontWeight: 'bold' }}
                            unhighlightStyle={styles.ticket}
                            searchWords={['Created Date: ']}
                            autoEscape
                            textToHighlight={`Created Date: ${moment(item.created_date).format('DD/MM/YYYY')}`}
                        />
                        <Highlighter
                            highlightStyle={{ ...styles.ticket, fontWeight: 'bold' }}
                            unhighlightStyle={{ ...styles.ticket, color: columnColor }}
                            searchWords={['Status: ']}
                            autoEscape
                            textToHighlight={`Status: ${_.get(lastStatusType, [item.last_status])}`}
                        />
                    </Stack>
                </div>
            )}
        </Draggable>
    );
};

export default Items;

const styles = {
    ticket: {
        cursor: 'pointer',
        fontSize: 10,
        background: 'transparent'
    }
};
