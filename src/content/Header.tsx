import { Box, IconButton, Paper, Tab, Tabs } from "@mui/material";
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
            <Tabs
                value={tabIndex}
                onChange={(_, newValue) => setTabIndex(newValue)}
                variant="scrollable"
                scrollButtons="auto"
            >
                <Tab label="ダメージ計算"/>
                {(data.powerArmors || []).map((armor, index) => (
                    <Tab
                        key={index}
                        label={armor.armorName || `アーマー${index + 1}`}
                    />
                ))}
            </Tabs>
        </Box>
    );
};
