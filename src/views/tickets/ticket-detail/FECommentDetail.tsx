import AttachmentTwoToneIcon from '@mui/icons-material/AttachmentTwoTone';
import SendTwoToneIcon from '@mui/icons-material/SendTwoTone';
import { Avatar, IconButton, OutlinedInput, Stack } from '@mui/material';
import { map } from 'lodash';
import React, { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import FECommentItem from './FECommentItem';

const FECommentDetail = () => {
    const [message, setMessage] = useState('');
    const [data, setData] = useState<any[]>([]);

    const handleOnSend = (e) => {
        e.preventDefault();
        if (!Boolean(message.length)) return;
        const d = new Date();
        setMessage('');
        const newMessage = {
            text: message,
            time: d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            date: d
        };
        setData((prevState) => [...prevState, newMessage]);
    };

    return (
        <form onSubmit={handleOnSend}>
            <Stack direction="row" spacing={2} alignItems="center" sx={{ marginY: 2 }}>
                <Avatar
                    sx={{ width: 32, height: 32 }}
                    alt="Remy Sharp"
                    src="https://cdn.pixabay.com/photo/2021/10/13/11/31/couple-6706278_960_720.jpg"
                />
                <OutlinedInput
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Comment"
                    sx={{ height: 32 }}
                    fullWidth
                    endAdornment={
                        <>
                            <IconButton
                                disableRipple
                                //    onClick={handleClickShowPassword}
                            >
                                <AttachmentTwoToneIcon />
                            </IconButton>
                            <IconButton disableRipple onClick={handleOnSend}>
                                <SendTwoToneIcon color="primary" />
                            </IconButton>
                        </>
                    }
                />
            </Stack>
            <PerfectScrollbar style={{ width: '100%', height: 'auto', overflowX: 'hidden' }}>
                {map(data, (item, index) => (
                    <FECommentItem key={index} item={item} />
                ))}
            </PerfectScrollbar>
        </form>
    );
};

export default FECommentDetail;
