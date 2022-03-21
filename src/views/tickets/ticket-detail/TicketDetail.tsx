import { Box, Button, Divider, Grid, IconButton, Menu, MenuItem, Stack, Typography } from '@mui/material';
import { IconUserPlus } from '@tabler/icons';
import { ROLE } from 'constants/auth';
import {
    actionTicketTypes,
    issueType,
    lastStatusType,
    productTypeRightContractNumberType,
    productTypes,
    requestedBy,
    subIssueType,
    transactionType
} from 'constants/tickets';
import useAuth from 'hooks/useAuth';
import { createRef, SyntheticEvent, useImperativeHandle, useState } from 'react';
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
}

export const refTicketDetail = createRef<{ handleClose: () => void }>();
const TicketDetail = ({ data, onSaveChanges, onClickAssignee, onClickSupporter }: Props) => {
    const { user } = useAuth();
    const isPartner = user?.role === ROLE.PARTNER;
    const isManager = [ROLE.SUPER_ADMIN, ROLE.CARD_MANAGER, ROLE.LOAN_MANAGER].includes(user?.role as any);

    const statusData = !isPartner ? _.omit(lastStatusType, ['0']) : lastStatusType;
    const [selected, setSelected] = useState<any>({ action: 0 });

    const handleSubmit = () => {
        if (isPartner) return;
        if (selected.action === 0 && selected.status === data.status) return;
        onSaveChanges?.({ ...selected, transaction_type: data.transaction_type, issue_type: data.issue_type });
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
                                    textToHighlight={`Ticket ID: ${data?.id}`}
                                />

                                {isPartner ? (
                                    <Highlighter
                                        highlightStyle={{ ...styles.ticket, fontWeight: 'bold' }}
                                        unhighlightStyle={styles.ticket}
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
                                        title="Action"
                                        data={actionTicketTypes}
                                        onDataSelect={(val) => setSelected({ ...selected, ...val })}
                                    />
                                )}
                            </Stack>
                        </Grid>

                        <Grid item>
                            <Stack direction="row" alignItems="center" spacing={2}>
                                {isPartner && (
                                    <Button variant="contained" sx={{ background: '#FF0015' }} onClick={() => {}}>
                                        Cancel Ticket
                                    </Button>
                                )}
                                <Button variant="outlined" onClick={handleSubmit}>
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
                                textToHighlight={`Product: ${'Card'}`}
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

                    <FEDescriptionDetail data={data?.descriptions} ticketId={data?.id} />

                    <Grid item xs={12} sx={{ marginY: 2 }}>
                        <Divider />
                    </Grid>

                    <FEAttachmentsUpload ticketId={data?.id} />

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
                            <Typography sx={{ color: 'white' }}>Detail</Typography>
                            {!isPartner && (
                                <IconButton onClick={handleClick}>
                                    <IconUserPlus color="white" />
                                </IconButton>
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
                            <FEItemDetail title="Assignee" value={data?.assignee ?? '-'} />
                            <FEItemDetail title="Supporter" value={data?.supporter ?? '-'} />
                            <FEItemDetail title="Transaction Type" value={_.get(transactionType, [data?.transaction_type])} />
                            <FEItemDetail title="Issue Type" value={_.get(issueType, [data?.issue_type])} />
                            <FEItemDetail title="Sub Issue Type" value={_.get(subIssueType, [data?.sub_issue_type])} />
                            <FEItemDetail title="Product Type" value={_.get(productTypes, [data?.issue_type])} />
                            <FEItemDetail title="Requested by" value={_.get(requestedBy, [data?.issue_type])} />
                            <Typography sx={{ fontWeight: 'bold', color: '#27AE60' }}>Tracking:</Typography>
                            <FEItemDetail title="Created Date" value={moment(data?.created_at).format('DD/MM/YYYY - HH:mm')} />
                            <FEItemDetail title="Updated Date" value={moment(data?.updated_at).format('DD/MM/YYYY - HH:mm')} />
                            <FEItemDetail title="Solved Date" value="-" />
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
