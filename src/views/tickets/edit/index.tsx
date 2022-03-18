import { useMutation, useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
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
            toastify.showToast('success', 'Upload Success!');
            navi(-1);
        },
        onError: (err: any) => {
            toastify.showToast('error', err.message);
        }
    });

    const onSubmit = (values: any) => {
        const { attachments } = values;
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
            return formData.append(`${key}`, item);
        });

        // BE require
        formData.append(`action`, 0);

        mEditTicket.mutate(formData);
    };

    const qTicketDetail = useQuery(`qTicketDetail_${ticket_id}`, () => ticketsServices.getById(ticket_id), { keepPreviousData: false });

    return <CreateOrEditTicket onSubmit={onSubmit} onCancel={() => navi(-1)} data={qTicketDetail.data?.data?.data} />;
};

export default EditTicketPage;
