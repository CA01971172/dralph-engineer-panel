import { Button } from "@mui/material";
import { useContext } from "react";
import { DataContext } from "../DataProvider";
import { sendCcfoliaMessage } from "../../utils/sendCcfoliaMessage";

export default function RollShield(){
    const {
        data
    } = useContext(DataContext)

    return (
        <Button
            onClick={() => {
                sendCcfoliaMessage(["CCB<=({重機械操作技能}) 【エナジーシールド】"], data.characterName);
            }}
        >
            エナシ
            <br/>
            技能判定
        </Button>
    );
}
