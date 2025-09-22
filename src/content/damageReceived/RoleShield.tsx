import { Button } from "@mui/material";
import { useContext } from "react";
import { DataContext } from "../DataProvider";
import { changeName, sendCcfoliaMessage } from "../../utils/sendCcfoliaMessage";

export default function RoleShield(){
    const {
        data
    } = useContext(DataContext)

    return (
        <Button
            onClick={() => {
                changeName(data.characterName);
                sendCcfoliaMessage(["CCB<=({重機械操作}) 【エナジーシールド】"]);
            }}
        >
            エナシ
            <br/>
            技能判定
        </Button>
    );
}
