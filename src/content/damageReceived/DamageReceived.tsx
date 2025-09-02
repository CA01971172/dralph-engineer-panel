import { useState } from "react";
import DefenseLevelSlider from "./DefenseLevelSlider";
import SelectParts from "./SelectParts";

// パワーアーマーの部位名
const partsNames = [ "頭", "胴体", "右手", "左手", "右足", "左足" ];

// 特殊装甲リスト
const specialArmorList = [
    {
        armorName: "物理装甲",
        enable: false
    },
    {
        armorName: "魔法装甲",
        enable: true
    },
    {
        armorName: "息装甲",
        enable: false
    },
    {
        armorName: "火耐性",
        enable: false
    },
    {
        armorName: "氷耐性",
        enable: false
    },
    {
        armorName: "風耐性",
        enable: false
    },
    {
        armorName: "土耐性",
        enable: false
    },
    {
        armorName: "雷耐性",
        enable: false
    },
    {
        armorName: "水耐性",
        enable: false
    },
    {
        armorName: "光耐性",
        enable: false
    },
    {
        armorName: "闇耐性",
        enable: false
    }
]

type Props = {
    enableOverload: boolean;
    setEnableOverload: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function DamageReceived( props: Props ){
    const {
        enableOverload,
        setEnableOverload
    } = props;

    const [partsIndex, setPartsIndex] = useState<number>(0); // 選択中のアーマー部位インデックス
    const [sliderValue, setSliderValue] = useState<number>(0); // 防御力段階スライダーの値
    const [enableEmergencyShield, setEnableEmergencyShield] = useState<boolean>(false); // 緊急シールドの有無
    const [enableBarrierHorn, setEnableBarrierHorn] = useState<boolean>(false); // バリアホーンの有無

    return (
        <div style={{ width: "100%" }}>
            <div>
                <SelectParts
                    partsNames={partsNames}
                    partsIndex={partsIndex}
                    setPartsIndex={setPartsIndex}
                />
            </div>
            <div>
                <DefenseLevelSlider
                    sliderValue={sliderValue}
                    setSliderValue={setSliderValue}
                />
            </div>
        </div>
    );
};
