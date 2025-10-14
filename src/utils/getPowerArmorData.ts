// パワーアーマーの部位名
export const partsNames = [ "頭", "胴体", "右手", "左手", "右足", "左足" ];

export type PowerArmor = {
    armorName: string; // パワーアーマー名
    modules: ModuleState[]; // 搭載能力
}

// 搭載能力データの型
type ModuleData = {
    name: string; // 搭載能力名
    shortName: string; // 搭載能力の略称
    type: "weapon" | "gadget" | "passive"; // 搭載能力の種別
    maxEquip: number; // 1体当たりの搭載可能数
    energyCost: number; // 消費EN
    sustainEnergyCost: number; // 継続EN
    coolDown: number | null; // 再使用可能ターン
    texts: string[]; // ダメージロールや回復ロールの値、技能補正値等
    levelDiffs?: Record<number, ModuleLevelDiff>; // 強化レベルの差分
}

// 強化レベルの差分の型
type ModuleLevelDiff = Partial<Pick<ModuleData, "energyCost" | "sustainEnergyCost" | "coolDown" | "texts">> & {
    levelNote?: string; // レベルに応じた注釈
};

// state管理用の搭載能力データ
export type ModuleState = Pick<ModuleData, (
    "name" | 
    "energyCost" | 
    "sustainEnergyCost" | 
    "coolDown" | 
    "texts"
)> & {
    isEquipped: boolean; // 搭載されているかどうか
    isEnabled: boolean; // 有効かどうか(設置物等)
    level: number; // 強化レベル
    pieceName: string; // キャラコマ名(設置物系)
}

