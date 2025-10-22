import { Box } from "@mui/material";
import EnergyBladePanel from "./EnergyBladePanel";
import EnergyShieldPanel from "./EnergyShieldPanel";
import OverloadPanel from "./OverloadPanel";
import SelectPowerArmor from "../SelectPowerArmor";
import { DataContext } from "../DataProvider";
import { useContext } from "react";
import SustainEnergyButton from "../SustainEnergyButton";

export default function SkillsPanel({ref}: {ref?: React.Ref<HTMLDivElement>}) {
    const { data } = useContext(DataContext);

    return(
        <Box
            ref={ref}
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1
            }}
        >
            <Box sx={{ gap: 3, display: "flex", justifyContent: "center", alignItems: "center"}}>
                <SelectPowerArmor
                    powerArmorNames={data.powerArmors.map(armor => armor.armorName)}
                />
                <SustainEnergyButton/>
            </Box>
            <OverloadPanel/>
            <EnergyShieldPanel/>
            <EnergyBladePanel/>
            {/* TODO: 瞬間増幅の実装 */}
            {/* TODO: サポート(オプション)の実装 */}
        </Box>
    )
}
