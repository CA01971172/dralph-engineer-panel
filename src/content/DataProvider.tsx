import { createContext, useState } from "react";
import { StorageData } from "../utils/controlChromeData";

type ContextType = {
    enableOverload: boolean;
    setEnableOverload: React.Dispatch<React.SetStateAction<boolean>>;
    shieldEnergy: string;
    setShieldEnergy: React.Dispatch<React.SetStateAction<string>>;
    armorIndex: number;
    setArmorIndex: React.Dispatch<React.SetStateAction<number>>;
    data: StorageData;
    setData: React.Dispatch<React.SetStateAction<StorageData>>;
    partsIndex: number;
    setPartsIndex: React.Dispatch<React.SetStateAction<number>>;
    sliderValue: number;
    setSliderValue: React.Dispatch<React.SetStateAction<number>>;
    additionalDefense: string;
    setAdditionalDefense: React.Dispatch<React.SetStateAction<string>>;
    enableEmergencyShield: boolean;
    setEnableEmergencyShield: React.Dispatch<React.SetStateAction<boolean>>;
    enableBarrierHorn: boolean;
    setEnableBarrierHorn: React.Dispatch<React.SetStateAction<boolean>>;
    getEnableAdditionalArmors: () => boolean;
    getAdditionalArmors: () => { armorName: string; enable: boolean }[];
    tabIndex: number;
    setTabIndex: React.Dispatch<React.SetStateAction<number>>;
};

export const DataContext = createContext<ContextType>({} as ContextType);

export function DataProvider({children}: {children: React.ReactNode}){
    const [enableOverload, setEnableOverload] = useState<boolean>(false); // オーバーロード有効化
    const [shieldEnergy, setShieldEnergy] = useState<string>("0"); // シールドEN
    const [armorIndex, setArmorIndex] = useState<number>(0); // 選択中のアーマーインデックス
    const [data, setData] = useState<StorageData>({} as StorageData); // Chromeのローカルストレージのデータ
    const [partsIndex, setPartsIndex] = useState<number>(0); // 選択中のアーマー部位インデックス
    const [sliderValue, setSliderValue] = useState<number>(0); // 防御力段階スライダーの値
    const [additionalDefense, setAdditionalDefense] = useState<string>("100"); // その他軽減倍率
    const [enableEmergencyShield, setEnableEmergencyShield] = useState<boolean>(false); // 緊急シールドの有無
    const [enableBarrierHorn, setEnableBarrierHorn] = useState<boolean>(false); // バリアホーンの有無
    const getEnableAdditionalArmors = () => data.enableAdditionalArmors; // 装甲類の有効化
    const getAdditionalArmors = () => data.additionalArmors; // 装甲リスト
    const [tabIndex, setTabIndex] = useState<number>(0); // 選択中のタブインデックス

    return (
        <DataContext.Provider
            value={{
                enableOverload, setEnableOverload,
                shieldEnergy, setShieldEnergy,
                armorIndex, setArmorIndex,
                data, setData,
                partsIndex, setPartsIndex,
                sliderValue, setSliderValue,
                additionalDefense, setAdditionalDefense,
                enableEmergencyShield, setEnableEmergencyShield,
                enableBarrierHorn, setEnableBarrierHorn,
                getEnableAdditionalArmors,
                getAdditionalArmors,
                tabIndex, setTabIndex
            }}
        >
            {children}
        </DataContext.Provider>
    );
}
