import { IconButton, Modal, Paper, TextField, Theme, ThemeProvider } from "@mui/material";
import { StorageData } from "../../utils/controlChromeData";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { useContext } from "react";
import { DataContext } from "../DataProvider";
import NamesField from "./NamesField";


type Props = {
    theme: Theme;
    isOpen: boolean;
    closeModal: () => void;
};

export default function EditModal(props: Props){
    const { theme, isOpen, closeModal } = props;

    return (
        <Modal
            className="draggable-disable"
            open={isOpen}
            onClose={closeModal}
        >
            <ThemeProvider theme={theme}>
                <Paper
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)", // 中央に移動
                        p: 4, // パディング
                        minWidth: 300 // 必要に応じて
                    }}
                >
                    <NamesField/>
                </Paper>
            </ThemeProvider>
        </Modal>
    );
}
