import { Box, IconButton, Tab, Tabs } from "@mui/material";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import EditIcon from '@mui/icons-material/Edit';
import { useContext } from "react";
import { DataContext } from "./DataProvider";

type Props = {
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

// 編集ボタンがあるヘッダー
export default function Header(props: Props){
    const { setIsModalOpen } = props;
    const {
        tabIndex,
        setTabIndex,
        data
    } = useContext(DataContext);

    return (
        <Box sx={{boxShadow: 4}}>
            <Box
                sx={{
                    height: "48px",
                    px: 3,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}
            >
                <div style={{ fontSize: "0.9rem", fontWeight: "bold" }}>機械技師パネル</div>
                <IconButton
                    className="draggable-disable"
                    color="primary"
                    onClick={() => setIsModalOpen(true)}
                >
                    <EditIcon/>
                </IconButton>
            </Box>
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
                    <Tab label="ダメージ計算"/>
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
        </Box>
    );
};
