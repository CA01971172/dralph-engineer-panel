import { useContext } from 'react';
import { Button } from '@mui/material';
import { changeName, sendCcfoliaMessage } from '../../utils/sendCcfoliaMessage';
import { DataContext, PowerArmorStates } from '../DataProvider';
import CheckBoxLabel from '../../ui/CheckBoxLabel';
import ArrowNumberControlLabel from '../../ui/ArrowNumberControlLabel';
import ModuleRow from '../../ui/ModuleRow';

const bladeSpecList: {energy: number, damage: string}[] = [
    {energy: 0, damage: ""},
    {energy: 2, damage: "10d6"},
    {energy: 4, damage: "14d6"},
    {energy: 6, damage: "20d6"},
    {energy: 8, damage: "23d6"},
    {energy: 10, damage: "26d6"},
    {energy: 12, damage: "30d6"},
    {energy: 15, damage: "35d6"},
    {energy: 20, damage: "42d6"}
];

export default function EnergyBladePanel({armorIndex}: {armorIndex: number;}) {
    const {
        data,
        setData,
        getEnergyCost,
        enableOverload,
        getAttackRoll
    } = useContext(DataContext);

    // エナジーブレードの消費ENの指定を行う関数
    function changeBladeEnergy(event:  React.SetStateAction<number>){
        const value: number = typeof event === "function" ? event(data.powerArmors[armorIndex].energyBlade.energy) : event;
        setData(prev => {
            return {
                ...prev,
                powerArmors: prev.powerArmors.map((armor: PowerArmorStates, index) => {
                    if (index !== armorIndex) return armor;
                    return {
                        ...armor,
                        energyBlade: {
                            ...armor.energyBlade,
                            energy: value
                        }
                    };
                })
            };
        });
    }

    // エナジーブレードの生成を行うボタンの処理用関数
    function handleUseEnergyBlade(){
        const num = data.powerArmors[armorIndex].energyBlade.energy;
        changeName(data.powerArmors[armorIndex].armorName); // ココフォリア上でキャラクター名を変更する
        if (isNaN(num) || num <= 0) return; // 無効な入力は送信しない
        const energyCost: number = getEnergyCost(armorIndex, num); // エネルギー系効率化を適用した後のコスト
        const energyEfficiencyText: string = (num === energyCost) ? "" : `(EN効率: ${num - energyCost})`;
        const bladeIndex: number = bladeSpecList.findIndex(obj => obj.energy === num);
        const skillText: string = 
`「エナジーブレード🔀」
パワーアーマー装備中に発動可能、
任意のENを消費し、消費ENに応じたダメージを持つ武器を生成する(解除無効)。
消費EN分、次ターンから継続消費ENが増加する。
消費EN: ${num}${energyEfficiencyText}, ダメージ: ${bladeSpecList[bladeIndex].damage}`
        const isSent: boolean = sendCcfoliaMessage([`:EN-${energyCost}`, skillText]);
        if(isSent) changeEnableBlade(true); // エナジーブレードを生成した場合、stateで管理する
    };

    // エナジーブレード有効状態チェックボックスのオンオフ用関数
    function handleSwitchCheckBox(){
        setData(prev => {
            return {
                ...prev,
                powerArmors: prev.powerArmors.map((armor: PowerArmorStates, index) => {
                    if (index !== armorIndex) return armor;
                    return {
                        ...armor,
                        energyBlade: {
                            ...armor.energyBlade,
                            isEnabled: !armor.energyBlade.isEnabled
                        }
                    };
                })
            };
        });
    }

    // エナジーブレードの有効状態を切り替える関数
    function changeEnableBlade(value: boolean){
        setData(prev => {
            return {
                ...prev,
                powerArmors: prev.powerArmors.map((armor: PowerArmorStates, index) => {
                    if (index !== armorIndex) return armor;
                    return {
                        ...armor,
                        energyBlade: {
                            ...armor.energyBlade,
                            isEnabled: value
                        }
                    };
                })
            };
        });
    }

    // エナジーブレードの攻撃判定を取得する関数
    function getEnergyBladeRollText(): string{
        const attackCount = [
            enableOverload,
            data.powerArmors[armorIndex].energyBlade.energy >= 12
        ].filter(Boolean).length + 1;
        return getAttackRoll("エナジーブレード", attackCount, armorIndex);
    }

    // エナジーブレードのダメージ判定を取得する関数
    function getEnergyBladeDamageText(): string{
        const bladeEnergy: number = data.powerArmors[armorIndex].energyBlade.energy;
        const baseDamage: string = bladeSpecList.find(obj => obj.energy === bladeEnergy)?.damage ?? "";
        const damageMagnification: string = enableOverload ? "*15/10R" : "";
        const damageRoll: string = `(${baseDamage}+{魔法攻撃力})${damageMagnification} 【ダメージ(エナジーブレード)】`;
        return damageRoll;
    }

    return (
        <>
            <ModuleRow
                input={
                    <ArrowNumberControlLabel
                        label="ブレードEN"
                        value={data.powerArmors[armorIndex].energyBlade.energy}
                        incrementNumber={() => {
                            changeBladeEnergy(prev => {
                                const prevIndex: number = bladeSpecList.findIndex(obj => obj.energy === prev);
                                if (prevIndex === -1 || prevIndex === bladeSpecList.length - 1) return prev;
                                return bladeSpecList[prevIndex + 1].energy;
                            });
                        }}
                        decrementNumber={() => {
                            changeBladeEnergy(prev => {
                                const prevIndex: number = bladeSpecList.findIndex(obj => obj.energy === prev);
                                if (prevIndex === -1 || prevIndex === 0) return prev;
                                return bladeSpecList[prevIndex - 1].energy;
                            })
                        }}
                    />
                }
                button={
                    <Button
                        className="draggable-disable"
                        onClick={handleUseEnergyBlade}
                    >
                        エナブレ生成
                    </Button>
                }
                checkbox={
                    <CheckBoxLabel
                        label="継続"
                        isChecked={data.powerArmors[armorIndex].energyBlade.isEnabled}
                        setIsChecked={handleSwitchCheckBox}
                    />
                }
            />
            <div style={{display: "flex", justifyContent: "space-between", gap: 1, marginTop: "-1rem"}}>
                <Button
                    className="draggable-disable"
                    onClick={() => {
                        changeName(data.characterName);
                        sendCcfoliaMessage([getEnergyBladeRollText()]);
                    }}
                >
                    エナブレ<br/>技能判定
                </Button>
                <Button
                    className="draggable-disable"
                    disabled={!(data.powerArmors[armorIndex].energyBlade.energy >= 12)}
                    onClick={() => {
                        changeName(data.characterName);
                        sendCcfoliaMessage(["1d100<=25 【装甲無視】"]);
                    }}
                >
                    装甲無視
                </Button>
                <Button
                    className="draggable-disable"
                    disabled={!(data.powerArmors[armorIndex].energyBlade.energy >= 12)}
                    onClick={() => {
                        changeName(data.characterName);
                        sendCcfoliaMessage(["1d100<=15 【軽減無視】"])
                    }}
                >
                    軽減無視
                </Button>
                <Button
                    className="draggable-disable"
                    onClick={() => {
                        changeName(data.characterName);
                        sendCcfoliaMessage([getEnergyBladeDamageText()]);
                    }}
                >
                    ダメージ<br/>(エナブレ)
                </Button>
            </div>
        </>
    );
}
