import { Box, Button, IconButton } from "@mui/material";
import { useContext } from "react";
import { DataContext } from "../DataProvider";
import CloseIcon from '@mui/icons-material/Close';

export default function EditHeader({closeModal}: {closeModal: () => void}){
    const { saveData } = useContext(DataContext);

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "space-between",
                px: 3,
                height: 64
            }}
        >
            <Box>パワーアーマー編集</Box>
            <Box>
                <Button
                    onClick={() => {
                        saveData();
                        alert("パワーアーマーのデータを保存しました。");
                    }}
                >保存</Button>
                <IconButton
                    color="primary"
                    onClick={closeModal}
                >
                    <CloseIcon/>
                </IconButton>
            </Box>
        </Box>
    );
}
