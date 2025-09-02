import { Button } from "@mui/material";

type Props = {
    partsNames: string[];
    partsIndex: number;
    sliderValue: number;
    specialArmors: string[];
    enableOverload: boolean;
    enableEnergyShield: boolean;
    shieldEnergy: number;
}

export default function DamageReceived( props: Props ){
    const {
        partsNames,
        partsIndex,
        sliderValue,
        specialArmors,
        enableOverload,
        enableEnergyShield,
        shieldEnergy
    } = props;

    return (
        <Button>
            {enableEnergyShield ? "計算(エナシあり)" : "計算(エナシなし)"}
        </Button>
    );
};
