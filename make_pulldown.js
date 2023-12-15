function make_pulldown(pairList, sectionNum, pulldownId) {
    /* プルダウンdomの作成。引数はメニューの文字列とURLのオブジェクト配列、セクション番号、id */
    const child_target = document.getElementsByTagName("section")[sectionNum].getElementsByTagName("div")[0];
    const p = new Pulldown_clientPage(pulldownId, child_target, pairList);
    p.update(p.assemble());
    return child_target;
}
  
let COUNTER = 1; //非同期処理の回数カウンター
const INTERVAL_ID = setInterval(main_pulldown, 100); //非同期処理の設定と削除用変数

async function main_pulldown() {
    /* 社員番号と該当するレコードを探索。非同期処理。 */
    const procedurePairList = {
        "保険加入": "https://kviewer.kintoneapp.com/private/74ca70624657a0fe74201410b34cdb20919e924e60dfd688003a1b70e4d3f4ee",
        "扶養追加": "https://kviewer.kintoneapp.com/private/8a2d1f589a6abcf369c268cd19cbe4bdda498c1e7812f57429b1e0114c027aad",
        "扶養削除": "https://kviewer.kintoneapp.com/private/8a2d1f589a6abcf369c268cd19cbe4bdda498c1e7812f57429b1e0114c027aad",
        "マイナンバー": "https://5ea2a167.viewer.kintoneapp.com/public/5608d6a5bb7b937bc0800ede06698f700bb28a89adad481a0ad0da515b9cccb0",
        "出産（本人）": "#",
        "出産（配偶者）": "#",
        "業務災害": "#",
        "通勤災害": "#",
        "私傷病": "#",
        "被保険者証再交付": "#",
        "限度額適用認定証": "#"
    }
    const personnnelManagementPairList = {
        "従業員名簿": "#",
        "給与・賞与履歴": "#",
        "職位履歴": "#",
        "雇用条件履歴": "#",
        "懲戒履歴": "#",
        "事故・問題履歴": "#",
        "休業・休職履歴": "#",
        "育休・介護履歴": "#",
        "労災履歴": "#",
        "死亡履歴": "#",
        "アレルギー登録歴": "#",
        "アレルギー発症歴": "#"
    }
    try {
        const procedureTargetDom = make_pulldown(procedurePairList, 4, "その他手続き");
        const personnnelManagementTargetDom = make_pulldown(personnnelManagementPairList, 5, "人事管理");
        if (procedureTargetDom === undefined || personnnelManagementTargetDom === undefined) {
            throw new Error('loading error');
        }
        clearInterval(INTERVAL_ID); //非同期処理を削除
        COUNTER = 1;
        return;
    } catch(e) {
        console.error(e.message);
    }
    console.log("try: ", COUNTER++);
    /* カウンターが一定回数を超えたら非同期処理を停止 */
    if (COUNTER > 30) {
        clearInterval(INTERVAL_ID);
        console.log("error: employees page could not be loaded.");
    }
}