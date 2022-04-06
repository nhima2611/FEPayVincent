// assets
import { FormikHelpers } from 'formik';
import useAuth from 'hooks/useAuth';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import dataService from 'services/api-services/data.service';
import posServices from 'services/api-services/pos.service';
import toastService from 'services/core/toast.service';
import partnerServices from 'services/partner-services';
import FEUpdatePOSFrm from './components/FEUpdatePOSFrm';

// ==============================|| CREATE PARTNER ||============================== //

const UpdatePOSPage = ({ ...others }) => {
    const navi = useNavigate();
    const { id } = useParams();
    const [isEdit, setIsEdit] = useState(false);
    const { user } = useAuth();
    const [provinceId, setProvinceId] = useState<any>(null);
    const [districtId, setDistrictId] = useState<any>(null);
    // #region GET Data
    const qProvincesQuery = useQuery(
        ['qProvincesQuery'],
        () => {
            return dataService.getCities();
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

    const qDistrictsQuery = useQuery(
        ['qDistrictsQuery', provinceId],
        () => {
            if (provinceId) {
                return dataService.getDistricts(provinceId);
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

    const qWardsQuery = useQuery(
        ['qWardsQuery', districtId],
        () => {
            if (districtId) {
                return dataService.getWards(districtId);
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

    const qSubPartnerQuery = useQuery(
        ['qSubPartnerQuery', user?.partner_id],
        () => partnerServices.getAll(`per_page=1000&page=1&view_type=2`),
        {
            keepPreviousData: true,
            // staleTime: Infinity
            onError: (err: any) => {
                toastService.toast('error', err?.message || 'Something went error !');
            }
        }
    );

    const qDetailQuery = useQuery(
        ['detail_data', id],
        () => {
            if (id) {
                setIsEdit(true);
                return posServices.getById(`${id}`);
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
                setProvinceId(_.get(res, 'data.data.province'));
                setDistrictId(_.get(res, 'data.data.district'));
            }
        }
    );

    // #endregion

    const onSubmit = async (values, formikHelpers: FormikHelpers<any>) => {
        try {
            if (!isEdit) {
                posServices
                    .insert(values)
                    .then((res) => {
                        toastService.toast('success', 'Created new POS');
                        formikHelpers.resetForm();
                        navi(-1);
                    })
                    .catch((err) => {
                        console.log(err);

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
                    'sub_partner_id',
                    'email',
                    'name',
                    'phone',
                    'statu',
                    'presentative',
                    'address',
                    'address2',
                    'ward',
                    'district',
                    'province'
                ]) as any;
                toastService.showConfirm({
                    onConfirm: async () => {
                        posServices
                            .updatePut(payload)
                            .then((res) => {
                                toastService.toast('success', 'Updated POS');
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
        <FEUpdatePOSFrm
            onSubmit={onSubmit}
            dataInitial={_.get(qDetailQuery, 'data.data.data', null)}
            onChangeWard={(item) => {}}
            onChangeProvince={(item) => {
                setProvinceId(item.code);
            }}
            onChangeDistrict={(item) => {
                setDistrictId(item.code);
            }}
            subPartners={_.map(_.get(qSubPartnerQuery, 'data.data.data', []), (item) => {
                return { id: item.id, name: item.sub_partner };
            })}
            cities={_.map(_.get(qProvincesQuery, 'data.data.data', []), (item) => {
                return { ...item, id: item.code };
            })}
            districts={_.map(_.get(qDistrictsQuery, 'data.data.data', []), (item) => {
                return { ...item, id: item.code };
            })}
            wards={_.map(_.get(qWardsQuery, 'data.data.data', []), (item) => {
                return { ...item, id: item.code };
            })}
            isLoading={qDetailQuery.isLoading}
            isEdit={isEdit}
        />
    );
};

export default React.memo(UpdatePOSPage);
