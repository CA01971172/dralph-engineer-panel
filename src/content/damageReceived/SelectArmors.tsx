import React, { useState } from 'react';
import { FormControlLabel, Checkbox, IconButton, Menu, MenuItem } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

type Props = {
    enableArmor: boolean;
    setEnableArmor: React.Dispatch<React.SetStateAction<boolean>>;
    armors: { armorName: string; enable: boolean }[];
    setArmors: React.Dispatch<React.SetStateAction<{ armorName: string; enable: boolean }[]>>;
}

export default function SelectSpecialArmor({
    enableArmor,
    setEnableArmor,
    armors,
    setArmors
}: Props){
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    function handleClick(event: React.MouseEvent<HTMLButtonElement>){
        setAnchorEl(event.currentTarget);
    };

    function handleClose(){
        setAnchorEl(null);
    };

    return (
        <div>
            <FormControlLabel
                className="draggable-disable"
                style={{marginRight: 0}}
                label={
                    <div style={{display: "flex", marginRight: 0}}>
                        <span
                            style={{
                                alignItems: "center",
                                display: "flex",
                                maxWidth: "6rem",
                                overflow:"hidden",
                                textOverflow: "ellipsis",
                                textWrap: "nowrap",
                                userSelect: "none", marginRight: 0
                            }}
                        >
                            装甲類
                        </span>
                        <IconButton onClick={handleClick} color="inherit">
                            <ArrowDropDownIcon/>
                        </IconButton>
                    </div>
                }
                control={
                    <Checkbox
                        checked={enableArmor}
                        onChange={() => setEnableArmor((prev) => !prev)}
                    />
                }
            />
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
                {armors.map((data, index) => (
                    <MenuItem key={index}>
                        <FormControlLabel
                            label={data.armorName}
                            control={
                                <Checkbox
                                    checked={data.enable}
                                    onChange={() => setArmors((prev) => {
                                        const newData = [...prev];
                                        newData[index].enable = !newData[index].enable;
                                        return newData;
                                    })}
                                />
                            }
                        />
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
};
