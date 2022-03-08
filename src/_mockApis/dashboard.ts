// project imports
// types
import { ChannelDetail } from 'types/customer';
import services from 'utils/mockAdapter';

const channeldetails: ChannelDetail[] = [
    { name: 'SMARTNET', value1: 768148, value2: 303300000, month: 'December', percent: 1.24 },
    { name: 'VIETTEL', value1: 768148, value2: 303300000, month: 'December', percent: 1.24 },
    { name: 'VNPOST', value1: 768148, value2: 303300000, month: 'December', percent: 1.24 },
    { name: 'EPAY', value1: 768148, value2: 303300000, month: 'December', percent: 1.24 },
    { name: 'AGRIBANK', value1: 768148, value2: 303300000, month: 'December', percent: 1.24 },
    { name: 'NAPAS', value1: 768148, value2: 303300000, month: 'December', percent: 1.24 },
    { name: 'AGRIBANK', value1: 768148, value2: 303300000, month: 'December', percent: 1.24 }
];

// ==============================|| MOCK SERVICES ||============================== //

services.onGet('/api/dashboard/channeldetails').reply(200, [...channeldetails]);
