import React, { useState } from 'react';
import { FormControlLabel, Checkbox, IconButton, Menu, MenuItem } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { setStorage, StorageData } from '../../utils/controlChromeData';

type Props = {
    enableAdditionalArmors: boolean;
    additionalArmors: { armorName: string; enable: boolean }[];
    setData: React.Dispatch<React.SetStateAction<StorageData>>;
}

export default function SelectSpecialArmor({
    enableAdditionalArmors,
    additionalArmors,
    setData
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
                        checked={enableAdditionalArmors}
                        onChange={() => {
                            setData((prev) => {
                                const newData: StorageData = { ...prev };
                                newData.enableAdditionalArmors = !prev.enableAdditionalArmors;
                                setStorage("enableAdditionalArmors", !prev.enableAdditionalArmors);
                                return newData;
                            });
                        }}
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
                {additionalArmors.map((data, index) => (
                    <MenuItem key={index}>
                        <FormControlLabel
                            label={data.armorName}
                            control={
                                <Checkbox
                                    checked={data.enable}
                                    onChange={() => {
                                        setData((prev) => {
                                            const newData: StorageData = { ...prev };
                                            newData.additionalArmors[index].enable = !prev.additionalArmors[index].enable;
                                            setStorage("additionalArmors", newData.additionalArmors);
                                            return newData;
                                        });
                                    }}
                                />
                            }
                        />
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
};
