import { useState } from "react";
import DefenseLevelSlider from "./DefenseLevelSlider";
import SelectParts from "./SelectParts";
import CalculateDamage from "./CalculateDamage";
import { Box, Grid } from "@mui/material";
import CheckBoxLabel from "../../ui/CheckBoxLabel";
import NumberFieldLabel from "../../ui/NumberFieldLabel";
import SelectArmors from "./SelectArmors";
import { StorageData } from "../../utils/controlChromeData";

// パワーアーマーの部位名
const partsNames = [ "頭", "胴体", "右手", "左手", "右足", "左足" ];

type Props = {
    enableOverload: boolean;
    setEnableOverload: React.Dispatch<React.SetStateAction<boolean>>;
    shieldEnergy: string;
    setShieldEnergy: React.Dispatch<React.SetStateAction<string>>;
    data: StorageData;
    setData: React.Dispatch<React.SetStateAction<StorageData>>;
}

export default function DamageReceived( props: Props ){
    const {
        enableOverload,
        setEnableOverload,
        shieldEnergy,
        setShieldEnergy,
        data,
        setData
    } = props;

    const [partsIndex, setPartsIndex] = useState<number>(0); // 選択中のアーマー部位インデックス
    const [sliderValue, setSliderValue] = useState<number>(0); // 防御力段階スライダーの値
    const [additionalDefense, setAdditionalDefense] = useState<string>("100"); // その他軽減倍率

    const [enableEmergencyShield, setEnableEmergencyShield] = useState<boolean>(false); // 緊急シールドの有無
    const [enableBarrierHorn, setEnableBarrierHorn] = useState<boolean>(false); // バリアホーンの有無

    const getEnableArmor = () => data.enableArmors; // 装甲類の有効化
    const getArmors = () => data.additionalArmors; // 装甲リスト

    return (
        <div style={{ width: "100%" }}>
            <Box sx={{ gap: 1, display: "flex", justifyContent: "center", alignItems: "center"}}>
                <SelectParts
                    partsNames={partsNames}
                    partsIndex={partsIndex}
                    setPartsIndex={setPartsIndex}
                />
                <CalculateDamage
                    partsNames={partsNames}
                    partsIndex={partsIndex}
                    sliderValue={sliderValue}
                    additionalDefense={additionalDefense}
                    additionalArmors={getEnableArmor() ? getArmors().filter(armor => armor.enable).map(armor => armor.armorName) : []}
                    enableOverload={enableOverload}
                    enableEnergyShield={true}
                    shieldEnergy={Number(shieldEnergy)}
                    enableBarrierHorn={enableBarrierHorn}
                    enableEmergencyShield={enableEmergencyShield}
                />
                <CalculateDamage
                    partsNames={partsNames}
                    partsIndex={partsIndex}
                    sliderValue={sliderValue}
                    additionalDefense={additionalDefense}
                    additionalArmors={getEnableArmor() ? getArmors().filter(armor => armor.enable).map(armor => armor.armorName) : []}
                    enableOverload={enableOverload}
                    enableEnergyShield={false}
                    shieldEnergy={Number(shieldEnergy)}
                    enableBarrierHorn={enableBarrierHorn}
                    enableEmergencyShield={enableEmergencyShield}
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
                <DefenseLevelSlider
                    sliderValue={sliderValue}
                    setSliderValue={setSliderValue}
                />
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
                    <SelectArmors
                        enableArmor={getEnableArmor()}
                        armors={getArmors()}
                        setData={setData}
                    />
                </Grid>
            </Grid>
        </div>
    );
};
