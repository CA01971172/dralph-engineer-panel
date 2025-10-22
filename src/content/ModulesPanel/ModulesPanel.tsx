import { Box } from "@mui/material";
import SelectPowerArmor from "../SelectPowerArmor";
import { DataContext } from "../DataProvider";
import { useContext } from "react";
import DeployableModulePanel from "./DeployableModulePanel";
import SustainEnergyButton from "../SustainEnergyButton";

const deployableModules: string[] = [
    "バリアホーン",
    "オプション",
    "オートバレルスタンド"
]

export default function ModulesPanel({ref}: {ref?: React.Ref<HTMLDivElement>}) {
    const {
        data,
        armorIndex
    } = useContext(DataContext);

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
            {
                data.powerArmors[armorIndex]
                    .modules.filter(module => (module.isEquipped && deployableModules.includes(module.name)))
                    .map((module, index) => (
                        <DeployableModulePanel
                            key={index}
                            module={module}
                        />
                ))
            }
        </Box>
    )
}
