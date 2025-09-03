import { IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';

type Props = {
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

// 編集ボタンがあるヘッダー
export default function Header(props: Props){
    const { setIsModalOpen } = props;

    return (
        <>
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
                    onClick={() => setIsModalOpen(true)}
                >
                    <EditIcon/>
                </IconButton>
            </div>
        </>
    );
};