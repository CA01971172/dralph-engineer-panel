import { Box, IconButton, TextField, } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useContext } from "react";
import { DataContext } from "../DataProvider";

export default function NamesField(){
    const {
        data,
        setData,
        swapTab,
        addArmor,
        removeArmor
    } = useContext(DataContext);

    return (
        <>
            <Box>
                <TextField
                    label="搭乗者名"
                    variant="standard"
                    value={data.characterName}
                    onChange={(e) => {
                        setData({ ...data, characterName: e.target.value });
                    }}
                    sx={{ width: "50%" }}
                />
                <IconButton
                    color="primary"
                    onClick={addArmor}
                >
                    <AddIcon/>
                </IconButton>
            </Box>
            {(data.powerArmors || []).map((armor, index, array) => (
                <Box>
                    <TextField
                        key={index}
                        variant="standard"
                        label="アーマー名"
                        value={armor.armorName}
                        onChange={(e) => {
                            const newArmors = [...data.powerArmors];
                            newArmors[index].armorName = e.target.value;
                            setData({ ...data, powerArmors: newArmors });
                        }}
                        sx={{ width: "50%" }}
                    />
                    <IconButton
                        color="primary"
                        disabled={index === 0}
                        onClick={() => swapTab(index, -1)}
                    >
                        <KeyboardArrowUpIcon/>
                    </IconButton>
                    <IconButton
                        color="primary"
                        disabled={index === array.length - 1}
                        onClick={() => swapTab(index, 1)}
                    >
                        <KeyboardArrowDownIcon/>
                    </IconButton>
                    <IconButton
                        color="primary"
                        onClick={() => {
                            const text: string = `${armor.armorName || `アーマー${index + 1}`}のデータは消えてしまいますが、本当に削除しますか？`;
                            confirm(text) && removeArmor(index);
                        }}
                    >
                        <DeleteIcon/>
                    </IconButton>
                </Box>
            ))}
        </>
    );
}
