// #region Imports
import { ROLE } from 'constants/auth';
import { FormikHelpers } from 'formik';
import useAuth from 'hooks/useAuth';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import userService from 'services/api-services/user.service';
import toastService from 'services/core/toast.service';
import FEUpdateUserFrm from './components/FEUpdateUserFrm';
// #endregion

const UpdatePartnerPage = ({ ...others }) => {
    // #region Fields
    const navi = useNavigate();
    const { id } = useParams();
    const [isEdit, setIsEdit] = useState(false);
    const [groupId, setGroupId] = useState<any>(null);
    const { user } = useAuth();
    const isPartner = user?.role === ROLE.PARTNER;
    // #endregion

    // #region Queries
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
    const qRolesQuery = useQuery(
        ['qRolesQuery'],
        () => {
            return userService.getRoles();
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
        ['detail_data', id],
        () => {
            if (id) {
                setIsEdit(true);
                return userService.getById(id);
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
    // #endregion

    // #region Functions
    const onSubmit = async (values, formikHelpers: FormikHelpers<any>) => {
        try {
            if (!isEdit) {
                const payload = _.pick(values, [
                    'fullname',
                    'email',
                    'phone',
                    'position',
                    'group_id',
                    'sub_group_id',
                    'role',
                    'password',
                    'partner_id',
                    'user_type'
                ]) as any;
                payload.sub_group_id = payload.position === 'Manager' ? '0' : payload.sub_group_id;
                userService
                    .insert(payload)
                    .then((res) => {
                        toastService.toast('success', 'Created new User');
                        formikHelpers.resetForm();
                        // navi(-1);
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
                    'status',
                    'fullname',
                    'email',
                    'phone',
                    'position',
                    'group_id',
                    'sub_group_id',
                    'role',
                    'password'
                ]) as any;
                toastService.showConfirm({
                    onConfirm: async () => {
                        userService
                            .updatePut(payload)
                            .then((res) => {
                                toastService.toast('success', 'Updated User');
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
    // #endregion

    // #region Lifecycles

    // #endregion

    // #region Render
    return (
        <FEUpdateUserFrm
            onSubmit={onSubmit}
            dataInitial={_.get(
                qDetailQuery,
                'data.data.data',
                isPartner
                    ? {
                          status: 0,
                          created_by: user?.id,
                          partner_id: user?.partner_id,
                          user_type: 2,
                          role: ROLE.PARTNER_STAFF
                      }
                    : {
                          status: 0,
                          created_by: user?.id,
                          partner_id: user?.partner_id,
                          user_type: 1
                      }
            )}
            onChangeGroup={(item) => {
                setGroupId(item.id);
            }}
            groups={_.get(qGroupsQuery, 'data.data.data', [])}
            subGroups={_.get(qSubGroupsQuery, 'data.data.data', [])}
            roles={_.map(_.get(qRolesQuery, 'data.data.data', []), (item) => ({
                id: item.code,
                name: item.name
            }))}
            isLoading={qDetailQuery.isLoading}
            isEdit={isEdit}
            isPartner={isPartner}
        />
    );
    // #endregion
};

export default React.memo(UpdatePartnerPage);
