import { Button } from "@mui/material";
import { useContext } from "react";
import { DataContext } from "../DataProvider";
import { changeMessage, changeName } from "../../utils/sendCcfoliaMessage";

type Props = {
    moduleType: "オプション" | "バリアホーン";
}

export default function CalculateDeployableDamage(props: Props) {
    const { moduleType } = props;

    const {
        armorIndex,
        getModule
    } = useContext(DataContext);

    return (
        <Button
            className="draggable-disable"
            onClick={() => {
                const moduleName: string = getModule(armorIndex, moduleType).pieceName;
                changeName(moduleName);
                changeMessage(":耐久力-");
            }}
        >
            {`耐久力処理(${moduleType})`}
        </Button>
    );
};
