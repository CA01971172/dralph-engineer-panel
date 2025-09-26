import { useContext } from "react";
import { DataContext } from "../DataProvider";
import { Box } from "@mui/material";
import CheckBoxLabel from "../../ui/CheckBoxLabel";
import { ModuleName } from "../../utils/getPowerArmorData";

type Props = {
    armorIndex: number;
    moduleName: ModuleName;
};

export default function ModuleSettings(props: Props){
    const {
        armorIndex,
        moduleName
    } = props;

    const {
        data,
        setData,
        getModule
    } = useContext(DataContext);

    return (
        <Box>
            <CheckBoxLabel
                label={moduleName}
                isChecked={getModule(armorIndex, moduleName).isEquipped}
                setIsChecked={() => {
                    setData(prev => {
                        const targetModuleIndex: number = prev.powerArmors[armorIndex].modules.findIndex(module => module.name === moduleName);
                        if(targetModuleIndex === -1) throw new Error("指定された搭載能力名が間違っています。");
                        prev.powerArmors[armorIndex].modules[targetModuleIndex].isEquipped = !prev.powerArmors[armorIndex].modules[targetModuleIndex].isEquipped;
                        return prev;
                    })
                }}
            >

            </CheckBoxLabel>
        </Box>
    );
}
