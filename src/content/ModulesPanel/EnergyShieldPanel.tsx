import { useContext } from 'react';
import { Button } from '@mui/material';
import NumberFieldLabel from '../../ui/NumberFieldLabel';
import { changeMessage, changeName, clickSubmitButton, sendCcfoliaMessage } from '../../utils/sendCcfoliaMessage';
import { DataContext, PowerArmorStates } from '../DataProvider';
import CheckBoxLabel from '../../ui/CheckBoxLabel';
import ModuleRow from '../../ui/ModuleRow';

export default function EnergyShieldPanel() {
    const {
        data,
        setData,
        getEnergyCost,
        armorIndex
    } = useContext(DataContext);

    // エナジーシールドの消費ENの指定を行う関数
    function changeShieldEnergy(event:  React.SetStateAction<string>){
        const value: string = typeof event === "function" ? event(data.powerArmors[armorIndex].energyShield.energy) : event;
        setData(prev => {
            return {
                ...prev,
                powerArmors: prev.powerArmors.map((armor: PowerArmorStates, index) => {
                    if (index !== armorIndex) return armor;
                    return {
                        ...armor,
                        energyShield: {
                            ...armor.energyShield,
                            energy: value
                        }
                    };
                })
            };
        });
    }

    // エナジーシールドの生成を行うボタンの処理用関数
    function handleUseEnergyShield(){
        const num = Number(data.powerArmors[armorIndex].energyShield.energy);
        if (isNaN(num) || num <= 0) return; // 無効な入力は送信しない
        const energyCost: number = getEnergyCost(armorIndex, num); // エネルギー系効率化を適用した後のコスト
        const energyEfficiencyText: string = (num === energyCost) ? "" : `(EN効率: ${num - energyCost})`;
        const skillText: string = 
`「エナジーシールド🔀」
パワーアーマー装備中に発動可能、
任意のENを消費し、消費EN×5倍の装甲を持つ盾を生成する(解除無効)。
消費EN分、次ターンから継続消費ENが増加する。
消費EN: ${num}${energyEfficiencyText}, 装甲: ${num * 5}`;
        const isSent: boolean = sendCcfoliaMessage([skillText], data.characterName);
        if(isSent){
            changeName(data.powerArmors[armorIndex].armorName);
            changeMessage(`:EN-${energyCost}`);
            clickSubmitButton();
            changeEnableShield(true); // エナジーシールドを生成した場合、stateで管理する
        }
    };

    // エナジーシールド有効状態チェックボックスのオンオフ用関数
    function handleSwitchCheckBox(){
        setData(prev => {
            return {
                ...prev,
                powerArmors: prev.powerArmors.map((armor: PowerArmorStates, index) => {
                    if (index !== armorIndex) return armor;
                    return {
                        ...armor,
                        energyShield: {
                            ...armor.energyShield,
                            isEnabled: !armor.energyShield.isEnabled
                        }
                    };
                })
            };
        });
    }

    // エナジーシールドの有効状態を切り替える関数
    function changeEnableShield(value: boolean){
        setData(prev => {
            return {
                ...prev,
                powerArmors: prev.powerArmors.map((armor: PowerArmorStates, index) => {
                    if (index !== armorIndex) return armor;
                    return {
                        ...armor,
                        energyShield: {
                            ...armor.energyShield,
                            isEnabled: value
                        }
                    };
                })
            };
        });
    }

    return (
        <ModuleRow
            input={
                <NumberFieldLabel
                    label="シールドEN"
                    additionalLabel=""
                    value={data.powerArmors[armorIndex].energyShield.energy}
                    setValue={changeShieldEnergy}
                    min={0}
                    max={99}
                />
            }
            button={
                <Button
                    className="draggable-disable"
                    onClick={handleUseEnergyShield}
                >
                    エナシ生成
                </Button>
            }
            checkbox={
                <CheckBoxLabel
                    label="継続"
                    isChecked={data.powerArmors[armorIndex].energyShield.isEnabled}
                    setIsChecked={handleSwitchCheckBox}
                />
            }
        />
    );
}
