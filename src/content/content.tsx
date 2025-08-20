import React from 'react'; // Reactをインポート
import { createRoot } from 'react-dom/client'; // createRoot をインポート
import App from "./App";

// ポータルを追加するためのルート要素を作成する関数
function addPortalRoot(): HTMLDivElement{
    // ポータルを追加するためのルート要素を作成
    const portalRoot = document.createElement('div');
    portalRoot.id = 'portal-root-dralph-engineer-panel';
    portalRoot.style.position = "relative";
    portalRoot.style.zIndex = "1205";
    document.body.appendChild(portalRoot);
    return portalRoot;
}

// ポータルにAppコンポーネントを追加する関数
async function renderApp(portal: HTMLDivElement): Promise<void>{
    const root = createRoot(portal); // ルートを作成
    root.render( // renderメソッドを使用
        <React.StrictMode>
            <App/>
        </React.StrictMode>
    );
}

window.onload = async function(){
    const portal: HTMLDivElement = addPortalRoot();
    renderApp(portal);
};
