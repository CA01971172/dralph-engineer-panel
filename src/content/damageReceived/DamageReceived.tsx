import { useContext, useState } from "react";
import DefenseLevelSlider from "./DefenseLevelSlider";
import SelectParts from "./SelectParts";
import CalculateDamage from "./CalculateDamage";
import { Box, Collapse, Grid, IconButton, styled } from "@mui/material";
import CheckBoxLabel from "../../ui/CheckBoxLabel";
import NumberFieldLabel from "../../ui/NumberFieldLabel";
import SelectAdditionalArmors from "./SelectAdditionalArmors";
import SelectPowerArmor from "../SelectPowerArmor";
import { DataContext, PowerArmorStates } from "../DataProvider";
import RollShield from "./RollShield";
import CalculateDeployableDamage from "./CalculateDeployableDamage";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

// 回転するアイコンボタン
const RotateIconButton = styled((props: any) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }: { theme?: any; expand: boolean }) => ({
    transform: expand ? "rotate(90deg)" : "rotate(0deg)",
    // marginLeft: "auto",
    transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
    })
}));

export default function DamageReceived({
    visibleOptionalItems,
    setVisibleOptionalItems,
    ref
}: {
    visibleOptionalItems: boolean
    setVisibleOptionalItems: React.Dispatch<React.SetStateAction<boolean>>
    ref?: React.Ref<HTMLDivElement>
}) {
    const {
        enableOverload,
        setEnableOverload,
        data,
        setData,
        additionalDefense,
        setAdditionalDefense,
        enableEmergencyShield,
        setEnableEmergencyShield,
        enableBarrierHorn,
        setEnableBarrierHorn,
        armorIndex
    } = useContext(DataContext);

    // 選択中のアーマーのエナジーシールドENを取得する関数
    function getShieldEnergy(){
        return data.powerArmors[armorIndex].energyShield.energy;
    }

    // 選択中のアーマーのエナジーシールドENを変更する関数
    function setShieldEnergy(value: React.SetStateAction<string>){
        const newValue = typeof value === "function"
            ? value(data.powerArmors[armorIndex].energyShield.energy)
            : value;
        setData(prev => {
            return {
                ...prev,
                powerArmors: prev.powerArmors.map((armor: PowerArmorStates, index) => {
                    if(index !== armorIndex) return armor;
                    return {
                        ...armor,
                        energyShield: {
                            ...armor.energyShield,
                            energy: newValue
                        }
                    }
                })
            }
        });
    }

    return (
        <div
            ref={ref}
            style={{ width: "100%" }}
        >
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
                <RollShield/>
            </Box>
            <Box sx={{ gap: 2, display: "flex", justifyContent: "center", alignItems: "center", }}>
                <CalculateDeployableDamage moduleType="バリアホーン" />
                <CalculateDeployableDamage moduleType="オプション" />
                <RotateIconButton
                    className="draggable-disable"
                    color="primary"
                    expand={visibleOptionalItems}
                    onClick={() => {
                        setVisibleOptionalItems(!visibleOptionalItems);
                    }}
                >
                    <ArrowRightIcon/>
                </RotateIconButton>
            </Box>
            <Collapse in={visibleOptionalItems} timeout="auto" unmountOnExit>
                <Box sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <DefenseLevelSlider/>
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
                            value={getShieldEnergy()}
                            setValue={setShieldEnergy}
                            min={0}
                            max={999}
                        />
                    </Grid>
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
            </Collapse>
        </div>
    );
};
