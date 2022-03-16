import { useEffect } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import toastService from 'services/core/toast.service';
import ticketsServices from 'services/tickets-services';
import { UpdateStatusAndActionModel } from 'types/ticket';
import eventEmitter from 'utils/eventEmitter';
import toastify from 'utils/toastify';
import TicketDetail from './TicketDetail';

const TicketDetailPage = () => {
    const { ticketID } = useParams();
    const qTicketDetail = useQuery(`qTicketDetail_${ticketID}`, () => ticketsServices.getById(ticketID), { keepPreviousData: false });

    console.log(qTicketDetail);

    useEffect(() => {
        eventEmitter.addListener('ADD_DESCRIPTION_SUCCESS', (success: boolean) => success && qTicketDetail.refetch());

        return () => {
            eventEmitter.removeAllListeners();
        };
    }, []);

    const mUpdateTicket = useMutation((model: UpdateStatusAndActionModel) => ticketsServices.updatePut(model), {
        onSuccess: (res) => {
            qTicketDetail.refetch();
            toastify.showToast('success', 'Update Success!');
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

    return <TicketDetail data={qTicketDetail.data?.data?.data} onSaveChanges={onSaveChanges} />;
};

export default TicketDetailPage;
