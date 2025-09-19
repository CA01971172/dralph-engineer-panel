import React, { useContext, useState } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import partsNames from '../../constants';
import { DataContext } from '../DataProvider';

export default function SelectParts(){
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const {
        partsIndex,
        setPartsIndex
    } = useContext(DataContext);

    function handleClick(event: React.MouseEvent<HTMLButtonElement>){
        setAnchorEl(event.currentTarget);
    };

    function handleClose(){
        setAnchorEl(null);
    };

    return (
        <span className="draggable-disable">
            <Button onClick={handleClick}>
                <span
                    style={{
                        width: "3rem",
                        overflow:"hidden",
                        textOverflow: "ellipsis",
                        textWrap: "nowrap"
                    }}
                >
                    {partsNames[partsIndex]}
                </span>
                <ArrowDropDownIcon/>
            </Button>
            <Menu
                className="draggable-disable"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                sx={{
                    '& .MuiPaper-root': {
                        color: "#fff",
                        backgroundColor: "rgba(44, 44, 44, 0.87)"
                    }
                }}
            >
                {partsNames.map((partsName, index) => (
                    <MenuItem
                        key={index}
                        onClick={() => {
                            setPartsIndex(index);
                            handleClose();
                        }}
                    >
                        {partsName}
                    </MenuItem>
                ))}
            </Menu>
        </span>
    );
};
