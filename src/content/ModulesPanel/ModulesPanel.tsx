import { Box } from "@mui/material";
import EnergyBladePanel from "./EnergyBladePanel";
import EnergyShieldPanel from "./EnergyShieldPanel";

export default function ModulesPanel({armorIndex}: {armorIndex: number}){
    return(
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: "auto auto auto", // 入力 / ボタン / チェック
                columnGap: 2,
                rowGap: 1,
                alignItems: "center"
            }}
        >
            <EnergyShieldPanel armorIndex={armorIndex}/>
            <EnergyBladePanel armorIndex={armorIndex}/>
        </Box>
    )
}
