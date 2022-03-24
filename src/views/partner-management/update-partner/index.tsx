// assets
import faker from '@faker-js/faker';
import { FormikHelpers } from 'formik';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import dataService from 'services/api-services/data.service';
import toastService from 'services/core/toast.service';
import partnerServices from 'services/partner-services';
import FEUpdatePartnerFrm from './components/FEUpdatePartnerFrm';

// ==============================|| CREATE PARTNER ||============================== //

const UpdatePartnerPage = ({ ...others }) => {
    const navi = useNavigate();
    const { partnerId } = useParams();
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
        ['detail_data', partnerId],
        () => {
            if (partnerId) {
                setIsEdit(true);
                return partnerServices.getById(`${partnerId}?include_User=1`);
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
            if (!isEdit) {
                partnerServices
                    .insert(values)
                    .then((res) => {
                        toastService.toast('success', 'Created new Partner');
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
        <FEUpdatePartnerFrm
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

export default React.memo(UpdatePartnerPage);
