import { Avatar, Stack, Typography } from '@mui/material';
import moment from 'moment';
import Highlighter from 'react-highlight-words';

const FECommentItem = ({ item }) => {
    return (
        <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
            <Avatar
                sx={{ width: 32, height: 32 }}
                alt="Remy Sharp"
                src="https://cdn.pixabay.com/photo/2021/10/13/11/31/couple-6706278_960_720.jpg"
            />
            <div>
                <Highlighter
                    highlightStyle={{ ...styles.ticket, fontWeight: 'bold' }}
                    unhighlightStyle={styles.ticket}
                    searchWords={['Hoang Thuan ']}
                    autoEscape
                    textToHighlight={`Hoang Thuan ${moment(item.date).format('DD/MM/YYYY')} - ${item?.time}`}
                />
                <Typography>{item?.text}</Typography>
            </div>
        </Stack>
    );
};

export default FECommentItem;

const styles = {
    ticket: {
        background: 'transparent'
    }
};
