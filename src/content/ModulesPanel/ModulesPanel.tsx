import { Box } from "@mui/material";
import EnergyBladePanel from "./EnergyBladePanel";
import EnergyShieldPanel from "./EnergyShieldPanel";
import OverloadPanel from "./OverloadPanel";

export default function ModulesPanel({armorIndex}: {armorIndex: number}){
    return(
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1
            }}
        >
            <OverloadPanel/>
            <EnergyShieldPanel armorIndex={armorIndex}/>
            <EnergyBladePanel armorIndex={armorIndex}/>
        </Box>
    )
}
