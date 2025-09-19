import { IconButton, Modal, Paper, TextField, Theme, ThemeProvider } from "@mui/material";
import { StorageData } from "../../utils/controlChromeData";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { useContext } from "react";
import { DataContext } from "../DataProvider";


type Props = {
    theme: Theme;
    isOpen: boolean;
    closeModal: () => void;
};

export default function EditModal(props: Props){
    const { theme, isOpen, closeModal } = props;

    const {
        armorIndex,
        setArmorIndex,
        data,
        setData
    } = useContext(DataContext);

    return (
        <Modal
            className="draggable-disable"
            open={isOpen}
            onClose={closeModal}
        >
            <ThemeProvider theme={theme}>
                <Paper
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)", // 中央に移動
                        p: 4, // パディング
                        minWidth: 300 // 必要に応じて
                    }}
                >
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
                            onClick={() => {
                                setData(prev => ({
                                    ...prev,
                                    powerArmors: [
                                        ...prev.powerArmors,
                                        { armorName: "" }
                                    ]
                                }))
                            }}
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
                                onClick={() => {
                                    if(armorIndex >= index) setArmorIndex(prev => {
                                        if(prev === 0) return 0;
                                        return prev - 1;
                                    });
                                    setData(prev => ({
                                        ...prev,
                                        powerArmors: prev.powerArmors.filter((_, i) => i !== index)
                                    }));
                                }}
                            >
                                <DeleteIcon/>
                            </IconButton>
                        </div>
                    ))}
                </Paper>
            </ThemeProvider>
        </Modal>
    );
}