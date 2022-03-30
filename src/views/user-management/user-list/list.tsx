import { IconButton, Menu, MenuItem } from '@mui/material';
import { IconDotsVertical } from '@tabler/icons';
import FETable from 'components/table/FETable';
import { getColorAndNameStatusUser } from 'constants/users';
import { camelCase, startCase } from 'lodash';
import React, { SyntheticEvent, useState } from 'react';
// project imports
import MainCard from 'ui-component/cards/MainCard';

const UserList = ({ data = [], loading, cols = [], onClickRowItem, onEdit, onDelete }) => {
    const [anchorEl, setAnchorEl] = useState<Element | ((element: Element) => Element) | null | undefined>(null);
    const [item, setItem] = useState(null);
    const handleClick = (event: SyntheticEvent, row: any) => {
        setItem(row);
        event.stopPropagation();
        setAnchorEl(event?.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const productsColumns = React.useMemo(
        () =>
            cols[0]
                ? cols.map((key: any) => {
                      if (key === 'action') {
                          return {
                              Header: startCase(camelCase(key)),
                              accessor: key,
                              Cell: ({ row }) => (
                                  <IconButton onClick={(e) => handleClick(e, row)}>
                                      <IconDotsVertical />
                                  </IconButton>
                              ),
                              Filter: ''
                          };
                      }
                      const isDateType = ['created_date'].includes(key);
                      const isStatus = ['status'].includes(key);

                      return {
                          Header: startCase(camelCase(key)),
                          accessor: key,
                          Cell: ({ value }) => (
                              <div
                                  style={{
                                      maxHeight: 65,
                                      overflow: 'hidden',
                                      color: isStatus ? getColorAndNameStatusUser(value).color : 'black'
                                  }}
                              >
                                  {isDateType
                                      ? moment(value).format('DD/MM/YYYY hh:mm A')
                                      : isStatus
                                      ? getColorAndNameStatusUser(value).name
                                      : value}
                              </div>
                          ),
                          Filter: ''
                      };
                  })
                : [],
        [cols]
    );

    const productsData = React.useMemo(() => [...data], [data]);

    return (
        <MainCard content={false} border={false}>
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
                <MenuItem
                    onClick={() => {
                        onEdit(item);
                        handleClose();
                    }}
                    sx={{ color: '#27AE60', fontSize: 12, fontWeight: 500 }}
                >
                    Edit
                </MenuItem>
                <MenuItem onClick={handleClose} sx={{ color: '#808080', fontSize: 12, fontWeight: 500 }}>
                    View
                </MenuItem>
                <MenuItem onClick={handleClose} sx={{ color: '#FF0015', fontSize: 12, fontWeight: 500 }}>
                    Delete
                </MenuItem>
            </Menu>
            {loading ? (
                <div>loading...</div>
            ) : (
                <FETable rowId="ID" onClickRowItem={onClickRowItem} data={productsData} columns={productsColumns} />
            )}
        </MainCard>
    );
};

export default UserList;
