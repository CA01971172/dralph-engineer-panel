import { messageColumnQuery, nameFormQuery, roomChatQuery } from "./documentQueries";
import { changeMessage, changeName, clickSubmitButton } from "./sendCcfoliaMessage";

// 特定のダイスロール結果を元に、パラメータを減少させる関数
export async function decrementParamsWithResult(roll: string, params: string[], name1?: string, name2?: string): Promise<void>{
    console.log(name1, name2)

    // もし減少先が未指定なら、算出元と同じ名前を指定
    if(name1 !== undefined && name2 === undefined) name2 = name1;
    if(name1 === undefined && name2 !== undefined) name1 = name2;

    console.log(name1, name2)

    // キャラクター名を変更する
    if(name1 !== undefined) changeName(name1);

    // 入力内容を変更する
    changeMessage(roll);

    // キャラクター名(name1)が指定なし(undefined)なら、現在の発言キャラクターを取得しておく
    const characterName =  (document.querySelector(nameFormQuery) as HTMLInputElement)?.value || "noname";

    // ロール結果の監視を開始する
    const watchPromise: Promise<string> | undefined = watchMessage(characterName);

    // ロール結果の監視をしている間に、ロールを行う
    // 最新のメッセージの要素を取得するために、一番下までスクロールする
    const scrollMenu: HTMLElement | null = document.querySelector(roomChatQuery)
    scrollMenu?.scrollTo(0, scrollMenu.scrollHeight);
    // 送信ボタンを押して最初のロールを行う
    clickSubmitButton();

    // ロール結果を取得する
    const rollResult: string = await watchPromise;

    // ロール結果がマイナスの値なら、パラメータ減少ロールは行わない
    if((!isNaN(Number(rollResult))) && (Number(rollResult) <= 0)) return;

    // キャラクター名を変更する
    if(name2 !== undefined) changeName(name2);

    // 最初のロール結果を使用して、指定されたパラメータを減少させる
    for(let i: number = 0; i < params.length; i++){
        changeMessage(`:${params[i]}-${rollResult}`);
        clickSubmitButton();
        await new Promise((resolve) => setTimeout(resolve, 100));// 指定された時間だけ待機する
    }

    changeMessage("");
}

// 指定したテキストのロール結果を取得する関数
// 注意：メッセージが新しく送信されたのか、スクロールされてメッセージが表示されたのかは判定できない
async function watchMessage(targetCharacterName: string): Promise<string>{
    return new Promise((resolve, _reject) => {
        // 監視するDOMノードを取得
        const targetNode: HTMLDivElement | null = document.querySelector(messageColumnQuery);
        if(!targetNode) throw new Error("メッセージ欄が見当たりませんでした。")

        // MutationObserverオブジェクトを作成する
        const observer: MutationObserver = new MutationObserver(function(mutationsList, observer) {
            // 変更が検出された際に実行されるコールバック関数
            for(const mutation of mutationsList) {
                if ((mutation.type === 'childList') && (mutation.addedNodes.length > 0)) {
                    // ここに追加された要素に対する処理を記述
                    const addedMessageDiv: HTMLElement = mutation.addedNodes[0] as HTMLElement;// メッセージが送信されて追加されたDiv要素を取得する

                    // キャラ名を取得する
                    const characterNameElm: HTMLSpanElement | null = addedMessageDiv.querySelector("h6"); // キャラ名の要素
                    if(!characterNameElm) return;
                    const characterName = characterNameElm.textContent; // キャラ名
                    if(characterName !== targetCharacterName) return; // キャラ名が指定と異なる場合は、追加された要素に対する処理を終了する

                    // ロール内容を取得する
                    const rollContentElm: HTMLParagraphElement | null = addedMessageDiv.querySelector("p");
                    if(!rollContentElm) return;
                    if(!rollContentElm.firstChild) return;

                    // ロール結果を取得する
                    const rollResultElm: HTMLSpanElement | null  = rollContentElm.querySelector("span");
                    if(!rollResultElm){
                        // ロール結果がないようなロールを監視しているなら、監視を終了する
                        observer.disconnect(); // DOMの監視を終了する
                        resolve(""); // ロール結果を返してPromiseを解決する
                        return;
                    }
                    const rollResult = extractRollResult(rollResultElm.textContent || ""); // ロール結果

                    // キャラ名とロール内容が指定と一致する場合のみ、ロール結果を返す
                    observer.disconnect(); // DOMの監視を終了する
                    resolve(rollResult); // ロール結果を返してPromiseを解決する
                }
            }
        });

        // 監視オプションを設定
        const config = { childList: true, subtree: false };

        // 監視を開始
        observer.observe(targetNode, config);
    });
}

// テキストからロール結果を抽出する関数
function extractRollResult(text: string) {
    // テキスト内の最後の「＞」の位置を探す
    const arrowIndex = text.lastIndexOf("＞");

    // 「＞」が存在しない場合は空文字列を返す
    if (arrowIndex === -1) return "";

    // 「＞」の位置より右側の文字列を取得してトリムする
    const resultText = text.slice(arrowIndex + 1).trim();

    // 取得した文字列を返す
    return resultText;
}
