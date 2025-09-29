import { useContext, useState } from 'react';
import { Button } from '@mui/material';
import NumberFieldLabel from '../../ui/NumberFieldLabel';
import { sendCcfoliaMessage } from '../../utils/sendCcfoliaMessage';
import { DataContext, PowerArmorStates } from '../DataProvider';

export default function EnergyShieldPanel({armorIndex}: {armorIndex: number;}) {
    const {data, setData} = useContext(DataContext);

    const handleClick = () => {
        const num = Number(data.powerArmors[armorIndex].energyShield.energy);
        if (isNaN(num) || num <= 0) return; // 無効な入力は送信しない
        sendCcfoliaMessage([`:EN-${num}`]);
    };

    return (
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <NumberFieldLabel
                label="消費EN"
                additionalLabel=""
                value={data.powerArmors[armorIndex].energyShield.energy}
                setValue={(event) => {
                    const value: string = typeof event === "function" ? event(data.powerArmors[armorIndex].energyShield.energy) : event;
                    setData(prev => {
                        return {
                            ...data,
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
                }}
                min={0}
                max={99}
            />
            <Button
                variant="contained"
                color="primary"
                onClick={handleClick}
            >
                エナジーシールド
            </Button>
        </div>
    );
}
