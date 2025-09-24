import { IconButton, TextField, } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { useContext } from "react";
import { DataContext } from "../DataProvider";

export default function NamesField(){
    const {
        data,
        setData,
        addArmor,
        removeArmor
    } = useContext(DataContext);

    return (
        <>
            <div>
                <TextField
                    label="搭乗者名"
                    variant="standard"
                    sx={{
                        "& input::placeholder": {
                        color: "white",       // プレースホルダーの色
                        opacity: 1,         // opacity を1にして色をはっきりさせる
                        },
                    }}
                    value={data.characterName}
                    onChange={(e) => {
                        setData({ ...data, characterName: e.target.value });
                    }}
                />
                <IconButton
                    color="primary"
                    onClick={addArmor}
                >
                    <AddIcon/>
                </IconButton>
            </div>
            {(data.powerArmors || []).map((armor, index) => (
                <div>
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
                    />
                    <IconButton
                        color="primary"
                        onClick={() => removeArmor(index)}
                    >
                        <DeleteIcon/>
                    </IconButton>
                </div>
            ))}
        </>
    );
}
