import faker from '@faker-js/faker';
import _, { LoDashStatic } from 'lodash';
import moment from 'moment';
import numeral from 'numeral';
import { v4 } from 'uuid';

declare global {
    interface Window {
        _: LoDashStatic;
        moment: {};
        faker: any;
        v4: {};
        numeral: any;
        getDaysInMonth: (currentMoment?: moment.MomentInput) => moment.Moment[];
        clients: any;
        appInfo: {
            version: string;
        };
    }
}

window.appInfo = {
    version: '1.0.0'
};
window._ = _;
window.numeral = numeral;
window.moment = moment;
window.faker = faker;
window.v4 = v4;
window.getDaysInMonth = (currentMoment?: moment.MomentInput) => {
    const daysInMonth: moment.Moment[] = [];
    const monthDate = moment(currentMoment).startOf('month');

    for (let i = 0; i < monthDate.daysInMonth(); i + 1) {
        const newDay = monthDate.clone().add(i, 'days');
        daysInMonth.push(newDay);
    }

    return daysInMonth;
};
