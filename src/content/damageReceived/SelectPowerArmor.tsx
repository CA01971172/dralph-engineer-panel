import React, { useState } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

type Props = {
    powerArmorNames: string[];
    selectedPowerArmor: number;
    setArmorIndex:  (value: React.SetStateAction<number>) => void
}

export default function SelectPowerArmor(props: Props){
    const {
        powerArmorNames,
        selectedPowerArmor,
        setArmorIndex
    } = props;

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

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
                        width: "10rem",
                        overflow:"hidden",
                        textOverflow: "ellipsis",
                        textWrap: "nowrap",
                        textAlign: "center"
                    }}
                >
                    {powerArmorNames[selectedPowerArmor] || ""}
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
                {powerArmorNames.map((name, index) => (
                    <MenuItem
                        key={index}
                        onClick={() => {
                            setArmorIndex(index);
                            handleClose();
                        }}
                    >
                        <span style={{minHeight: "1rem"}}>{name}</span>
                    </MenuItem>
                ))}
            </Menu>
        </span>
    );
};