// 搭載能力と強化内容一覧
export const modulesList = [
    {
        name: "攻撃命中率増加",
        shortName: "命増",
        type: "passive",
        maxEquip: 1,
        energyCost: 0,
        sustainEnergyCost: 0,
        coolDown: null,
        texts: ["+15"],
        levelDiffs: {
            1: { texts: ["+20"] },
            2: { texts: ["+25"] },
            3: { texts: ["+30"] },
            4: { texts: ["+35"] },
            5: { texts: ["+40"] },
            6: { texts: ["+45"] },
            7: { texts: ["+50"] },
            8: { texts: ["+60"] },
            9: { texts: ["+70"] },
            10: { texts: ["+85"] }
        }
    },
    /* {
        name: "状態異常耐性",
        shortName: "各状耐",
        type: "passive",
        maxEquip: 1,
        energyCost: 0,
        sustainEnergyCost: 0,
        coolDown: null,
        texts: []
    }, */
    /* {
        name: "スキャン強化搭載",
        shortName: "スキ強",
        type: "passive",
        maxEquip: 1,
        energyCost: 0,
        sustainEnergyCost: 0,
        coolDown: null,
        texts: ["+20"],
        levelDiffs: {
            1: { texts: ["+30"] },
            2: { texts: ["+40"] },
            3: { texts: ["+50"] },
            4: { texts: ["+50", "1"] },
            5: { texts: ["+80", "1"] },
            6: { texts: ["+110", "1"] },
            7: { texts: ["+110", "2"] }
        }
    }, */
    /* {
        name: "耐久増加",
        shortName: "耐増",
        type: "passive",
        maxEquip: 2,
        energyCost: 0,
        sustainEnergyCost: 0,
        coolDown: null,
        texts: []
    }, */
    /* {
        name: "EN増加",
        shortName: "EN増",
        type: "passive",
        maxEquip: 2,
        energyCost: 0,
        sustainEnergyCost: 0,
        coolDown: null,
        texts: []
    }, */
    /* {
        name: "行動P",
        shortName: "行P",
        type: "passive",
        maxEquip: 1,
        energyCost: 0,
        sustainEnergyCost: 0,
        coolDown: null,
        texts: []
    }, */
    /* {
        name: "環境耐性",
        shortName: "環耐",
        type: "passive",
        maxEquip: 1,
        energyCost: 0,
        sustainEnergyCost: 0,
        coolDown: null,
        texts: []
    }, */
    {
        name: "エネルギー系効率化",
        shortName: "EN効率",
        type: "passive",
        maxEquip: 1,
        energyCost: 0,
        sustainEnergyCost: 0,
        coolDown: null,
        texts: ["-1"],
        levelDiffs: {
            7: { texts: ["-2"] },
            8: { texts: ["-3"] }
        }
    },
    /* {
        name: "緊急シールド",
        shortName: "緊シ",
        type: "passive",
        maxEquip: 1,
        energyCost: 0,
        sustainEnergyCost: 0,
        coolDown: null,
        texts: []
    }, */
    /* {
        name: "脳内保護",
        shortName: "脳保",
        type: "passive",
        maxEquip: 1,
        energyCost: 0,
        sustainEnergyCost: 0,
        coolDown: null,
        texts: []
    }, */
    {
        name: "回避強化",
        shortName: "回強",
        type: "passive",
        maxEquip: 1,
        energyCost: 0,
        sustainEnergyCost: 0,
        coolDown: null,
        texts: ["+20"],
        levelDiffs: {
            1: { texts: ["+25"] },
            2: { texts: ["+30"] },
            3: { texts: ["+35"] },
            4: { texts: ["+45"] },
            5: { texts: ["+55"] },
            6: { texts: ["+65"] },
            7: { texts: ["+85"] },
            8: { texts: ["+105"] },
            9: { texts: ["+135"] },
            10: { texts: ["+185"] }
        }
    },
    /* {
        name: "ホーリープロテクト",
        shortName: "ホリプロ",
        type: "passive",
        maxEquip: 1,
        energyCost: 0,
        sustainEnergyCost: 0,
        coolDown: null,
        texts: []
    }, */
    /* {
        name: "パワーブースト",
        shortName: "パワブ",
        type: "passive",
        maxEquip: 1,
        energyCost: 0,
        sustainEnergyCost: 2,
        coolDown: null,
        texts: ["+20", "+1"]
    }, */
    /* {
        name: "応急パック",
        shortName: "応急",
        type: "passive",
        maxEquip: 1,
        energyCost: 0,
        sustainEnergyCost: 0,
        coolDown: null,
        texts: []
    }, */
    /* {
        name: "遊泳能力追加",
        shortName: "遊泳",
        type: "passive",
        maxEquip: 1,
        energyCost: 0,
        sustainEnergyCost: 0,
        coolDown: null,
        texts: ["+20", "1"]
    }, */
    /* {
        name: "エリミネート",
        shortName: "エリミ",
        type: "passive",
        maxEquip: 1,
        energyCost: 0,
        sustainEnergyCost: 2,
        coolDown: null,
        texts: []
    }, */
    {
        name: "パイルバンカー",
        shortName: "パイル",
        type: "weapon",
        maxEquip: 1,
        energyCost: 0,
        sustainEnergyCost: 0,
        coolDown: null,
        texts: ["10d6", "15d6", "20d6", "30d6"],
        levelDiffs: {
            4: { texts: ["12d6", "17d6", "22d6", "32d6"] },
            5: { texts: ["14d6", "19d6", "24d6", "34d6"] },
            6: { texts: ["16d6", "21d6", "26d6", "36d6"] },
            7: { texts: ["18d6", "23d6", "28d6", "43d6"] },
            8: { texts: ["20d6", "25d6", "30d6", "45d6"] },
            9: { texts: ["24d6", "29d6", "34d6", "54d6"] },
            10: { texts: ["28d6", "33d6", "38d6", "63d6"] }
        }
    },
    {
        name: "バリアホーン",
        shortName: "バリホ",
        type: "gadget",
        maxEquip: 1,
        energyCost: 5,
        sustainEnergyCost: 3,
        coolDown: null,
        texts: [],
        levelDiffs: {
            6: { sustainEnergyCost: 5 },
            9: { sustainEnergyCost: 7 }
        }
    },
    /* {
        name: "オートバレルスタンド",
        shortName: "オトバレ",
        type: "gadget",
        maxEquip: 1,
        energyCost: 3,
        sustainEnergyCost: 2,
        coolDown: null,
        texts: ["8d6"],
        levelDiffs: {
        }
    }, */
    /* {
        name: "ホバリング移動",
        shortName: "ホバ",
        type: "passive",
        maxEquip: 1,
        energyCost: 0,
        sustainEnergyCost: 1,
        coolDown: null,
        texts: []
    }, */
    /* {
        name: "パワーナックル",
        shortName: "パワナク",
        type: "weapon",
        maxEquip: 1,
        energyCost: 3,
        sustainEnergyCost: 0,
        coolDown: 1,
        texts: ["0"],
        levelDiffs: {
        }
    }, */
    /* {
        name: "チェインガン",
        shortName: "チェガ",
        type: "weapon",
        maxEquip: 1,
        energyCost: 2,
        sustainEnergyCost: 0,
        coolDown: 1,
        texts: ["7d6"],
        levelDiffs: {
        }
    }, */
    {
        name: "オプション",
        shortName: "オプ",
        type: "gadget",
        maxEquip: 1,
        energyCost: 2,
        sustainEnergyCost: 1,
        coolDown: null,
        texts: ["1", "2d6", "1d6+6", "0", "0"], // 効果対象数, 回復, サポート, MP回復, 回避回数+,
        levelDiffs: {
            1: { texts: ["1", "2d6", "2d6+6", "0", "0"] },
            3: { texts: ["1", "3d6", "2d6+6", "0", "0"], sustainEnergyCost: 2 },
            4: { texts: ["1", "3d6", "2d6+6", "0", "1"], sustainEnergyCost: 2 },
            5: { texts: ["1", "3d6", "3d6+6", "0", "1"], sustainEnergyCost: 2 },
            6: { texts: ["1", "5d6", "3d6+6", "0", "1"], energyCost: 4, sustainEnergyCost: 2 },
            7: { texts: ["1", "5d6", "3d6+6", "0", "2"], energyCost: 4, sustainEnergyCost: 2 },
            8: { texts: ["1", "5d6", "3d6+6", "1d6", "2"], energyCost: 4, sustainEnergyCost: 2 },
            9: { texts: ["1", "5d6", "4d6+6", "1d6", "2"], energyCost: 6, sustainEnergyCost: 2 },
            10: { texts: ["2", "5d6", "4d6+6", "1d6", "3"], energyCost: 6, sustainEnergyCost: 2 },
        }
    },
    /* {
        name: "レールガン",
        shortName: "レルガン",
        type: "weapon",
        maxEquip: 1,
        energyCost: 5,
        sustainEnergyCost: 0,
        coolDown: 4,
        texts: ["15d10"],
        levelDiffs: {
        }
    }, */
    /* {
        name: "ミニミサイル",
        shortName: "ミミ",
        type: "weapon",
        maxEquip: 2,
        energyCost: 3,
        sustainEnergyCost: 0,
        coolDown: 2,
        texts: ["8d8"]
    }, */
    /* {
        name: "遠隔操作",
        shortName: "遠操",
        type: "passive",
        maxEquip: 1,
        energyCost: 0,
        sustainEnergyCost: 2,
        coolDown: null,
        texts: ["1"]
    } */
] as const satisfies readonly ModuleData[];

