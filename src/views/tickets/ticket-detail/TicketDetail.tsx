import { Box, Button, Divider, Grid, IconButton, Menu, MenuItem, Stack, Typography } from '@mui/material';
import { IconUserPlus } from '@tabler/icons';
import { ROLE } from 'constants/auth';
import {
    actionTicketTypes,
    getColorAndNameStatus,
    issueType,
    lastStatusType,
    productTypeRightContractNumberType,
    productTypes,
    requestedBy,
    subIssueType,
    transactionType
} from 'constants/tickets';
import useAuth from 'hooks/useAuth';
import { createRef, SyntheticEvent, useEffect, useImperativeHandle, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { TicketDetailModel } from 'types/ticket';
import MainCard from 'ui-component/cards/MainCard';
import FEAttachmentsList from './FEAttachmentsList';
import FEAttachmentsUpload from './FEAttachmentsUpload';
import FEDescriptionDetail from './FEDescriptionDetail';
import FEItemDetail from './FEItemDetail';
import FESelectDetail from './FESelectDetail';
import TasksCard from './TasksCard';

interface Props {
    data: TicketDetailModel;
    onSaveChanges: (data: any) => void;
    onClickAssignee: () => void;
    onClickSupporter: () => void;
    onCancelTicket: () => void;
}

export const refTicketDetail = createRef<{ handleClose: () => void }>();
const TicketDetail = ({ data, onSaveChanges, onClickAssignee, onClickSupporter, onCancelTicket }: Props) => {
    const { user } = useAuth();
    const isPartner = user?.role === ROLE.PARTNER;
    const isManager = [ROLE.SUPER_ADMIN, ROLE.CARD_MANAGER, ROLE.LOAN_MANAGER].includes(user?.role as any);
    const isStaff = [ROLE.DISBURSEMENT_STAFF, ROLE.REPAYMENT_STAFF].includes(user?.role as any);

    const isSolvedRejectCancel = [4, 5, 6].includes(data?.status);
    const isRevertedAndPartner = [3].includes(data?.status) && isPartner;
    const statusData = isStaff
        ? _.pick(lastStatusType, ['2', '3', '4', '5'])
        : isRevertedAndPartner
        ? _.pick(lastStatusType, ['2', '3'])
        : _.omit(lastStatusType, ['0', '1', '6']);

    const [selected, setSelected] = useState<any>({});
    const isSolvedRejectCancelSelected = [4, 5, 6].includes(selected?.status);

    useEffect(() => {
        setSelected({ ...selected, action: 0 });
    }, [isSolvedRejectCancelSelected]);

    const handleSubmit = () => {
        if (isRevertedAndPartner) {
            onSaveChanges?.(selected);
        }
        if (isPartner) return;
        if (selected.action === 0 && selected.status === data?.status) return;
        onSaveChanges?.({ ...selected, transaction_type: data.transaction_type, issue_type: data.issue_type });
    };

    const handleCancel = () => {
        if (isPartner) {
            onCancelTicket?.();
        }
    };

    const [anchorEl, setAnchorEl] = useState<Element | ((element: Element) => Element) | null | undefined>(null);
    const handleClick = (event: SyntheticEvent) => {
        setAnchorEl(event?.currentTarget);
    };

    useImperativeHandle(
        refTicketDetail,
        () => ({
            handleClose
        }),
        []
    );

    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <MainCard title="Ticket Handling" contentSX={{ paddingRight: 0, paddingBottom: `0px !important` }}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={8}>
                    <Grid container alignItems="center" spacing={2} justifyContent="space-between">
                        <Grid item>
                            <Stack direction="row" alignItems="center" spacing={2}>
                                <Highlighter
                                    highlightStyle={{ ...styles.ticket, fontWeight: 'bold' }}
                                    unhighlightStyle={styles.ticket}
                                    searchWords={['Ticket ID: ']}
                                    autoEscape
                                    textToHighlight={`Ticket ID: ${data?.ticket_id}`}
                                />

                                {isRevertedAndPartner ? (
                                    <FESelectDetail
                                        title="Status"
                                        data={statusData}
                                        status={data?.status}
                                        onDataSelect={(val) => setSelected({ ...selected, ...val })}
                                        disabled={isSolvedRejectCancel}
                                    />
                                ) : isPartner || isSolvedRejectCancel ? (
                                    <Highlighter
                                        highlightStyle={{ ...styles.ticket, fontWeight: 'bold' }}
                                        unhighlightStyle={{ ...styles.ticket, color: getColorAndNameStatus(data?.status).color }}
                                        searchWords={['Status: ']}
                                        autoEscape
                                        textToHighlight={`Status: ${_.get(lastStatusType, [data?.status])}`}
                                    />
                                ) : (
                                    <FESelectDetail
                                        title="Status"
                                        data={statusData}
                                        status={data?.status}
                                        onDataSelect={(val) => setSelected({ ...selected, ...val })}
                                        disabled={isSolvedRejectCancel}
                                    />
                                )}

                                {isPartner ? (
                                    <Highlighter
                                        highlightStyle={{ ...styles.ticket, fontWeight: 'bold' }}
                                        unhighlightStyle={styles.ticket}
                                        searchWords={['Action: ']}
                                        autoEscape
                                        textToHighlight={`Action: ${_.get(
                                            productTypeRightContractNumberType,
                                            [data?.product_type_of_right_contact],
                                            'N/A'
                                        )}`}
                                    />
                                ) : (
                                    <FESelectDetail
                                        status={selected.action}
                                        title="Action"
                                        data={actionTicketTypes}
                                        onDataSelect={(val) => setSelected({ ...selected, ...val })}
                                        disabled={isSolvedRejectCancel || isSolvedRejectCancelSelected}
                                    />
                                )}
                            </Stack>
                        </Grid>

                        <Grid item>
                            <Stack direction="row" alignItems="center" spacing={2}>
                                {isPartner && data?.status === 1 && (
                                    <Button
                                        variant="contained"
                                        sx={{ background: '#FF0015' }}
                                        onClick={handleCancel}
                                        disabled={isSolvedRejectCancel}
                                    >
                                        Cancel Ticket
                                    </Button>
                                )}
                                <Button variant="outlined" onClick={handleSubmit} disabled={isSolvedRejectCancel}>
                                    Save Changes
                                </Button>
                            </Stack>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} sx={{ marginY: 2 }}>
                        <Divider />
                    </Grid>

                    <Stack direction="row" justifyContent="space-between">
                        <div style={styles.flex}>
                            <Highlighter
                                highlightStyle={{ ...styles.ticket, fontWeight: 'bold' }}
                                unhighlightStyle={styles.ticket}
                                searchWords={['Ref Number: ']}
                                autoEscape
                                textToHighlight={`Ref Number: ${data?.ref_number}`}
                            />
                        </div>
                        <div style={styles.flex}>
                            <Highlighter
                                highlightStyle={{ ...styles.ticket, fontWeight: 'bold' }}
                                unhighlightStyle={styles.ticket}
                                searchWords={['Transaction Amount: ']}
                                autoEscape
                                textToHighlight={`Transaction Amount: ${numeral(data?.transaction_amount).format('0, 0')}`}
                            />
                        </div>
                    </Stack>

                    <Stack direction="row" sx={{ marginY: 2 }}>
                        <div style={styles.flex}>
                            <Highlighter
                                highlightStyle={{ ...styles.ticket, fontWeight: 'bold' }}
                                unhighlightStyle={styles.ticket}
                                searchWords={['Contract #: ']}
                                autoEscape
                                textToHighlight={`Contract #: ${data?.contract_number}`}
                            />
                        </div>
                        <div style={styles.flex}>
                            <Highlighter
                                highlightStyle={{ ...styles.ticket, fontWeight: 'bold' }}
                                unhighlightStyle={styles.ticket}
                                searchWords={['Product: ']}
                                autoEscape
                                textToHighlight={`Product: ${_.get(productTypes, [data?.product_type])}`}
                            />
                        </div>
                    </Stack>
                    <Stack direction="row" sx={{ marginY: 2 }}>
                        <div style={styles.flex}>
                            <Highlighter
                                highlightStyle={{ ...styles.ticket, fontWeight: 'bold' }}
                                unhighlightStyle={styles.ticket}
                                searchWords={['Right Contract #: ']}
                                autoEscape
                                textToHighlight={`Right Contract #: ${data?.right_contract_number}`}
                            />
                        </div>
                        <div style={styles.flex}>
                            <Highlighter
                                highlightStyle={{ ...styles.ticket, fontWeight: 'bold' }}
                                unhighlightStyle={styles.ticket}
                                searchWords={['Product of Right Contract: ']}
                                autoEscape
                                textToHighlight={`Product of Right Contract: ${_.get(
                                    productTypeRightContractNumberType,
                                    [data?.product_type_of_right_contact],
                                    'N/A'
                                )}`}
                            />
                        </div>
                    </Stack>
                    <Stack direction="row" sx={{ marginY: 2 }}>
                        <div style={styles.flex}>
                            <Highlighter
                                highlightStyle={{ ...styles.ticket, fontWeight: 'bold' }}
                                unhighlightStyle={styles.ticket}
                                searchWords={['National ID: ']}
                                autoEscape
                                textToHighlight={`National ID: ${data?.requester_national_id}`}
                            />
                        </div>
                        <div style={styles.flex}>
                            <Highlighter
                                highlightStyle={{ ...styles.ticket, fontWeight: 'bold' }}
                                unhighlightStyle={styles.ticket}
                                searchWords={['Phone Number: ']}
                                autoEscape
                                textToHighlight={`Phone Number: ${data?.requester_phone}`}
                            />
                        </div>
                    </Stack>

                    <Grid item xs={12} sx={{ marginY: 2 }}>
                        <Divider />
                    </Grid>

                    <FEDescriptionDetail data={data?.descriptions} ticketId={data?.id} disabled={isSolvedRejectCancel} />

                    <Grid item xs={12} sx={{ marginY: 2 }}>
                        <Divider />
                    </Grid>

                    <FEAttachmentsUpload ticketId={data?.id} disabled={isSolvedRejectCancel} />

                    <Grid item xs={12} sx={{ marginY: 2 }}>
                        <Divider />
                    </Grid>

                    <FEAttachmentsList data={data?.attachments} />
                </Grid>
                <Grid item xs={12} md={4}>
                    <Box sx={{ borderLeft: 1, borderTop: 1, borderTopLeftRadius: 16, borderColor: '#E5E5E5', height: '100%' }}>
                        <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                            style={{ height: 60, background: '#27AE60', borderTop: 1, borderTopLeftRadius: 14, padding: 16 }}
                        >
                            <Typography sx={{ color: 'white', fontWeight: 'bold' }}>Details</Typography>
                            {!isPartner && (
                                <Button
                                    disabled={isSolvedRejectCancel}
                                    variant="outlined"
                                    onClick={handleClick}
                                    sx={{ borderColor: '#fff' }}
                                >
                                    <IconUserPlus color={isSolvedRejectCancel ? '#333333' : 'white'} />
                                </Button>
                            )}
                            <Menu
                                id="menu-followers-card"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                                variant="selectedMenu"
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right'
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right'
                                }}
                            >
                                {isManager && (
                                    <MenuItem onClick={onClickAssignee} sx={{ color: '#008345', fontSize: 12, fontWeight: 'bold' }}>
                                        Assignee
                                    </MenuItem>
                                )}
                                <MenuItem onClick={onClickSupporter} sx={{ color: '#008345', fontSize: 12, fontWeight: 'bold' }}>
                                    Supporter
                                </MenuItem>
                            </Menu>
                        </Stack>
                        <Box sx={{ paddingX: 2 }}>
                            <FEItemDetail title="Partner" value={data?.partner ?? '-'} />
                            <Stack direction="row" justifyContent="space-between" sx={{ marginY: 3 }} spacing={2}>
                                <Typography sx={{ fontWeight: 'bold', color: '#4c4c4c' }}>Assignee:</Typography>
                                <Stack direction="column" spacing={1.5}>
                                    {_.map(data?.assignee, (it: any, i) => (
                                        <Typography key={i} sx={{ color: '#4c4c4c' }}>{`${it?.email}`}</Typography>
                                    ))}
                                </Stack>
                            </Stack>
                            <Stack direction="row" justifyContent="space-between" sx={{ marginY: 3 }} spacing={2}>
                                <Typography sx={{ fontWeight: 'bold', color: '#4c4c4c' }}>Supporter:</Typography>
                                <Stack direction="column" spacing={1.5}>
                                    {_.map(data?.supporter, (it: any, i) => (
                                        <Typography key={i} sx={{ color: '#4c4c4c' }}>{`${it?.email}`}</Typography>
                                    ))}
                                </Stack>
                            </Stack>

                            <FEItemDetail title="Transaction Type" value={_.get(transactionType, [data?.transaction_type])} />
                            <FEItemDetail title="Issue Type" value={_.get(issueType, [data?.issue_type])} />
                            <FEItemDetail title="Sub Issue Type" value={_.get(subIssueType, [data?.sub_issue_type])} />
                            <FEItemDetail title="Product Type" value={_.get(productTypes, [data?.product_type])} />
                            <FEItemDetail title="Requested by" value={_.get(requestedBy, [data?.requested_by])} />
                            <Typography sx={{ fontWeight: 'bold', color: '#27AE60' }}>Tracking:</Typography>
                            <FEItemDetail title="Created Date" value={moment(data?.created_at).format('DD/MM/YYYY - HH:mm A')} />
                            <FEItemDetail title="Updated Date" value={moment(data?.updated_at).format('DD/MM/YYYY - HH:mm A')} />
                            <FEItemDetail title="Solved Date" value={moment(data?.solved_date).format('DD/MM/YYYY - HH:mm A')} />
                            <Typography sx={{ fontWeight: 'bold', color: '#27AE60' }}>Activity Logs:</Typography>
                            <TasksCard data={data?.ticket_logs} />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default TicketDetail;

const styles = {
    ticket: {
        background: 'transparent',
        fontSize: 14,
        color: '#4C4C4C'
    },
    flex: {
        flex: 1
    }
};
