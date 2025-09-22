import { Box } from "@mui/material";

export default function EditHeader(){
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
            <div>パワーアーマー編集</div>
        </Box>
    );
}