// 搭載能力名から搭載能力データを取得する関数
type Names<T extends readonly { name: string }[]> = T[number]["name"];
export type ModuleName = Names<typeof modulesList>;
export function getModuleByName(name: ModuleName): ModuleData{
    const result: ModuleData | undefined = modulesList.find(module => module.name === name);
    if(!result) throw new Error("指定された搭載能力名が間違っています。");
    return result;
}

// 強化レベルから適切な搭載能力の内容を返す関数
export function getModuleAtLevel(prev: ModuleState, module: ModuleData, level: number): ModuleState{
    if (!module.levelDiffs) return { ...prev, level };

    // level以下で最大の差分レベルを探す
    const availableLevels: number[] = Object.keys(module.levelDiffs)
        .map(Number)
        .filter(l => l <= level);

    // レベル0や、適用できる差分がない場合 → ベース値（module）を使う
    if (availableLevels.length === 0) {
        return {
            ...module,
            isEquipped: prev.isEquipped,
            isEnabled: prev.isEnabled,
            level,
            pieceName: prev.pieceName
        };
    }

    const latestLevel: number = Math.max(...availableLevels); // level以下で最大の差分レベル
    const diff: ModuleLevelDiff = module.levelDiffs[latestLevel]; // 適切な強化内容の差分

    return {
        // module -> diffの順番でマージ
        ...module,
        ...diff,
        isEquipped: prev.isEquipped,
        isEnabled: prev.isEnabled,
        level,
        pieceName: prev.pieceName
    };
}

// アーマーの初期状態を取得する関数
export function getInitialArmorData(armorName: string): PowerArmor{
    return {
        armorName,
        modules: modulesList.map(module => {
            let pieceName = "";
            if(module.name === "バリアホーン") pieceName = "バリアホーン";
            if(module.name === "オプション") pieceName = "オプション";
            return {
                ...module,
                isEquipped: false,
                isEnabled: false,
                level: 0,
                pieceName
            }
        })
    }
}
