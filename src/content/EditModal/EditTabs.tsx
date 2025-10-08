import { useContext } from "react";
import { DataContext } from "../DataProvider";
import { Box, IconButton, Tab, Tabs } from "@mui/material";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

export default function EditTabs(){
    const {
        editTabIndex,
        setEditTabIndex,
        data
    } = useContext(DataContext);

    return (
        <Box
            className="draggable-disable"
            display="flex"
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
            gap={2}
        >
            <IconButton
                color="primary"
                disabled={editTabIndex === 0}
                onClick={() => {
                    if(editTabIndex > 0) setEditTabIndex(prev => prev - 1);
                }}
            >
                <KeyboardArrowLeftIcon/>
            </IconButton>
            <Tabs
                style={{flexGrow: 1}}
                value={editTabIndex}
                onChange={(_, newValue) => setEditTabIndex(newValue)}
            >
                <Tab label="基本情報"/>
                {(data.powerArmors || []).map((armor, index) => (
                    <Tab
                        key={index}
                        label={armor.armorName || `アーマー${index + 1}`}
                    />
                ))}
            </Tabs>
            <IconButton
                color="primary"
                disabled={editTabIndex === (data.powerArmors || []).length}
                onClick={() => {
                    if(editTabIndex < (data.powerArmors || []).length) setEditTabIndex(prev => prev + 1);
                }}
            >
                <KeyboardArrowRightIcon/>
            </IconButton>
        </Box>
    )
}
