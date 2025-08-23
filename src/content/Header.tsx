import { IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import EditModal from "./EditModal/EditModal";

type Props = {
    isModalOpen: boolean;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

// 編集ボタンがあるヘッダー
export default function Header(props: Props){
    const { isModalOpen, setIsModalOpen } = props;

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
            <EditModal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)}/>
        </>
    );
};