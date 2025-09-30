import { useContext } from 'react';
import { Button } from '@mui/material';
import { changeName, sendCcfoliaMessage } from '../../utils/sendCcfoliaMessage';
import { DataContext } from '../DataProvider';
import CheckBoxLabel from '../../ui/CheckBoxLabel';
import ModuleRow from '../../ui/ModuleRow';

export default function OverloadPanel() {
    const {
        data,
        enableOverload,
        setEnableOverload
    } = useContext(DataContext);

    // オーバーロードの発動を行うボタンの処理用関数
    function handleUseOverload(){
        changeName(data.characterName); // ココフォリア上でキャラクター名を変更する
        const skillText: string = 
`「オーバーロード」
パワーアーマー装備中に発動可能、
永続的に以下の効果を得る(解除無効)。
・継続消費EN+4
・与ダメージ1.5倍
・被ダメージ0.75倍
・エナジーブレードの攻撃回数+1`
        const isSent: boolean = sendCcfoliaMessage([skillText]);
        if(isSent) setEnableOverload(true); // オーバーロードを発動した場合、stateで管理する
    };

    return (
        <ModuleRow
            button={
                <Button
                    className="draggable-disable"
                    onClick={handleUseOverload}
                >
                    オーバーロード発動
                </Button>
            }
            checkbox={
                <CheckBoxLabel
                    label="継続"
                    isChecked={enableOverload}
                    setIsChecked={() => setEnableOverload(!enableOverload)}
                />
            }
        />
    );
}
