import { Button } from "@mui/material";
import { useContext } from "react";
import { DataContext } from "../DataProvider";
import { changeMessage, changeName } from "../../utils/sendCcfoliaMessage";

type Props = {
    moduleType: "オプション" | "バリアホーン" | "オートバレルスタンド";
}

function getShortName(moduleName: string): string {
    switch (moduleName) {
        case "オプション":
            return "オプ";
        case "バリアホーン":
            return "バリホ";
        case "オートバレルスタンド":
            return "オトバレ";
        default:
            return moduleName;
    }
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
            sx={{minWidth: "4rem"}}
            onClick={() => {
                const moduleName: string = getModule(armorIndex, moduleType).pieceName;
                changeName(moduleName);
                changeMessage(":耐久力-");
            }}
        >
            {getShortName(moduleType)}
        </Button>
    );
};
