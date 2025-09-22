import { Button } from "@mui/material";
import { calculateDamage } from "../../utils/calculateDamage";
import { useContext } from "react";
import { DataContext } from "../DataProvider";
import partsNames from "../../constants";

type Props = {
    enableEnergyShield: boolean;
}

export default function CalculateDamage( props: Props ){
    const { enableEnergyShield } = props;

    const {
        enableOverload,
        shieldEnergy,
        armorIndex,
        data,
        partsIndex,
        sliderValue,
        additionalDefense,
        enableEmergencyShield,
        enableBarrierHorn,
        getEnableAdditionalArmors,
        getAdditionalArmors
    } = useContext(DataContext);

    return (
        <Button
            className="draggable-disable"
            onClick={() => {
                calculateDamage({
                    partsName: partsNames[partsIndex],
                    enableEnergyShield,
                    shieldEnergy: Number(shieldEnergy),
                    defenseValue: sliderValue,
                    additionalDefense: Number(additionalDefense),
                    additionalArmors: getEnableAdditionalArmors() ? getAdditionalArmors().filter(armor => armor.enable).map(armor => armor.armorName) : [],
                    enableOverload,
                    enableBarrierHorn,
                    enableEmergencyShield,
                    name1: data.characterName,
                    name2: data.powerArmors[armorIndex]?.armorName ?? undefined
                })
            }}
        >
            ダメージ計算
            <br/>
            {enableEnergyShield ? "(エナシあり)" : "(エナシなし)"}
        </Button>
    );
};
