import { Box, Button, Divider, Grid, Stack, Typography } from '@mui/material';
import Highlighter from 'react-highlight-words';
import { useParams } from 'react-router-dom';
import MainCard from 'ui-component/cards/MainCard';
import FECommentDetail from './FECommentDetail';
import FEDescriptionDetail from './FEDescriptionDetail';
import FEItemDetail from './FEItemDetail';
import FESelectDetail from './FESelectDetail';
import TasksCard from './TasksCard';

const TicketDetail = () => {
    const { ticketID } = useParams();
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
                            textToHighlight={`Ticket ID: ${123456}`}
                        />
                        <FESelectDetail title="Status" />
                        <FESelectDetail title="Action" />
                        <Button variant="contained">Save Changes</Button>
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
                                textToHighlight={`Ref Number: ${123456}`}
                            />
                        </div>
                        <div style={styles.flex}>
                            <Highlighter
                                highlightStyle={{ ...styles.ticket, fontWeight: 'bold' }}
                                unhighlightStyle={styles.ticket}
                                searchWords={['Transaction Amount: ']}
                                autoEscape
                                textToHighlight={`Transaction Amount: ${123456}`}
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
                                textToHighlight={`Contract #: ${123456}`}
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
                                textToHighlight={`Right Contract #: ${123456}`}
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
                                textToHighlight={`National ID: ${123456}`}
                            />
                        </div>
                        <div style={styles.flex}>
                            <Highlighter
                                highlightStyle={{ ...styles.ticket, fontWeight: 'bold' }}
                                unhighlightStyle={styles.ticket}
                                searchWords={['Phone Number: ']}
                                autoEscape
                                textToHighlight={`Phone Number: ${123456}`}
                            />
                        </div>
                    </Stack>

                    <Grid item xs={12} sx={{ marginY: 2 }}>
                        <Divider />
                    </Grid>

                    <FEDescriptionDetail />

                    <Grid item xs={12} sx={{ marginY: 2 }}>
                        <Divider />
                    </Grid>

                    {/* <FECommentDetail /> */}
                </Grid>
                <Grid item xs={12} md={4}>
                    <Box sx={{ borderLeft: 1, borderTop: 1, borderTopLeftRadius: 16, borderColor: '#E5E5E5' }}>
                        <Box style={{ height: 60, background: '#27AE60', borderTop: 1, borderTopLeftRadius: 14, padding: 16 }}>
                            <Typography sx={{ color: 'white' }}>Detail</Typography>
                        </Box>
                        <Box sx={{ paddingX: 2 }}>
                            <FEItemDetail title="Partner" value="Smartnet" />
                            <FEItemDetail title="Assignee" value="Nguyen Thi Thu Truc" />
                            <FEItemDetail title="Supporter" value="User Internal" />
                            <FEItemDetail title="Transaction Type" value="Repayment" />
                            <FEItemDetail title="Issue Type" value="Adjust Contract Number" />
                            <FEItemDetail title="Sub Issue Type" value="from Loan to Card" />
                            <FEItemDetail title="Product Type" value="Loan" />
                            <FEItemDetail title="Requested by" value="Luong Ngoc Tuan Anh" />
                            <Typography sx={{ fontWeight: 'bold', color: '#27AE60' }}>Tracking:</Typography>
                            <FEItemDetail title="Created Date" value="12/03/2022 - 8:35" />
                            <FEItemDetail title="Updated Date" value="12/03/2022 - 8:35" />
                            <FEItemDetail title="Solved Date" value="-" />
                            <Typography sx={{ fontWeight: 'bold', color: '#27AE60' }}>Activity Logs:</Typography>
                            <TasksCard />
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
