import { decrementParamsWithResult } from "./../utils/decrementParams"

export function calculateDamage({
    partsName,
    enableEnergyShield,
    shieldEnergy,
    defenseValue,
    additionalDefense,
    additionalArmors,
    enableOverload,
    enableBarrierHorn,
    enableEmergencyShield,
    name1,
    name2
}: {
    partsName: string,
    enableEnergyShield: boolean,
    shieldEnergy: number,
    defenseValue: number,
    additionalDefense: number,
    additionalArmors: string[],
    enableOverload: boolean,
    enableBarrierHorn: boolean,
    enableEmergencyShield: boolean,
    name1?: string,
    name2?: string
}){
    const text = `相手が出したダメージを入力してください。\n被ダメージ計算後、${partsName}の耐久値を減少させます。`;
    const inputDamage: string | null = prompt(text);
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
    const scaleDividerText: string = (scaleDivider !== 1) ? `/${scaleDivider}` : "";

    // 装甲類の計算
    const energyShieldArmor: string = enableEnergyShield ? `${shieldEnergy}*5` : "";
    const armorsText: string = additionalArmors.map(armor => `{${armor}}`).join("+");
    const holeArmorsText: string = [energyShieldArmor, armorsText].filter(Boolean).join("+");
    const armorsFinalText: string = (holeArmorsText !== "") ? `-(${holeArmorsText})` : "";

    // ダメージ計算ロール
    const labelText: string = enableEnergyShield ? "【被ダメージ(エナジーシールド)】" : "【被ダメージ】";
    const damageRole: string = `C(${inputDamage})${scale}${scaleDividerText}${armorsFinalText} ${labelText}`;
    decrementParamsWithResult(damageRole, [partsName], name1, name2);
}
