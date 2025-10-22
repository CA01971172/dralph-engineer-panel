import { Button } from "@mui/material";
import ModuleRow from "../../ui/ModuleRow";
import { ModuleState } from "../../utils/getPowerArmorData";
import { DataContext, PowerArmorStates } from "../DataProvider";
import { Fragment, useContext } from "react";
import CheckBoxLabel from "../../ui/CheckBoxLabel";
import { changeMessage, changeName, clickSubmitButton, sendCcfoliaMessage } from "../../utils/sendCcfoliaMessage";

export default function DeployableModulePanel({module}: {module: ModuleState}){
    const {
        data,
        getEnergyCost,
        setData,
        armorIndex
    } = useContext(DataContext);

    function getEnergyCostsText(contract?: boolean): string{
        const baseEnergyCost: number = module.energyCost;
        const energyCost: number = getEnergyCost(armorIndex, baseEnergyCost); // エネルギー系効率化を適用した後のコスト
        let energyEfficiencyText: string = "";
        if (contract) {
            energyEfficiencyText = (baseEnergyCost === energyCost) ? "" : `(${energyCost})`;
        }else{
            energyEfficiencyText = (baseEnergyCost === energyCost) ? "" : `(EN効率: ${baseEnergyCost - energyCost})`;
        }
        return `消費EN: ${baseEnergyCost}${energyEfficiencyText}, 継続消費EN: +${module.sustainEnergyCost}`;
    }

    function getModuleText(): string{
        const levelText: string = module.level > 0 ? `+${module.level}` : "";
        switch(module.name){
            case "バリアホーン":
                return(
`「バリアホーン🔀${levelText}」
効果: 効果範囲内の味方の被ダメージ0.75倍(バリアホーンを除く)
効果範囲: バリアホーンを中心に3×3マス
${getEnergyCostsText()}`
                );
            case "オプション":
                return(
`「オプション🔀${levelText}」
効果範囲(全効果): 3マス
効果: オプションのターン開始時、以下の効果から1つ選択して発動できる。
・囮: 1体に挑発状態(2ターン, 対象: オプション)を付与
・回復: 味方1体のHPを2d6回復
・サポート: 1体の与ダメージに1d6+6を追加(オプションの次ターン開始時まで)
${getEnergyCostsText()}`
                );
            case "オートバレルスタンド":
                return(
`「オートバレルスタンド🔀${levelText}」
${getEnergyCostsText()}`
                );
            default:
                return "";
        }
    }

    function handleUseDeployableModule(){
        const energyCost: number = getEnergyCost(armorIndex, module.energyCost);
        const moduleText: string = getModuleText();
        const isSent: boolean = sendCcfoliaMessage([moduleText], data.characterName);
        if(isSent){
            changeName(data.powerArmors[armorIndex].armorName);
            changeMessage(`:EN-${energyCost}`);
            clickSubmitButton();
            toggleEnableDeployableModule(true); // 設置系搭載能力の設置をstateで管理する
        }
    }

    function toggleEnableDeployableModule(value? : boolean){
        const newValue = typeof value === "boolean" ? value : !module.isEnabled;
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
                                isEnabled: newValue,
                            };
                        }),
                    } as PowerArmorStates;
                }),
            };
        });
    }

    return(
        <ModuleRow
            input={
                <span>
                    {getEnergyCostsText(true)
                        .split(", ")
                        .map((text, i) => (
                            <Fragment key={i}>
                                {text}
                                <br />
                            </Fragment>
                        ))
                    }
                </span>
            }
            button={
                <Button
                    className="draggable-disable"
                    onClick={handleUseDeployableModule}
                >
                    {`${(module.name === "オートバレルスタンド") ? "オトバレ" : module.name}設置`}
                </Button>
            }
            checkbox={
                <CheckBoxLabel
                    label="継続"
                    isChecked={module.isEnabled}
                    setIsChecked={() => toggleEnableDeployableModule()}
                />
            }
        />
    );
}

// TODO: オプションの能力選択
// TODO: 継続EN消費処理
