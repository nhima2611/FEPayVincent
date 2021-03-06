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
    const qTicketDetail = useQuery(`qTicketDetail_${ticketID}`, () => ticketsServices.getById(ticketID), {
        keepPreviousData: false,
        onError: (err: any) => {
            toastify.showToast('error', err.message || err);
        }
    });
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

    const mUpdateTicket = useMutation(
        (model: UpdateStatusAndActionModel) => ticketsServices.updateStatusTicket(model, _.toNumber(ticketID)),
        {
            onSuccess: (res) => {
                qTicketDetail.refetch();
                toastify.showToast('success', 'Update Success!');
                navi(-1);
            },
            onError: (err: any) => {
                toastify.showToast('error', err.message || err);
            }
        }
    );

    const onSaveChanges = (model: any) => {
        return toastService.showConfirm({
            onConfirm: async () => {
                mUpdateTicket.mutate(model);
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
            toastify.showToast('error', err.message || err);
        }
    });

    const onSubmitAssignTo = (data: AssignToModel) => {
        mAssignTo.mutate({
            ...data,
            ticket_ids: [_.toNumber(ticketID)]
        });
    };

    const onClickAssignee = () => {
        refTicketDetail.current?.handleClose();
        refAssignTo.current?.handleClickOpen({ title: 'Assignee', data: qTicketDetail.data?.data?.data?.assignee });
    };

    const onClickSupporter = () => {
        refTicketDetail.current?.handleClose();
        refAssignTo.current?.handleClickOpen({ title: 'Supporter', data: qTicketDetail.data?.data?.data?.supporter });
    };

    const onCancelTicket = () => {
        return toastService.showConfirm({
            onConfirm: async () => {
                mUpdateTicket.mutate({ status: 6, id: ticketID });
            },
            title: 'Are you sure cancel ticket?',
            icon: 'warning'
        });
    };

    return (
        <>
            <TicketDetail
                data={qTicketDetail.data?.data?.data}
                onSaveChanges={onSaveChanges}
                onClickAssignee={onClickAssignee}
                onClickSupporter={onClickSupporter}
                onCancelTicket={onCancelTicket}
            />
            <AssignToDialog onSubmit={onSubmitAssignTo} loading={mAssignTo.isLoading} />
        </>
    );
};

export default TicketDetailPage;
