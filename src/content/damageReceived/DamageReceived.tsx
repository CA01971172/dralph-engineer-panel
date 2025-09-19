import { useContext, useState } from "react";
import DefenseLevelSlider from "./DefenseLevelSlider";
import SelectParts from "./SelectParts";
import CalculateDamage from "./CalculateDamage";
import { Box, Grid } from "@mui/material";
import CheckBoxLabel from "../../ui/CheckBoxLabel";
import NumberFieldLabel from "../../ui/NumberFieldLabel";
import SelectAdditionalArmors from "./SelectAdditionalArmors";
import SelectPowerArmor from "./SelectPowerArmor";
import { DataContext } from "../DataProvider";

export default function DamageReceived(){
    const {
        enableOverload,
        setEnableOverload,
        shieldEnergy,
        setShieldEnergy,
        data,
        additionalDefense,
        setAdditionalDefense,
        enableEmergencyShield,
        setEnableEmergencyShield,
        enableBarrierHorn,
        setEnableBarrierHorn
    } = useContext(DataContext);

    return (
        <div style={{ width: "100%" }}>
            <Box sx={{ gap: 3, display: "flex", justifyContent: "center", alignItems: "center"}}>
                <SelectPowerArmor
                    powerArmorNames={data.powerArmors.map(armor => armor.armorName)}
                />
                <SelectParts/>
            </Box>
            <Box sx={{ gap: 3, display: "flex", justifyContent: "center", alignItems: "center"}}>
                <CalculateDamage
                    enableEnergyShield={true}
                />
                <CalculateDamage
                    enableEnergyShield={false}
                />
            </Box>
            <Grid container spacing={1} sx={{ml: 1, mr: 1}}>
                <Grid size={6}>
                    <CheckBoxLabel
                        label="オーバーロード"
                        isChecked={enableOverload}
                        setIsChecked={setEnableOverload}
                    />
                </Grid>
                <Grid size={6}>
                    <NumberFieldLabel
                        label="シールドEN"
                        additionalLabel=""
                        value={shieldEnergy}
                        setValue={setShieldEnergy}
                        min={0}
                        max={999}
                    />
                </Grid>
            </Grid>
            <Box sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                <DefenseLevelSlider/>
            </Box>
            <Grid container spacing={1} sx={{ml: 1, mr: 1}}>
                <Grid size={6}>
                    <CheckBoxLabel
                        label="バリアホーン"
                        isChecked={enableBarrierHorn}
                        setIsChecked={setEnableBarrierHorn}
                    />
                </Grid>
                <Grid size={6}>
                    <NumberFieldLabel
                        label="その他倍率"
                        additionalLabel="%"
                        value={additionalDefense}
                        setValue={setAdditionalDefense}
                        min={0}
                        max={999}
                    />
                </Grid>
                <Grid size={6}>
                    <CheckBoxLabel
                        label="緊急シールド"
                        isChecked={enableEmergencyShield}
                        setIsChecked={setEnableEmergencyShield}
                    />
                </Grid>
                <Grid size={6}>
                    <SelectAdditionalArmors/>
                </Grid>
            </Grid>
        </div>
    );
};
