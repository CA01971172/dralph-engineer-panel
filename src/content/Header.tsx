import { IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';

// 編集ボタンがあるヘッダー
export default function Header({ openSettings }: { openSettings: () => void }) {
    return (
        <div
            style={{
                height: "48px",
                padding: "0 24px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
            }}
        >
            <div style={{ fontSize: "0.9rem", fontWeight: "bold" }}>機械技師パネル</div>
            <IconButton
                className="draggable-disable"
                color="primary"
                onClick={() => openSettings()}
            >
                <EditIcon/>
            </IconButton>
        </div>
    );
};