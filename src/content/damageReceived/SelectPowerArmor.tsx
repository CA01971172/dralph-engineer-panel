import React, { useContext, useState } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { DataContext } from '../DataProvider';

export default function SelectPowerArmor({
    powerArmorNames,
    fullWidth
}: {
    powerArmorNames: string[],
    fullWidth?: true

}){
    const {
        armorIndex,
        setArmorIndex
    } = useContext(DataContext);

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    function handleClick(event: React.MouseEvent<HTMLButtonElement>){
        setAnchorEl(event.currentTarget);
    };

    function handleClose(){
        setAnchorEl(null);
    };

    return (
        <span
            className="draggable-disable"
            style={{ width: fullWidth ? "100%" : undefined }}
        >
            <Button
                onClick={handleClick}
                style={{ width: fullWidth ? "100%" : undefined }}
            >
                <span
                    style={{
                        width: fullWidth ? "100%" : "10rem",
                        overflow:"hidden",
                        textOverflow: "ellipsis",
                        textWrap: "nowrap",
                        textAlign: "center"
                    }}
                >
                    {powerArmorNames[armorIndex] || ""}
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
