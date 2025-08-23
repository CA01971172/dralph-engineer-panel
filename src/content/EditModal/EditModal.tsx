import { Modal, Paper } from "@mui/material";

type Props = {
    isOpen: boolean;
    closeModal: () => void;
};

export default function EditModal(props: Props){
    const { isOpen, closeModal } = props;

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
            >hoge</Paper>
        </Modal>
    );
}