import { Box, Button } from "@mui/material";
import { DataContext } from "./DataProvider";
import { useContext, useState } from "react";
import ArrowNumberControlLabel from "../ui/ArrowNumberControlLabel";
import { changeMessage, changeName, clickSubmitButton } from "../utils/sendCcfoliaMessage";

export default function DodgeRoll(){
    const {
        data,
        armorIndex,
        getModule
    } = useContext(DataContext);

    const [dodgeCount, setDodgeCount] = useState(0);
    const [optionDodgeCount, setOptionDodgeCount] = useState(0);

    function incrementDodge(func: React.Dispatch<React.SetStateAction<number>>){
        func((count) => Math.min(count + 1, 99));
    }

    function decrementDodge(func: React.Dispatch<React.SetStateAction<number>>){
        func((count) => Math.max(count - 1, 0));
    }

    function rollDodge(name: string, count: number, func: React.Dispatch<React.SetStateAction<number>>){
        const changedName = changeName(name);
        const text = `CCB<=(({回避技能})/${count+1}) 【回避】${count+1}回目`;
        const changedMessage = changeMessage(text);
        if(!changedName && !changedMessage){
            clickSubmitButton();
            incrementDodge(func);
        }
    }

    return (
        <Box
            sx={{
                boxShadow: "0px -4px 10px rgba(0, 0, 0, 0.3)",
                display: "flex",
                gap: 2,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <Button
                    className="draggable-disable"
                    sx={{ width: "7rem" }}
                    onClick={() => {
                        const name = data.characterName;
                        rollDodge(name, dodgeCount, setDodgeCount);
                    }} 
                >
                    回避
                    </Button>
                <Button
                    className="draggable-disable"
                    sx={{ width: "7rem" }}
                    onClick={() => {
                        const name = getModule(armorIndex, "オプション").pieceName;
                        rollDodge(name, dodgeCount, setOptionDodgeCount);
                    }} 
                >
                    回避(オプ)
                </Button>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <ArrowNumberControlLabel
                    label="回避回数"
                    value={dodgeCount}
                    incrementNumber={() => incrementDodge(setDodgeCount)}
                    decrementNumber={() => decrementDodge(setDodgeCount)}
                />
                <ArrowNumberControlLabel
                    label="回避回数"
                    value={optionDodgeCount}
                    incrementNumber={() => incrementDodge(setOptionDodgeCount)}
                    decrementNumber={() => decrementDodge(setOptionDodgeCount)}
                />
            </Box>
            <Button
                className="draggable-disable"
                sx={{ width: "7rem" }}
                onClick={() => {
                    setDodgeCount(0);
                    setOptionDodgeCount(0);
                }}
            >
                回避回数
                <br/>
                リセット
            </Button>
        </Box>
    )
}

// TODO: オプションの回避回数+
// TODO: パニッシュストリーム
