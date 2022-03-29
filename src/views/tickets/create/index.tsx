import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import toastService from 'services/core/toast.service';
import ticketsServices from 'services/tickets-services';
import { CreateTicketModel } from 'types/ticket';
import toastify from 'utils/toastify';
import CreateOrEditTicket from '../components/CreateOrEditTicket';

const CreateTicketPage = () => {
    const navi = useNavigate();
    const mCreateTicket = useMutation((data: CreateTicketModel) => ticketsServices.createTicket(data), {
        onSuccess: (res) => {
            toastify.showToast('success', 'Create Success!');
            navi(-1);
        },
        onError: (err: any) => {
            toastify.showToast('error', err.message || err);
        }
    });

    const onSubmit = (values: any) => {
        const { attachments, status } = values;

        const formData: any = new FormData();

        attachments.forEach((element: any, i: number) => {
            formData.append(`attachments[]`, element);
        });

        _.forEach(_.omit(values, 'attachments'), (item, key) => {
            formData.append(`${key}`, key === 'transaction_date' ? moment(item).format('DD/MM/YYYY') : item);
        });
        return toastService.showConfirm({
            onConfirm: async () => {
                mCreateTicket.mutate(formData);
            },
            title: status === 0 ? ' Are you sure to save this ticket as draft?' : 'Are you sure submit this ticket?',
            icon: 'warning'
        });
    };
    return <CreateOrEditTicket onSubmit={onSubmit} onCancel={() => navi(-1)} loading={mCreateTicket.isLoading} />;
};

export default CreateTicketPage;
