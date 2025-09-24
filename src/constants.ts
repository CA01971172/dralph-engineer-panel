// パワーアーマーの部位名
const partsNames = [ "頭", "胴体", "右手", "左手", "右足", "左足" ];
export default partsNames;

// 搭載能力一覧
type Module = {
    visible?: false;
    name: string;
    shortName: string;
    type: "weapon" | "gadget" | "passive";
    energyCost: number;
    sustainEnergyCost: number;
    text: string | null;
    subText?: string;
    levelDiffs?: Record<number, ModuleLevelDiff>; // 強化レベルの差分
}

// 強化レベルの差分
type ModuleLevelDiff = Partial<Pick<Module, "energyCost" | "sustainEnergyCost" | "text">> & {
    levelNote?: string; // レベルに応じた注釈
};

const armorModules: Module[] = [
    {
        name: "攻撃命中率増加",
        shortName: "命増",
        type: "passive",
        energyCost: 0,
        sustainEnergyCost: 0,
        text: "+15",
        levelDiffs: {
            1: { text: "+20" },
            2: { text: "+25" },
            3: { text: "+30" },
            4: { text: "+35" },
            5: { text: "+40" },
            6: { text: "+45" },
            7: { text: "+50" },
            8: { text: "+60" },
            9: { text: "+70" },
            10: { text: "+85" }
        }
    },
    {
        visible: false,
        name: "状態異常耐性",
        shortName: "各状耐",
        type: "passive",
        energyCost: 0,
        sustainEnergyCost: 0,
        text: null
    },
    {
        name: "スキャン強化搭載",
        shortName: "スキ強",
        type: "passive",
        energyCost: 0,
        sustainEnergyCost: 0,
        text: "+20",
        levelDiffs: {
            1: { text: "+30" },
            2: { text: "+40" },
            3: { text: "+50" },
            4: { text: "+50", levelNote: "回避回数+1" },
            5: { text: "+80", levelNote: "回避回数+1" },
            6: { text: "+110", levelNote: "回避回数+1" },
            7: { text: "+110", levelNote: "回避回数+2" }
        }
    },
    {
        visible: false,
        name: "耐久増加",
        shortName: "耐増",
        type: "passive",
        energyCost: 0,
        sustainEnergyCost: 0,
        text: null
    },
    {
        visible: false,
        name: "EN増加",
        shortName: "EN増",
        type: "passive",
        energyCost: 0,
        sustainEnergyCost: 0,
        text: null
    },
    {
        visible: false,
        name: "行動P",
        shortName: "行P",
        type: "passive",
        energyCost: 0,
        sustainEnergyCost: 0,
        text: null
    },
    {
        visible: false,
        name: "環境耐性",
        shortName: "環耐",
        type: "passive",
        canQuickUse: true,
        energyCost: 0,
        sustainEnergyCost: 0,
        requiresRoll: false,
        text: null
    },
    {
        name: "エネルギー系効率化",
        shortName: "EN効率",
        type: "passive",
        canQuickUse: true,
        energyCost: 0,
        sustainEnergyCost: 0,
        requiresRoll: false,
        text: "-1",
        levelDiffs: {
            7: { text: "-2" },
            8: { text: "-3" }
        }
    },
    {
        visible: false,
        name: "緊急シールド",
        shortName: "緊シ",
        type: "passive",
        canQuickUse: true,
        energyCost: 0,
        sustainEnergyCost: 0,
        text: null,
        requiresRoll: false
    },
    {
        visible: false,
        name: "脳内保護",
        shortName: "脳保",
        type: "passive",
        canQuickUse: true,
        energyCost: 0,
        sustainEnergyCost: 0,
        text: null,
        requiresRoll: false
    },
    {
        name: "回避強化",
        shortName: "回強",
        type: "passive",
        canQuickUse: true,
        energyCost: 0,
        sustainEnergyCost: 0,
        text: "+20",
        requiresRoll: false,
        levelDiffs: {
            1: { text: "+25" },
            2: { text: "+30" },
            3: { text: "+35" },
            4: { text: "+45" },
            5: { text: "+55" },
            6: { text: "+65" },
            7: { text: "+85" },
            8: { text: "+105" },
            9: { text: "+135" },
            10: { text: "+185" }
        }
    },
    {
        visible: false,
        name: "ホーリープロテクト",
        shortName: "ホリプロ",
        type: "passive",
        canQuickUse: true,
        energyCost: 0,
        sustainEnergyCost: 0,
        text: null,
        requiresRoll: false,
    },
    {
        visible: false,
        name: "パワーブースト",
        shortName: "パワブ",
        type: "passive",
        canQuickUse: true,
        energyCost: 0,
        sustainEnergyCost: 2,
        text: "+20", // STR増加
        subText: "+1", // DB増加
        requiresRoll: false
    },
    {
        visible: false,
        name: "応急パック",
        shortName: "応急",
        type: "passive",

    }
]
