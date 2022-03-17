import { useMutation } from 'react-query';
import ticketsServices from 'services/tickets-services';
import { CreateTicketModel } from 'types/ticket';
import toastify from 'utils/toastify';
import CreateTicket from './CreateTicket';

const CreateTicketPage = () => {
    const mCreateTicket = useMutation((data: CreateTicketModel) => ticketsServices.createTicket(data), {
        onSuccess: (res) => {
            toastify.showToast('success', 'Upload Success!');
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
    return <CreateTicket onSubmit={onSubmit} />;
};

export default CreateTicketPage;
