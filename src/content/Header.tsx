import { Box, Button } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';

// 編集ボタンがあるヘッダー
export default function Header({ openSettings }: { openSettings: () => void }) {
    return (
        <Box sx={{ p: 2 }} >
            <h6>機械技師パネル</h6>
            <div style={{ marginLeft: "auto" }} >
                <Button onClick={() => openSettings()}>
                    <EditIcon />
                </Button>
            </div>
        </Box>
    );
};
