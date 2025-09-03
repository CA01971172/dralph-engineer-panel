import { Button } from "@mui/material";
import { calculateDamage } from "../../utils/calculateDamage";

type Props = {
    partsNames: string[];
    partsIndex: number;
    sliderValue: number;
    additionalDefense: string;
    armors: string[];
    enableOverload: boolean;
    enableEnergyShield: boolean;
    shieldEnergy: number;
    enableBarrierHorn: boolean;
    enableEmergencyShield: boolean;
}

export default function CalculateDamage( props: Props ){
    const {
        partsNames,
        partsIndex,
        sliderValue,
        additionalDefense,
        armors,
        enableOverload,
        enableEnergyShield,
        shieldEnergy,
        enableBarrierHorn,
        enableEmergencyShield
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
                    armors,
                    enableOverload,
                    enableBarrierHorn,
                    enableEmergencyShield
                })
            }}
        >
            {enableEnergyShield ? "計算(エナシあり)" : "計算(エナシなし)"}
        </Button>
    );
};
