console.log('バックグラウンドサービスワーカーが起動しました。');

chrome.runtime.onInstalled.addListener(() => {
  console.log('拡張機能がインストールまたは更新されました。');
  // インストール時にデフォルト設定を保存
  chrome.storage.sync.set({ isEnabled: true, apiKey: '' });

  // コンテキストメニューの作成例
  chrome.contextMenus.create({
    id: "myReactExtensionContextMenu",
    title: "選択したテキストを処理",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "myReactExtensionContextMenu" && info.selectionText) {
    console.log("選択されたテキスト:", info.selectionText);
    // ここで選択されたテキストに対する処理を実装できます
    // 例: content script にメッセージを送信
    if (tab?.id) {
      chrome.tabs.sendMessage(tab.id, {
        action: "processSelectedText",
        text: info.selectionText
      });
    }
  }
});

// 他のバックグラウンド処理 (メッセージリスナーなど) をここに追加できます
