import { useEffect } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import toastService from 'services/core/toast.service';
import ticketsServices from 'services/tickets-services';
import { AssignToModel, UpdateStatusAndActionModel } from 'types/ticket';
import eventEmitter from 'utils/eventEmitter';
import toastify from 'utils/toastify';
import AssignToDialog, { refAssignTo } from '../components/AssignToDialog';
import TicketDetail, { refTicketDetail } from './TicketDetail';

const TicketDetailPage = () => {
    const { ticketID } = useParams();
    const qTicketDetail = useQuery(`qTicketDetail_${ticketID}`, () => ticketsServices.getById(ticketID), { keepPreviousData: false });
    const navi = useNavigate();

    useEffect(() => {
        eventEmitter.addListener('ADD_DESCRIPTION_SUCCESS', (success: boolean) => success && qTicketDetail.refetch());

        return () => {
            eventEmitter.removeAllListeners();
        };
    }, []);

    useEffect(() => {
        eventEmitter.addListener('UPLOAD_ATTACHMENT_SUCCESS', (success: boolean) => success && qTicketDetail.refetch());

        return () => {
            eventEmitter.removeAllListeners();
        };
    }, []);

    const mUpdateTicket = useMutation((model: UpdateStatusAndActionModel) => ticketsServices.updatePut(model), {
        onSuccess: (res) => {
            qTicketDetail.refetch();
            toastify.showToast('success', 'Update Success!');
            navi(-1);
        },
        onError: (err: any) => {
            toastify.showToast('error', err.message);
        }
    });

    const onSaveChanges = (model: any) => {
        return toastService.showConfirm({
            onConfirm: async () => {
                mUpdateTicket.mutate({ ...model, id: ticketID });
            },
            title: 'Are you sure change it?',
            icon: 'warning'
        });
    };

    const mAssignTo = useMutation((model: AssignToModel) => ticketsServices.assignTo(model), {
        onSuccess: (res) => {
            qTicketDetail.refetch();
            toastify.showToast('success', res.data?.message);
            refAssignTo.current?.handleClose();
        },
        onError: (err: any) => {
            toastify.showToast('error', err.message);
        }
    });

    const onSubmitAssignTo = (values: any) => {
        mAssignTo.mutate({
            email: values.email,
            name: values.username,
            ticket_ids: [_.toNumber(ticketID)],
            type: values.type
        });
    };

    const onClickAssignee = () => {
        refTicketDetail.current?.handleClose();
        refAssignTo.current?.handleClickOpen({ title: 'Assignee' });
    };
    const onClickSupporter = () => {
        refTicketDetail.current?.handleClose();
        refAssignTo.current?.handleClickOpen({ title: 'Supporter' });
    };

    return (
        <>
            <TicketDetail
                data={qTicketDetail.data?.data?.data}
                onSaveChanges={onSaveChanges}
                onClickAssignee={onClickAssignee}
                onClickSupporter={onClickSupporter}
            />
            ;
            <AssignToDialog onSubmit={onSubmitAssignTo} />
        </>
    );
};

export default TicketDetailPage;
