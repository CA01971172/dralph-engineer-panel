import { Button } from "@mui/material";
import { changeMessage, changeName, clickSubmitButton, sendCcfoliaMessage } from "../../utils/sendCcfoliaMessage";
import { DataContext } from "../DataProvider";
import { useContext } from "react";

export default function PowerBoostButton() {
    const {
        data,
        armorIndex
    } = useContext(DataContext);

    return (
        <Button
            className="draggable-disable"
            style={{ width: "100%" }}
            onClick={() => {
                const skillText: string = 
`「パワーブースト🔀」
戦闘開始時に発動可能、EN+10。`;
                const isSent: boolean = sendCcfoliaMessage([skillText], data.characterName);
                if(!isSent) return; // メッセージが変更された場合、以下の処理を行わない(ダブルクリックで送信)
                changeName(data.powerArmors[armorIndex].armorName);
                changeMessage(`:EN+10`);
                clickSubmitButton();
            }}
        >
            パワブ発動
        </Button>
    )
}
