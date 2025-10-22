import { Button } from "@mui/material";
import { changeName } from "../utils/sendCcfoliaMessage";
import { DataContext } from "./DataProvider";
import { useContext } from "react";
import { modulesList } from "../utils/getPowerArmorData";

const passiveModuleNames = modulesList.filter(module => module.type === "passive").map(module => module.name);

function SustainEnergyButton(){
    const {
        data,
        armorIndex,
        getModule,
        enableOverload
    } = useContext(DataContext);

    function calculateSustainEnergyCosts(): {
        totalCost: number;
        voucher: string;
    }{
        const sustainEnergyCosts: number[] = [];
        const sustainEnergyCostsText: string[] = [];

        // スキルの継続消費ENを算出
        const energyBlade = data.powerArmors[armorIndex].energyBlade;
        if(energyBlade.isEnabled){
            sustainEnergyCosts.push(energyBlade.energy);
            sustainEnergyCostsText.push(`エナジーブレード: +${energyBlade.energy}`);
        }
        const energyShield = data.powerArmors[armorIndex].energyShield;
        if(energyShield.isEnabled){
            sustainEnergyCosts.push(Number(energyShield.energy));
            sustainEnergyCostsText.push(`エナジーシールド: +${energyShield.energy}`);
        }
        if(enableOverload){
            sustainEnergyCosts.push(4);
            sustainEnergyCostsText.push("オーバーロード: +4");
        }

        // 搭載能力の継続消費ENを算出
        const checkList: string[] = ["パワーブースト", "エリミネート", "バリアホーン", "オートバレルスタンド", "ホバリング移動", "オプション", "遠隔操作"];
        checkList.forEach((moduleName) => {
            const module = getModule(armorIndex, moduleName as any);
            if(module.isEquipped && (module.isEnabled || passiveModuleNames.includes(module.name as any))){
                sustainEnergyCosts.push(module.sustainEnergyCost);
                sustainEnergyCostsText.push(`${module.name}: +${module.sustainEnergyCost}`);
            }
        });

        // 消費EN軽減の適用
        const saveEnergy = getModule(armorIndex, "エネルギー系効率化");
        if(saveEnergy.isEquipped){
            sustainEnergyCosts.push(Number(saveEnergy.texts[0]));
            sustainEnergyCostsText.push(`エネルギー系効率化: ${saveEnergy.texts[0]}`);
        }

        

        const totalCost = sustainEnergyCosts.reduce((a, b) => a + b, 0);
        const voucher = sustainEnergyCostsText.join("\n");
        return {
            totalCost,
            voucher
        };
    }

    return (
        <Button
            className="draggable-disable"
            onClick={() => {

                changeName(data.powerArmors[armorIndex].armorName);
            }}
        >
            継続EN消費
        </Button>
    );
}
