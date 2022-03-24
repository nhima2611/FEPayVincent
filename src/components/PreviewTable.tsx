import { LoadingButton } from '@mui/lab';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from '@mui/material';
import { IconDeviceFloppy } from '@tabler/icons';
import { useFormik } from 'formik';
import { createRef, useEffect, useImperativeHandle, useMemo, useState } from 'react';
import * as yup from 'yup';
import FETable from './table/FETable';

const validationSchema = yup.object({
    email: yup.array().required('Email is Required')
});

export const refPreviewTable = createRef<any>();
const PreviewTable = ({ onSubmit, loading }) => {
    const [open, setOpen] = useState(false);

    const formik = useFormik({
        initialValues: {
            data: {
                cols: [],
                data: [],
                message: '',
                success: false
            }
        },
        validationSchema,
        onSubmit: (val) => console.log(val, 'val')
    });

    useEffect(() => {
        !open && formik.resetForm();
    }, [open]);

    const handleClickOpen = (data: any) => {
        setOpen(true);
        formik.setFieldValue('data', data);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useImperativeHandle(
        refPreviewTable,
        () => ({
            handleClickOpen,
            handleClose
        }),
        [open]
    );

    const productsColumns = useMemo(
        () =>
            formik.values.data?.cols[0]
                ? formik.values.data?.cols.map((key) => {
                      const WIDTH_130 = ['row_index'].includes(key);
                      const WIDTH_160 = ['transaction_type', 'requested_by', 'sub_issue_type', 'requester_naid'].includes(key);
                      const WIDTH_190 = ['issue_type', 'wrong_product_type', 'wrong_ref_number'].includes(key);

                      return {
                          Header: _.startCase(_.camelCase(key)),
                          accessor: key,
                          minWidth: WIDTH_130 ? 130 : WIDTH_160 ? 160 : WIDTH_190 ? 190 : 230,
                          Cell: ({ value }) => (
                              <div
                                  style={{
                                      color: value.is_error ? '#FF0015' : 'black',
                                      maxHeight: 40,
                                      overflow: 'hidden'
                                  }}
                              >
                                  {value?.value}
                              </div>
                          ),
                          Filter: ''
                      };
                  })
                : [],
        [formik.values.data?.cols]
    );
    const productsData = useMemo(
        () => [
            ...formik.values.data?.data.map((it: any) => {
                delete it.is_error;
                return it;
            })
        ],
        [formik.values.data?.data]
    );
    return (
        <Dialog open={open} maxWidth="lg" fullWidth>
            <form onSubmit={formik.handleSubmit}>
                <DialogTitle>Preview</DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{ mb: 2 }}>
                        <Typography color={formik.values.data?.success ? '#27AE60' : '#FF0015'}>{formik.values.data.message}</Typography>
                    </DialogContentText>
                    <FETable
                        manualSortBy={false}
                        manualPagination={false}
                        columns={productsColumns}
                        data={productsData}
                        rowId="row_index.value"
                        disableCheckbox
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <LoadingButton
                        variant="outlined"
                        loading={loading}
                        loadingPosition="start"
                        startIcon={<IconDeviceFloppy />}
                        type="submit"
                        disabled={!formik.values.data?.success || loading}
                        onClick={() => onSubmit?.(formik.values.data.data)}
                    >
                        Submit
                    </LoadingButton>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default PreviewTable;
