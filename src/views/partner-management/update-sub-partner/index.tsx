// assets
import faker from '@faker-js/faker';
import { FormikHelpers } from 'formik';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import dataService from 'services/api-services/data.service';
import toastService from 'services/core/toast.service';
import subPartnerServices from 'services/sub-partner-services';
import FEUpdateSubPartnerFrm from './components/FEUpdateSubPartnerFrm';

// ==============================|| CREATE PARTNER ||============================== //

const UpdateSubPartnerPage = ({ ...others }) => {
    const navi = useNavigate();
    const { id } = useParams();
    const [isEdit, setIsEdit] = useState(false);
    const [provinceId, setProvinceId] = useState<any>(null);
    const [districtId, setDistrictId] = useState<any>(null);

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

    const qDetailQuery = useQuery(
        ['detail_data', id],
        () => {
            if (id) {
                setIsEdit(true);
                return subPartnerServices.getById(`${id}`);
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

    const onSubmit = async (values, formikHelpers: FormikHelpers<any>) => {
        try {
            values.email = values.pic_email;
            values.phone = values.pic_phone;
            if (!isEdit) {
                subPartnerServices
                    .insert(values)
                    .then((res) => {
                        toastService.toast('success', 'Created new SubPartner');
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
                    'name',
                    'email',
                    'phone',
                    'address',
                    'address2',
                    'ward',
                    'district',
                    'province',
                    'contract_number',
                    'contract_from',
                    'contract_to',
                    'sign_contract_date',
                    'created_contract_date',
                    'presentative',
                    'pic_email',
                    'pic_phone',
                    'national_id',
                    'status'
                ]) as any;
                toastService.showConfirm({
                    onConfirm: async () => {
                        subPartnerServices
                            .updatePut(payload)
                            .then((res) => {
                                toastService.toast('success', 'Updated SubPartner');
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
        <FEUpdateSubPartnerFrm
            onSubmit={onSubmit}
            dataInitial={_.get(qDetailQuery, 'data.data.data', null)}
            onChangeWard={(item) => {}}
            onChangeProvince={(item) => {
                setProvinceId(item.code);
            }}
            onChangeDistrict={(item) => {
                setDistrictId(item.code);
            }}
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

export default React.memo(UpdateSubPartnerPage);
