import { Box, Button, Divider, Grid, Stack, Typography } from '@mui/material';
import { issueType, productTypes, requestedBy, subIssueType, transactionType } from 'constants/tickets';
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
}
const TicketDetail = ({ data }: Props) => {
    return (
        <MainCard title="Ticket Handling" contentSX={{ paddingRight: 0, paddingBottom: `0px !important` }}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={8}>
                    <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
                        <Highlighter
                            highlightStyle={{ ...styles.ticket, fontWeight: 'bold' }}
                            unhighlightStyle={styles.ticket}
                            searchWords={['Ticket ID: ']}
                            autoEscape
                            textToHighlight={`Ticket ID: ${data?.id}`}
                        />
                        <FESelectDetail title="Status" />
                        <FESelectDetail title="Action" />
                        <Button variant="contained" sx={{ background: '#27AE60' }}>
                            Save Changes
                        </Button>
                    </Stack>

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
                                textToHighlight={`Transaction Amount: ${data?.transaction_amount}`}
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
                                textToHighlight={`Product of Right Contract: ${'Card'}`}
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
                        <Box style={{ height: 60, background: '#27AE60', borderTop: 1, borderTopLeftRadius: 14, padding: 16 }}>
                            <Typography sx={{ color: 'white' }}>Detail</Typography>
                        </Box>
                        <Box sx={{ paddingX: 2 }}>
                            <FEItemDetail title="Partner" value={data?.partner} />
                            <FEItemDetail title="Assignee" value={data?.assignee} />
                            <FEItemDetail title="Supporter" value={data?.supporter} />
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
