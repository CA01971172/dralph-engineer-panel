import { Box, Modal, Paper, Theme, ThemeProvider } from "@mui/material";
import NamesField from "./NamesField";
import EditHeader from "./EditHeader";

type Props = {
    theme: Theme;
    isOpen: boolean;
    closeModal: () => void;
};

export default function EditModal(props: Props){
    const { theme, isOpen, closeModal } = props;

    return (
        <Modal
            open={isOpen}
            onClose={closeModal}
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                py: 4, // 上下32px（spacing基準で管理）
            }}
        >
            <ThemeProvider theme={theme}>
                <Paper
                    elevation={4}
                    sx={{
                        borderRadius: 1,
                        width: 600,
                        height: "100%", // 100vh から py の余白分を除いた残り
                        boxSizing: "border-box",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <Paper elevation={4} sx={{ backgroundColor: "#212121" }}>
                        <EditHeader />
                    </Paper>
                    <Box sx={{ p: 3, flex: 1 }}>
                        <NamesField />
                    </Box>
                </Paper>
            </ThemeProvider>
        </Modal>
    );
}
