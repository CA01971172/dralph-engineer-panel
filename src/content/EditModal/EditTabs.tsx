import { useContext } from "react";
import { DataContext } from "../DataProvider";
import { Box, IconButton, Tab, Tabs } from "@mui/material";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

export default function EditTabs(){
    const {
        tabIndex,
        setTabIndex,
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
                disabled={tabIndex === 0}
                onClick={() => {
                    if(tabIndex > 0) setTabIndex(prev => prev - 1);
                }}
            >
                <KeyboardArrowLeftIcon/>
            </IconButton>
            <Tabs
                style={{flexGrow: 1}}
                value={tabIndex}
                onChange={(_, newValue) => setTabIndex(newValue)}
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
                disabled={tabIndex === (data.powerArmors || []).length}
                onClick={() => {
                    if(tabIndex < (data.powerArmors || []).length) setTabIndex(prev => prev + 1);
                }}
            >
                <KeyboardArrowRightIcon/>
            </IconButton>
        </Box>
    )
}
