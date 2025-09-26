import { createContext, useEffect, useState } from "react";
import { getAllArmorsWithPcName, setStorage, StorageData } from "../utils/controlChromeData";
import { getInitialArmorData, ModuleName, ModuleState } from "../utils/getPowerArmorData";

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
    swapTab(index: number, direction: 1 | -1): void;
    setTabIndex: React.Dispatch<React.SetStateAction<number>>;
    addArmor: () => void;
    removeArmor: (index: number) => void;
    saveData: () => void;
    getModule(armorIndex: number, moduleName: ModuleName): ModuleState;
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

    // タブを入れ替える関数
    function swapTab(index: number, direction: 1 | -1){
        const powerArmors = [...data.powerArmors];
        const targetIndex = index + direction;

        if (targetIndex < 0 || targetIndex >= powerArmors.length) return;

        [powerArmors[index], powerArmors[targetIndex]] = [powerArmors[targetIndex], powerArmors[index]];

        setData({
            ...data,
            powerArmors,
        });
}

    // パワーアーマーデータを新規追加する関数
    function addArmor(){
        setData(prev => ({
            ...prev,
            powerArmors: [
                ...prev.powerArmors,
                getInitialArmorData("")
            ]
        }))
    }

    // パワーアーマーデータを削除する関数
    function removeArmor(index: number){
        if(armorIndex >= index) setArmorIndex(prev => {
            if(prev === 0) return 0;
            return prev - 1;
        });
        if(tabIndex - 1 >= index) setTabIndex(prev => { // 基本情報タブを除くので-1
            return prev - 1;
        });
        setData(prev => ({
            ...prev,
            powerArmors: prev.powerArmors.filter((_, i) => i !== index)
        }));
    }

    // dataをChromeのローカルストレージに保存する関数
    function saveData(){
        setStorage("characterName", data.characterName);
        setStorage("powerArmors", data.powerArmors);
    }

    // dataからパワーアーマーの搭載能力を1つ指定して取得する関数
    function getModule(armorIndex: number, moduleName: ModuleName): ModuleState{
        const result: ModuleState | undefined = data.powerArmors[armorIndex].modules.find(module => module.name === moduleName);
        if(!result) throw new Error("指定された搭載能力名が間違っています。");
        return result;
    }

    // 拡張機能読み込み時、Chromeのローカルストレージを読み込んで初期化する
    useEffect(() => {
        getAllArmorsWithPcName().then(data => setData(data));
    }, []);

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
                tabIndex, setTabIndex,
                swapTab,
                addArmor, removeArmor,
                saveData,
                getModule
            }}
        >
            {children}
        </DataContext.Provider>
    );
}
