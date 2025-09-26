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
                    setData(prev => { // modulesからmodule.nameが一致するもののisEquippedだけを反転させる
                        const updatedPowerArmors = prev.powerArmors.map((armor, idx) => {
                            if (idx !== armorIndex) return armor;
                            return {
                                ...armor,
                                modules: armor.modules.map(module => 
                                    module.name === moduleName
                                        ? { ...module, isEquipped: !module.isEquipped }
                                        : module
                                )
                            };
                        });
                    return { ...prev, powerArmors: updatedPowerArmors };
                    })
                }}
            >
            </CheckBoxLabel>
        </Box>
    );
}
