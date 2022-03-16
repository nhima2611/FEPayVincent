import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import ticketsServices from 'services/tickets-services';
import eventEmitter from 'utils/eventEmitter';
import TicketDetail from './TicketDetail';

const TicketDetailPage = () => {
    const { ticketID } = useParams();
    const qTicketDetail = useQuery(`qTicketDetail_${ticketID}`, () => ticketsServices.getById(ticketID));

    console.log(qTicketDetail);

    useEffect(() => {
        eventEmitter.addListener('ADD_DESCRIPTION_SUCCESS', (success: boolean) => success && qTicketDetail.refetch());

        return () => {
            eventEmitter.removeAllListeners();
        };
    }, []);

    return <TicketDetail data={qTicketDetail.data?.data?.data} />;
};

export default TicketDetailPage;
