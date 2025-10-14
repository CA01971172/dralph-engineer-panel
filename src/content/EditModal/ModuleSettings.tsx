import { JSX, useContext } from "react";
import { DataContext, PowerArmorStates } from "../DataProvider";
import CheckBoxLabel from "../../ui/CheckBoxLabel";
import { getModuleAtLevel, getModuleByName, ModuleName, ModuleState } from "../../utils/getPowerArmorData";
import ModuleRow from "../../ui/ModuleRow";
import ArrowNumberControlLabel from "../../ui/ArrowNumberControlLabel";
import { Box, TextField } from "@mui/material";

type Props = {
    armorIndex: number;
    module: ModuleState;
    moduleIndex: number;
};

export default function ModuleSettings(props: Props){
    const {
        armorIndex,
        module,
        moduleIndex
    } = props;

    const {
        setData,
        getModule
    } = useContext(DataContext);

    function getNewModuleState(prev: ModuleState, newLevel: number): ModuleState {
        const moduleData = getModuleByName(prev.name as ModuleName);
        const newModuleState: ModuleState = getModuleAtLevel(prev, moduleData, newLevel);
        return newModuleState;
    }

    function changeModuleLevel(amount: 1 | -1){
        const newLevel: number = (amount === 1) ? Math.min(module.level + 1, 10) : Math.max(module.level - 1, 0);
        setData(prev => {
            // newLevelに応じたModuleStateを取得
            const prevModule = prev.powerArmors[armorIndex].modules[moduleIndex];
            const newModule = getNewModuleState(prevModule, newLevel);
            const updatedPowerArmors = prev.powerArmors.map((armor, idx) => {
                if (idx !== armorIndex) return armor as PowerArmorStates;
                return {
                    ...armor as PowerArmorStates,
                    modules: armor.modules.map((m, mIdx) => 
                        mIdx === moduleIndex
                            ? newModule
                            : m
                    )
                };
            })
            return { ...prev, powerArmors: updatedPowerArmors };
        });
    }

    function getModuleNameField(): JSX.Element {
        function setModuleName(name: string){
            setData(prev => {
                const updatedPowerArmors = prev.powerArmors.map((armor, idx) => {
                    if (idx !== armorIndex) return armor as PowerArmorStates;
                    // modulesからmodule.nameが一致するものを取得
                    return {
                        ...armor as PowerArmorStates,
                        modules: armor.modules.map(m => 
                            m.name === module.name
                                ? { ...m, pieceName: name }
                                : m
                        )
                    };
                });
                return { ...prev, powerArmors: updatedPowerArmors };
            });
        };

        switch(module.name) {
            case "バリアホーン":
            case "オプション":
                return (
                    <TextField
                        label={`${module.name}名`}
                        variant="standard"
                        value={getModule(armorIndex, module.name as ModuleName).pieceName}
                        onChange={(e) => {setModuleName(e.target.value)}}
                    />
                );
            default:
                return (
                    <TextField
                        sx={{visibility: "hidden"}}
                        variant="standard"
                        value=""
                    />
                );
        }
    }

    return (
        <ModuleRow
            input={
                <CheckBoxLabel
                    label={module.name}
                    isChecked={getModule(armorIndex, module.name as ModuleName).isEquipped}
                    setIsChecked={() => {
                        setData(prev => { // modulesからmodule.nameが一致するもののisEquippedだけを反転させる
                            const updatedPowerArmors = prev.powerArmors.map((armor, idx) => {
                                if (idx !== armorIndex) return armor as PowerArmorStates;
                                return {
                                    ...armor as PowerArmorStates,
                                    modules: armor.modules.map(m => 
                                        m.name === module.name
                                            ? { ...m, isEquipped: !m.isEquipped }
                                            : m
                                    )
                                };
                            });
                        return { ...prev, powerArmors: updatedPowerArmors };
                        })
                    }}
                />
            }
            button={
                <ArrowNumberControlLabel
                    label="強化回数"
                    value={`${module.level ? "+" : ""}${module.level}`}
                    incrementNumber={() => changeModuleLevel(1)}
                    decrementNumber={() => changeModuleLevel(-1)}
                />
            }
            checkbox={getModuleNameField()}
        />
    );
}
