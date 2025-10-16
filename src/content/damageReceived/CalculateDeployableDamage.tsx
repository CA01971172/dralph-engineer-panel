import { Button } from "@mui/material";
import { calculateDeployableDamage } from "../../utils/calculateDamage";
import { useContext } from "react";
import { DataContext } from "../DataProvider";

type Props = {
    inputDamage: number;
    moduleType: "オプション" | "バリアホーン";
}

export default function CalculateDeployableDamage(props: Props) {
    const { inputDamage, moduleType } = props;

    const {
        armorIndex,
        getModule
    } = useContext(DataContext);

    return (
        <Button
            className="draggable-disable"
            onClick={() => {
                let armorValue: number = 0;
                if(moduleType === "バリアホーン"){
                    armorValue = Number(getModule(armorIndex, "バリアホーン").texts[0]);
                }
                calculateDeployableDamage({
                    inputDamage,
                    armorValue,
                    defenseValue: 1,
                    additionalDefense: 1,
                    enableBarrierHorn: false,
                    name: getModule(armorIndex, moduleType).pieceName
                });
            }}
        >
            {moduleType}
        </Button>
    );
};
