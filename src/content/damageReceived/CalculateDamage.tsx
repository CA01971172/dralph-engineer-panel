import { Button } from "@mui/material";
import { calculateDamage } from "../../utils/calculateDamage";

type Props = {
    partsNames: string[];
    partsIndex: number;
    sliderValue: number;
    additionalDefense: string;
    additionalArmors: string[];
    enableOverload: boolean;
    enableEnergyShield: boolean;
    shieldEnergy: number;
    enableBarrierHorn: boolean;
    enableEmergencyShield: boolean;
    name1?: string;
    name2?: string;
}

export default function CalculateDamage( props: Props ){
    const {
        partsNames,
        partsIndex,
        sliderValue,
        additionalDefense,
        additionalArmors,
        enableOverload,
        enableEnergyShield,
        shieldEnergy,
        enableBarrierHorn,
        enableEmergencyShield,
        name1,
        name2
    } = props;

    return (
        <Button
            className="draggable-disable"
            onClick={() => {
                calculateDamage({
                    partsName: partsNames[partsIndex],
                    enableEnergyShield,
                    shieldEnergy,
                    defenseValue: sliderValue,
                    additionalDefense: Number(additionalDefense),
                    additionalArmors,
                    enableOverload,
                    enableBarrierHorn,
                    enableEmergencyShield,
                    name1,
                    name2
                })
            }}
        >
            {enableEnergyShield ? "計算(エナシあり)" : "計算(エナシなし)"}
        </Button>
    );
};
