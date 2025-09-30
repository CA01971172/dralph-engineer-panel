import { Box } from "@mui/material";
import { ReactNode } from "react";

type Props = {
    input?: ReactNode;
    button?: ReactNode;
    checkbox?: ReactNode;
};

export default function ModuleRow({ input, button, checkbox }: Props) {
    return (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: "1fr auto auto", // 左=可変幅, 中央=自動, 右=自動
                alignItems: "center",
                gap: 2,
            }}
        >
            <Box>{input}</Box>
            <Box sx={{ display: "flex", justifyContent: "center" }}>{button}</Box>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>{checkbox}</Box>
        </Box>
    );
}
