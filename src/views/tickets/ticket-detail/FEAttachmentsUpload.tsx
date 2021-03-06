import { Box, Stack, Typography, styled, Button, IconButton } from '@mui/material';
import { IconUpload, IconX } from '@tabler/icons';
import useAuth from 'hooks/useAuth';
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useMutation } from 'react-query';
import toastService from 'services/core/toast.service';
import ticketsServices from 'services/tickets-services';
import { AddAttachmentModel } from 'types/ticket';
import eventEmitter from 'utils/eventEmitter';
import toastify from 'utils/toastify';

const BoxStyle = styled(Box)({
    backgroundImage: `url(
        "data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='14' ry='14' stroke='%23CCCCCCFF' stroke-width='4' stroke-dasharray='6%2c 14' stroke-dashoffset='0' stroke-linecap='round'/%3e%3c/svg%3e"
        )`,
    borderRadius: 14
});

const Input = styled('input')({
    display: 'none'
});

const FEAttachmentsUpload = ({ ticketId, disabled }) => {
    const [files, setFiles] = useState<any>([]);

    const mUploadFile = useMutation((file: any) => ticketsServices.addAttachment(file), {
        onSuccess: (res) => {
            setFiles([]);
            toastify.showToast('success', 'Upload Success!');
            eventEmitter.emit('UPLOAD_ATTACHMENT_SUCCESS', true);
        },
        onError: (err: any) => {
            toastify.showToast('error', err.message);
        }
    });

    const onDropFile = (file: any) => {
        setFiles([...file, ...files]);
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop: onDropFile, maxFiles: 5, disabled });

    const onRemoveItem = (index: any) => {
        setFiles(() => files.filter((it: any, indexFile: number) => indexFile !== index));
    };

    const onUpload = () => {
        const formData: any = new FormData();

        files.forEach((element: any, i: number) => {
            formData.append(`attachments[]`, element);
        });

        formData.append('ticket_id', ticketId);

        return toastService.showConfirm({
            onConfirm: async () => {
                mUploadFile.mutate(formData);
            },
            title: 'Are you sure to upload this file?',
            icon: 'warning'
        });
    };

    const filess = files.map((file: any, index: number) => (
        <Stack key={index} direction="row" alignItems="center">
            <li style={{ margin: '8px 4px' }}>
                {file.path} - {file.size} bytes
            </li>
            <IconButton onClick={() => onRemoveItem(index)}>
                <IconX />
            </IconButton>
        </Stack>
    ));

    return (
        <div>
            <BoxStyle
                sx={{ padding: 3, backgroundColor: disabled ? '#B3B3B3' : 'rgba(39, 174, 96, .15)', cursor: 'pointer' }}
                {...getRootProps({ className: `dropzone` })}
            >
                <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
                    <Input id="contained-button-file" {...getInputProps()} />
                    <IconUpload />
                    <Typography>Browse or Drop file here</Typography>
                </Stack>
            </BoxStyle>
            {filess}
            {files.length ? (
                <Button onClick={onUpload} variant="contained">
                    Upload Now
                </Button>
            ) : null}
        </div>
    );
};

export default FEAttachmentsUpload;
