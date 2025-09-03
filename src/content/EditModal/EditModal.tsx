import { Modal, Paper } from "@mui/material";
import { StorageData } from "../../utils/controlChromeData";

type Props = {
    isOpen: boolean;
    closeModal: () => void;
    data: StorageData;
};

export default function EditModal(props: Props){
    const { isOpen, closeModal, data } = props;

    return (
        <Modal
            className="draggable-disable"
            open={isOpen}
            onClose={closeModal}
        >
            <Paper
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)", // 中央に移動
                    p: 4, // パディング
                    minWidth: 300, // 必要に応じて
                }}
            >
            </Paper>
        </Modal>
    );
}