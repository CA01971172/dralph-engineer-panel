import { Button } from "@mui/material";
import ModuleRow from "../../ui/ModuleRow";
import { ModuleState } from "../../utils/getPowerArmorData";
import { DataContext, PowerArmorStates } from "../DataProvider";
import { useContext } from "react";
import CheckBoxLabel from "../../ui/CheckBoxLabel";

const deployableModules: string[] = [
    "バリアホーン",
    "オプション"
]

const skillTexts: Record<string, string> = {
    "バリアホーン": "バリアホーン設置",
    "オプション": "オプション設置"
}

export default function DeployableModulePanel({module}: {module: ModuleState}){
    const {
        setData,
        armorIndex
    } = useContext(DataContext);

    function handleUseDeployableModule(){
        
    }

    function toggleEnableDeployableModule(){
        setData((prev) => {
            return {
                ...prev,
                powerArmors: prev.powerArmors.map((armor, index): PowerArmorStates => {
                    if (index !== armorIndex) return armor as PowerArmorStates;
                    return {
                        ...armor,
                        modules: armor.modules.map((m) => {
                            if (m.name !== module.name) return m;
                            return {
                                ...m,
                                isEnabled: !module.isEnabled,
                            };
                        }),
                    } as PowerArmorStates;
                }),
            };
        });
    }

    return(
        <>
            {deployableModules.includes(module.name) && (
                <ModuleRow
                    button={
                        <Button
                            onClick={handleUseDeployableModule}
                        >
                            バリアホーン設置
                        </Button>
                    }
                    checkbox={
                        <CheckBoxLabel
                            label="継続"
                            isChecked={module.isEnabled}
                            setIsChecked={toggleEnableDeployableModule}
                        />
                    }
                />
            )}
        </>
    );
}
