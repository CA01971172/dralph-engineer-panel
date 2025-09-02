import React, { useState } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

type Props = {
    partsNames: string[];
    partsIndex: number;
    setPartsIndex:  (value: React.SetStateAction<number>) => void
}

export default function SelectParts(props: Props){
    const { partsNames, partsIndex, setPartsIndex } = props;

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    function handleClick(event: React.MouseEvent<HTMLButtonElement>){
        setAnchorEl(event.currentTarget);
    };

    function handleClose(){
        setAnchorEl(null);
    };

    return (
        <div
            className="draggable-disable"
        >
            <Button
                onClick={handleClick}
            >
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
        </div>
    );
};
