// assets
import faker from '@faker-js/faker';
import { FormikHelpers } from 'formik';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import userService from 'services/api-services/user.service';
import toastService from 'services/core/toast.service';
import partnerServices from 'services/partner-services';
import FEUpdateUserFrm from './components/FEUpdateUserFrm';

// ==============================|| CREATE PARTNER ||============================== //
const staffRoles = ['Partner Staff', 'Ticket Staff', 'Repayment Staff', 'Disbursement Staff'];
const managerRoles = ['Partner', 'Ticket Manager', 'Repayment Manager', 'Disbursement Manager'];

const UpdatePartnerPage = ({ ...others }) => {
    const navi = useNavigate();
    const { partnerId } = useParams();
    const [isEdit, setIsEdit] = useState(false);
    const [groupId, setGroupId] = useState<any>(null);
    const [roles, setRoles] = useState<any>(
        _.map(staffRoles, (item) => {
            return { id: item, name: item };
        })
    );
    const qGroupsQuery = useQuery(
        ['qGroupsQuery'],
        () => {
            return userService.getGroups(0);
        },
        {
            keepPreviousData: true,
            // staleTime: Infinity
            onError: (err: any) => {
                toastService.toast('error', err?.message || 'Something went error !');
            },
            onSuccess: (res) => {}
        }
    );

    const qSubGroupsQuery = useQuery(
        ['qSubGroupsQuery', groupId],
        () => {
            if (groupId) {
                return userService.getGroups(groupId);
            }
            return null;
        },
        {
            keepPreviousData: true,
            // staleTime: Infinity
            onError: (err: any) => {
                toastService.toast('error', err?.message || 'Something went error !');
            },
            onSuccess: (res) => {}
        }
    );

    const qDetailQuery = useQuery(
        ['detail_data', partnerId],
        () => {
            if (partnerId) {
                setIsEdit(true);
                return partnerServices.getById(partnerId);
            }
            setIsEdit(false);
            return null;
        },
        {
            keepPreviousData: true,
            // staleTime: Infinity
            onError: (err: any) => {
                toastService.toast('error', err?.message || 'Something went error !');
            },
            onSuccess: (res: any) => {
                setGroupId(_.get(res, 'data.data.group_id'));
            }
        }
    );

    const onSubmit = async (values, formikHelpers: FormikHelpers<any>) => {
        try {
            if (!isEdit) {
                console.log(values);

                userService
                    .insert(values)
                    .then((res) => {
                        toastService.toast('success', 'Created new User');
                        formikHelpers.resetForm();
                        navi(-1);
                    })
                    .catch((err) => {
                        toastService.toast(
                            'error',
                            `${err?.message} ${_.map(err.details, (item) => {
                                return `\n<i> - ${item}</i>`;
                            })}` || 'Something went error !'
                        );
                    });
            }
            if (isEdit) {
                const payload = _.pick(values, [
                    'id',
                    'email',
                    'code',
                    'name',
                    'presentative',
                    'pic_email',
                    'pic_phone',
                    'contract_number',
                    'contract_from',
                    'contract_to',
                    'sign_contract_date',
                    'phone',
                    'address',
                    'address2',
                    'ward',
                    'district',
                    'province'
                ]) as any;
                payload.code = faker.internet.password();
                toastService.showConfirm({
                    onConfirm: async () => {
                        partnerServices
                            .updatePut(payload)
                            .then((res) => {
                                toastService.toast('success', 'Updated Partner');
                                qDetailQuery.refetch();
                            })
                            .catch((err) => {
                                toastService.toast(
                                    'error',
                                    `${err?.message} ${_.map(err.details, (item) => {
                                        return `\n<i> - ${item}</i>`;
                                    })}` || 'Something went error !'
                                );
                            });
                    }
                });
            }
            formikHelpers.setStatus({ success: true });
            formikHelpers.setSubmitting(false);
        } catch (err: any) {
            console.error(err);
            formikHelpers.setStatus({ success: false });
            formikHelpers.setSubmitting(false);
        }
    };

    return (
        <FEUpdateUserFrm
            onSubmit={onSubmit}
            dataInitial={_.get(qDetailQuery, 'data.data.data', null)}
            onChangeGroup={(item) => {
                setGroupId(item.id);
            }}
            onChangePosition={(itemS) => {
                switch (itemS.name) {
                    case 'Staff':
                        setRoles(
                            _.map(staffRoles, (item) => {
                                return { id: item, name: item };
                            })
                        );
                        break;
                    case 'Manager':
                        setRoles(
                            _.map(managerRoles, (item) => {
                                return { id: item, name: item };
                            })
                        );
                        break;
                }
            }}
            groups={_.get(qGroupsQuery, 'data.data.data', [])}
            subGroups={_.get(qSubGroupsQuery, 'data.data.data', [])}
            roles={roles}
            isLoading={qDetailQuery.isLoading}
            isEdit={isEdit}
        />
    );
};

export default React.memo(UpdatePartnerPage);
