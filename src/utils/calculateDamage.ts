import { decrementParamsWithResult } from "./../utils/decrementParams"

export function calculateDamage({
    partsName,
    enableEnergyShield,
    shieldEnergy,
    defenseValue,
    additionalDefense,
    armors,
    enableOverload,
    enableBarrierHorn,
    enableEmergencyShield
}: {
    partsName: string,
    enableEnergyShield: boolean,
    shieldEnergy: number,
    defenseValue: number,
    additionalDefense: number,
    armors: string[],
    enableOverload: boolean,
    enableBarrierHorn: boolean,
    enableEmergencyShield: boolean
}){
    const text = `相手が出したダメージを入力してください。\n被ダメージ計算後、${partsName}の耐久値を減少させます。`;
    const inputDamage = prompt(text);
    if(inputDamage === null) return;

    // 防御倍率を算出
    let scale: string = ""
    let scaleDivider: number = 1;
    if(defenseValue !== 0){
        scale += "*" + ["200", "175", "150", "100", "75", "50", "25"][defenseValue + 3];
        scaleDivider *= 100;
    }
    if(additionalDefense !== 100){
        scale += `*${additionalDefense}`;
        scaleDivider *= 100;
    }
    if(enableOverload){
        scale += "*75";
        scaleDivider *= 100;
    }
    if(enableBarrierHorn){
        scale += "*75";
        scaleDivider *= 100;
    }
    if(enableEmergencyShield){
        scale += "*50";
        scaleDivider *= 100;
    }
    const scaleDividerText = (scaleDivider !== 1) ? `/${scaleDivider}` : "";

    // 装甲類の計算
    const energyShieldArmor: string = enableEnergyShield ? `${shieldEnergy}*5` : "";
    const armorsText: string = armors.map(armor => `{${armor}}`).join("+");
    const holeArmorsText = [energyShieldArmor, armorsText].filter(Boolean).join("+");
    const armorsFinalText = (holeArmorsText !== "") ? `-(${holeArmorsText})` : "";

    // ダメージ計算ロール
    const damageRole = `C(${inputDamage})${scale}${scaleDividerText}${armorsFinalText}`;
    decrementParamsWithResult(damageRole, [partsName]);
}
