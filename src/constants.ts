// パワーアーマーの部位名
export const partsNames = [ "頭", "胴体", "右手", "左手", "右足", "左足" ];

// 搭載能力の型
type Module = {
    visible?: false;
    name: string;
    shortName: string;
    type: "weapon" | "gadget" | "passive";
    maxEquip: number;
    energyCost: number;
    sustainEnergyCost: number;
    coolDown: number | null;
    texts: string[];
    levelDiffs?: Record<number, ModuleLevelDiff>; // 強化レベルの差分
}

// 強化レベルの差分の型
type ModuleLevelDiff = Partial<Pick<Module, "energyCost" | "sustainEnergyCost" | "coolDown" | "texts">> & {
    levelNote?: string; // レベルに応じた注釈
};

// 搭載能力と強化内容一覧
export const armorModules: Module[] = [
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
            1: { coolDown: null,
        texts: ["+20"] },
            2: { coolDown: null,
        texts: ["+25"] },
            3: { coolDown: null,
        texts: ["+30"] },
            4: { coolDown: null,
        texts: ["+35"] },
            5: { coolDown: null,
        texts: ["+40"] },
            6: { coolDown: null,
        texts: ["+45"] },
            7: { coolDown: null,
        texts: ["+50"] },
            8: { coolDown: null,
        texts: ["+60"] },
            9: { coolDown: null,
        texts: ["+70"] },
            10: { coolDown: null,
        texts: ["+85"] }
        }
    },
    {
        visible: false,
        name: "状態異常耐性",
        shortName: "各状耐",
        type: "passive",
        maxEquip: 1,
        energyCost: 0,
        sustainEnergyCost: 0,
        coolDown: null,
        texts: []
    },
    {
        visible: false,
        name: "スキャン強化搭載",
        shortName: "スキ強",
        type: "passive",
        maxEquip: 1,
        energyCost: 0,
        sustainEnergyCost: 0,
        coolDown: null,
        texts: ["+20"],
        levelDiffs: {
            1: { coolDown: null,
        texts: ["+30"] },
            2: { coolDown: null,
        texts: ["+40"] },
            3: { coolDown: null,
        texts: ["+50"] },
            4: { coolDown: null,
        texts: ["+50", "1"] },
            5: { coolDown: null,
        texts: ["+80", "1"] },
            6: { coolDown: null,
        texts: ["+110", "1"] },
            7: { coolDown: null,
        texts: ["+110", "2"] }
        }
    },
    {
        visible: false,
        name: "耐久増加",
        shortName: "耐増",
        type: "passive",
        maxEquip: 2,
        energyCost: 0,
        sustainEnergyCost: 0,
        coolDown: null,
        texts: []
    },
    {
        visible: false,
        name: "EN増加",
        shortName: "EN増",
        type: "passive",
        maxEquip: 2,
        energyCost: 0,
        sustainEnergyCost: 0,
        coolDown: null,
        texts: []
    },
    {
        visible: false,
        name: "行動P",
        shortName: "行P",
        type: "passive",
        maxEquip: 1,
        energyCost: 0,
        sustainEnergyCost: 0,
        coolDown: null,
        texts: []
    },
    {
        visible: false,
        name: "環境耐性",
        shortName: "環耐",
        type: "passive",
        maxEquip: 1,
        energyCost: 0,
        sustainEnergyCost: 0,
        coolDown: null,
        texts: []
    },
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
            7: { coolDown: null,
        texts: ["-2"] },
            8: { coolDown: null,
        texts: ["-3"] }
        }
    },
    {
        visible: false,
        name: "緊急シールド",
        shortName: "緊シ",
        type: "passive",
        maxEquip: 1,
        energyCost: 0,
        sustainEnergyCost: 0,
        coolDown: null,
        texts: []
    },
    {
        visible: false,
        name: "脳内保護",
        shortName: "脳保",
        type: "passive",
        maxEquip: 1,
        energyCost: 0,
        sustainEnergyCost: 0,
        coolDown: null,
        texts: []
    },
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
            1: { coolDown: null,
        texts: ["+25"] },
            2: { coolDown: null,
        texts: ["+30"] },
            3: { coolDown: null,
        texts: ["+35"] },
            4: { coolDown: null,
        texts: ["+45"] },
            5: { coolDown: null,
        texts: ["+55"] },
            6: { coolDown: null,
        texts: ["+65"] },
            7: { coolDown: null,
        texts: ["+85"] },
            8: { coolDown: null,
        texts: ["+105"] },
            9: { coolDown: null,
        texts: ["+135"] },
            10: { coolDown: null,
        texts: ["+185"] }
        }
    },
    {
        visible: false,
        name: "ホーリープロテクト",
        shortName: "ホリプロ",
        type: "passive",
        maxEquip: 1,
        energyCost: 0,
        sustainEnergyCost: 0,
        coolDown: null,
        texts: []
    },
    {
        visible: false,
        name: "パワーブースト",
        shortName: "パワブ",
        type: "passive",
        maxEquip: 1,
        energyCost: 0,
        sustainEnergyCost: 2,
        coolDown: null,
        texts: ["+20", "+1"]
    },
    {
        visible: false,
        name: "応急パック",
        shortName: "応急",
        type: "passive",
        maxEquip: 1,
        energyCost: 0,
        sustainEnergyCost: 0,
        coolDown: null,
        texts: []
    },
    {
        visible: false,
        name: "遊泳能力追加",
        shortName: "遊泳",
        type: "passive",
        maxEquip: 1,
        energyCost: 0,
        sustainEnergyCost: 0,
        coolDown: null,
        texts: ["+20", "1"]
    },
    {
        visible: false,
        name: "エリミネート",
        shortName: "エリミ",
        type: "passive",
        maxEquip: 1,
        energyCost: 0,
        sustainEnergyCost: 2,
        coolDown: null,
        texts: []
    },
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
            4: { coolDown: null,
        texts: ["12d6", "17d6", "22d6", "32d6"] },
            5: { coolDown: null,
        texts: ["14d6", "19d6", "24d6", "34d6"] },
            6: { coolDown: null,
        texts: ["16d6", "21d6", "26d6", "36d6"] },
            7: { coolDown: null,
        texts: ["18d6", "23d6", "28d6", "43d6"] },
            8: { coolDown: null,
        texts: ["20d6", "25d6", "30d6", "45d6"] },
            9: { coolDown: null,
        texts: ["24d6", "29d6", "34d6", "54d6"] },
            10: { coolDown: null,
        texts: ["28d6", "33d6", "38d6", "63d6"] }
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
    {
        visible: false,
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
    },
    {
        visible: false,
        name: "ホバリング移動",
        shortName: "ホバ",
        type: "passive",
        maxEquip: 1,
        energyCost: 0,
        sustainEnergyCost: 1,
        coolDown: null,
        texts: []
    },
    {
        visible: false,
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
    },
    {
        visible: false,
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
    },
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
    {
        visible: false,
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
    },
    {
        visible: false,
        name: "ミニミサイル",
        shortName: "ミミ",
        type: "weapon",
        maxEquip: 2,
        energyCost: 3,
        sustainEnergyCost: 0,
        coolDown: 2,
        texts: ["8d8"]
    },
    {
        visible: false,
        name: "遠隔操作",
        shortName: "遠操",
        type: "passive",
        maxEquip: 1,
        energyCost: 0,
        sustainEnergyCost: 2,
        coolDown: null,
        texts: ["1"]
    }
]

// 強化レベルから適切な搭載能力の内容を返す関数
export function getModuleAtLevel(module: Module, level: number): Module{
    if (!module.levelDiffs) return module;

    // level以下で最大の差分レベルを探す
    const availableLevels: number[] = Object.keys(module.levelDiffs)
        .map(Number)
        .filter(l => l <= level);

    // どの差分も適用できないなら、ベースを返す
    if (availableLevels.length === 0) return module;

    const latestLevel: number = Math.max(...availableLevels); // level以下で最大の差分レベル
    const diff: ModuleLevelDiff = module.levelDiffs[latestLevel]; // 適切な強化内容の差分

    return {
        ...module,
        ...diff,
    };
}
