import { Box } from "@mui/material";
import SelectPowerArmor from "../DamageReceived/SelectPowerArmor";
import { DataContext } from "../DataProvider";
import { useContext } from "react";
import DeployableModulePanel from "./DeployableModulePanel";

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
            <Box sx={{ px: 3 }}>
                <SelectPowerArmor
                    powerArmorNames={data.powerArmors.map(armor => armor.armorName)}
                    fullWidth={true}
                />
            </Box>
            {
                data.powerArmors[armorIndex]
                    .modules.filter(module => module.isEquipped)
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
