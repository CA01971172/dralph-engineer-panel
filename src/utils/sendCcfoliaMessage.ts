import { messageFormQuery, nameFormQuery, submitFormQuery } from "./documentQueries";

// フォームのinput要素等の既存の入力内容を削除する関数
function clearFormValue(element: HTMLInputElement|HTMLTextAreaElement) :void{
    element.focus()
    document.execCommand("selectAll", false);
    document.execCommand("removeFormat", false);
}

// フォームのinput要素等に内容を入力する関数
function addFormValue(element: HTMLInputElement|HTMLTextAreaElement, value: string): void{
    element.focus()
    document.execCommand('insertText', false, value);
}

// フォームのinput要素等の内容を上書きする関数
function overrideFormValue(element: HTMLInputElement|HTMLTextAreaElement, value: string): void{
    clearFormValue(element)
    addFormValue(element, value)
}

// 特定のbutton要素をプログラムで押下する関数
function clickTheButton(element: HTMLButtonElement){
    element.click()
}

// キャラクター名を変更する関数
export function changeName(characterName: string, isDo: boolean = true): boolean { // キャラ名を編集する関数
    const nameElm = document.querySelector<HTMLInputElement>(nameFormQuery) as HTMLInputElement;
    if (nameElm?.value !== characterName) {
        if(isDo) overrideFormValue(nameElm, characterName);
        return true;
    }else{
        return false;
    }
}

// メッセージを変更する関数
// isDoがtrueなら変更する。falseなら変更しない(変更されているかどうかの確認のみ)
// メッセージが変更された場合はtrue、変更されなかった場合はfalseを返す
export function changeMessage(messageText: string, isDo: boolean = true): boolean {
    const messageElm = document.querySelector<HTMLTextAreaElement>(messageFormQuery) as HTMLTextAreaElement;
    if (messageElm?.value !== messageText) {
        if(isDo) overrideFormValue(messageElm, messageText);
        return true;
    }else{
        return false;
    }
}

// 送信ボタンを押下して送信する関数
export function clickSubmitButton(){
    const submitButton: HTMLButtonElement = document.querySelector(submitFormQuery) as HTMLButtonElement
    clickTheButton(submitButton)
}

// 間隔を空けて複数メッセージを送信する関数
async function sendMessagesWithDelay(messages: string[], interval: number = 100){
    for(const message of messages){
        changeMessage(message)
        clickSubmitButton()
        await new Promise((resolve) => setTimeout(resolve, interval));// 指定された時間だけ待機する
    }
    changeMessage("")
}

// ココフォリアのメッセージを送信する関数
// returns: メッセージが変更されていない(=送信した)場合はtrue、変更された(=送信していない)場合はfalseを返す
export function sendCcfoliaMessage(messages: string[], name?: string): boolean{
    if(messages.length > 0){
        const isChangedMessage: boolean = changeMessage(messages[0]); // メッセージを変更する
        if(name !== undefined){
            const nameElm = document.querySelector<HTMLInputElement>(nameFormQuery) as HTMLInputElement;
            const inputName: string = nameElm?.value || "";
            if(inputName !== name){
                changeName(name);
                return false; // 名前が変更された場合、メッセージは送信しない
            }
        }
        if(!isChangedMessage){ // メッセージが変更されていない、かつ名前が変更されていない場合
            // メッセージに変更なければ送信する
            if(messages.length === 1){
                // メッセージが1つのとき
                clickSubmitButton();
            }else{
                // メッセージが複数のとき、
                sendMessagesWithDelay(messages);
            }
        }
        return !isChangedMessage;
    }
    return false;
}
