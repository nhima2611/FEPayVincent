import { IconButton, Menu, MenuItem } from '@mui/material';
import { IconDotsVertical } from '@tabler/icons';
import FETable from 'components/FETable';
import { camelCase, startCase } from 'lodash';
import React, { SyntheticEvent, useState } from 'react';
// project imports
import MainCard from 'ui-component/cards/MainCard';

const PosList = ({ data = [], loading, cols = [], onClickRowItem }) => {
    const [anchorEl, setAnchorEl] = useState<Element | ((element: Element) => Element) | null | undefined>(null);
    const handleClick = (event: SyntheticEvent) => {
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
                              Cell: ({ value }) => (
                                  <IconButton onClick={handleClick}>
                                      <IconDotsVertical />
                                  </IconButton>
                              ),
                              Filter: ''
                          };
                      }
                      return {
                          Header: startCase(camelCase(key)),
                          accessor: key,
                          Cell: ({ value }) => (
                              <div
                                  style={{
                                      maxHeight: 40,
                                      overflow: 'hidden'
                                  }}
                              >
                                  {value}
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
                <MenuItem onClick={handleClose} sx={{ color: '#27AE60', fontSize: 12, fontWeight: 500 }}>
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

export default PosList;
