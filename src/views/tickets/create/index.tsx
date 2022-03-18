import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import ticketsServices from 'services/tickets-services';
import { CreateTicketModel } from 'types/ticket';
import toastify from 'utils/toastify';
import CreateOrEditTicket from '../components/CreateOrEditTicket';

const CreateTicketPage = () => {
    const navi = useNavigate();
    const mCreateTicket = useMutation((data: CreateTicketModel) => ticketsServices.createTicket(data), {
        onSuccess: (res) => {
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

        attachments.forEach((element: any, i: number) => {
            formData.append(`attachments[]`, element);
        });

        _.forEach(_.omit(values, 'attachments'), (item, key) => {
            formData.append(`${key}`, item);
        });
        mCreateTicket.mutate(formData);
    };
    return <CreateOrEditTicket onSubmit={onSubmit} onCancel={() => navi(-1)} />;
};

export default CreateTicketPage;
