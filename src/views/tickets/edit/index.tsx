import { useMutation, useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import toastService from 'services/core/toast.service';
import ticketsServices from 'services/tickets-services';
import { CreateTicketModel } from 'types/ticket';
import toastify from 'utils/toastify';
import CreateOrEditTicket from '../components/CreateOrEditTicket';

const EditTicketPage = () => {
    const { ticket_id } = useParams();
    const navi = useNavigate();

    const mEditTicket = useMutation((data: CreateTicketModel) => ticketsServices.editTicket(data, ticket_id), {
        onSuccess: (res) => {
            console.log(res);
            toastify.showToast('success', 'Update Success!');
            navi(-1);
        },
        onError: (err: any) => {
            toastify.showToast('error', err.message || err);
        }
    });

    const onSubmit = (values: any) => {
        const { attachments, status } = values;
        const formData: any = new FormData();

        const dd: any = [];

        attachments.forEach((element: any) => {
            if (_.has(element, 'id')) {
                dd.push(element.id);
            } else {
                formData.append(`attachments[]`, element);
            }
        });
        formData.append(`attachmentIds[]`, dd);

        _.forEach(_.omit(values, 'attachments'), (item, key) => {
            return formData.append(`${key}`, key === 'transaction_date' ? moment(item).format('DD/MM/YYYY') : item);
        });

        // BE require
        formData.append(`action`, 0);

        return toastService.showConfirm({
            onConfirm: async () => {
                mEditTicket.mutate(formData);
            },
            title: status === 0 ? ' Are you sure to save this ticket as draft?' : 'Are you sure submit this ticket?',
            icon: 'warning'
        });
    };

    const qTicketDetail = useQuery(`qTicketDetail_${ticket_id}`, () => ticketsServices.getById(ticket_id), { keepPreviousData: false });

    return (
        <CreateOrEditTicket
            loading={mEditTicket.isLoading}
            onSubmit={onSubmit}
            onCancel={() => navi(-1)}
            data={qTicketDetail.data?.data?.data}
        />
    );
};

export default EditTicketPage;
