import { decrementParamsWithResult } from "./../utils/decrementParams"
import { changeMessage, changeName, clickSubmitButton } from "./sendCcfoliaMessage";

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
    const damageRoll: string = `C(${inputDamage})${scale}${scaleDividerText}${armorsFinalText} ${labelText}`;
    decrementParamsWithResult(damageRoll, [partsName], name1, name2);
}

export function calculateDeployableDamage({
    inputDamage,
    armorValue,
    defenseValue,
    additionalDefense,
    enableBarrierHorn,
    name
}: {
    inputDamage: number,
    armorValue: number,
    defenseValue: number,
    additionalDefense: number,
    enableBarrierHorn: boolean,
    name: string
}){
    if(inputDamage === 0) return;

    // 防御倍率を算出
    const scale: number = [2, 1.75, 1.50, 1, 0.75, 0.5, 0.25][defenseValue + 3];
    const additionalScale: number = additionalDefense / 100;
    const barrierHornScale: number = enableBarrierHorn ? 0.5 : 1;

    // ダメージ計算
    const enableScales: number[] = [scale, additionalScale, barrierHornScale].filter(s => s !== 1);
    const scalesText: string = enableScales.length > 0 ? `×${enableScales.join("×")}` : "";
    const armorText: string = armorValue > 0 ? `-${armorValue}` : "";
    const calculateText: string = `${inputDamage}${scalesText}${armorText}`;
    const damage: number = Math.max(0, Math.round(inputDamage * scale * additionalScale * barrierHornScale) - armorValue);
    const pasteText: string = `:耐久値-${damage}  (${calculateText})`;

    const isChangedName = changeName(name);
    const isChangedMessage = changeMessage(pasteText);
    // 名前もメッセージも変更されなかった場合、送信する
    if(!isChangedName && !isChangedMessage) clickSubmitButton();
}
