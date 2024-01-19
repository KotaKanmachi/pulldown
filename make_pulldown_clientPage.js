function make_pulldown(pairList, sectionNum, pulldownId) {
  /* プルダウンdomの作成。引数はメニューの文字列とURLのオブジェクト配列、セクション番号、id */
  const child_target = document
    .getElementsByTagName("section")
    [sectionNum].getElementsByTagName("div")[0];
  const p = new Pulldown_clientPage(pulldownId, child_target, pairList);
  p.update(p.assemble());
  return child_target;
}

let PULLDOWN_COUNTER = 1; //非同期処理の回数カウンター
const INTERVAL_ID = setInterval(main_pulldown, 100); //非同期処理の設定と削除用変数

async function main_pulldown() {
  /* プルダウンを作成する非同期処理。 */
/* 入社手続きのプルダウンリストとそのURLを登録 */
  const procedureEmploymentPairList = {
    "社員登録・入社連絡":"https://5ea2a167.viewer.kintoneapp.com/public/cc89d5cd2a29132487ba09aca1cb2d7a3dd31a082fe2aa9f0772713c4acd2cd9",
    "本人入力データ確認":"https://5ea2a167.viewer.kintoneapp.com/public/18bf8834488cf9f3ab291fb4e10767d208c66e0f7ba5a3a5d42864b1288fa085#/",
    "入社連絡(追加/修正)":"https://5ea2a167.viewer.kintoneapp.com/public/nkrfsv2-6pre-kvedit-1511-76",
    "雇用契約書作成":"https://916163bf.form.kintoneapp.com/public/nkrfsv2-6fbnew-2008-76",
    "雇用契約書閲覧/印刷/修正":"https://5ea2a167.viewer.kintoneapp.com/public/nkrfsv2-6pre-kv-2008-76"
  };

  /* 手続きのプルダウンリストとそのURLを登録 */
  const procedurePairList = {
    "保険加入・喪失":"https://5ea2a167.viewer.kintoneapp.com/public/7a50029d65b9593237e93c1f3037631816493382cc8ae9c06f12b2bbb1404b65",
    "扶養追加":"https://5ea2a167.viewer.kintoneapp.com/public/e576f93326d6a841847b46e3268c3d8f1b379c89bcd8356d34f5cddb5075279f",
    "扶養削除":"https://5ea2a167.viewer.kintoneapp.com/public/5ad0969dda943d4eb64588ae1b2368432b10169f2a6d598edcd67c52414bd2b7",
    "出産（本人）": "https://916163bf.form.kintoneapp.com/public/007d045b841634f0ec61cd9ac145eabea0cede1db05b4663fa4c6a874d394ff0",
    "出産（配偶者）": "https://916163bf.form.kintoneapp.com/public/d3689c6aaff3c6adb6c5e6ec2bbc9a85f0635597e4a04707e42598336d54d2a1",
    "ケガ連絡": "https://916163bf.form.kintoneapp.com/public/000e493315a7b43a109acaded64e74111dc18665ab34cf55ae3ca5f4d59064ef",
    "被保険者証再交付": "#",
    "限度額適用認定証": "#",
  };
  /* 人事管理のプルダウンリストとそのURLを登録 */
  const personnnelManagementPairList = {
    "従業員名簿": "https://5ea2a167.viewer.kintoneapp.com/public/0000039c78982073cfd57491e783f481fefff9093be39badcbe25bbcb2f235de",
    "給与・賞与履歴": "https://5ea2a167.viewer.kintoneapp.com/public/a261177d6af93a43069e7b9faff72d260556cb2938720be251a66bf450ad4847",
    "職位履歴": "https://5ea2a167.viewer.kintoneapp.com/public/acdb4b5f7db346d985baae4c68a53ad2c732db6021a4dc46ef9ed83ca5ff217b",
    "雇用条件履歴": "https://5ea2a167.viewer.kintoneapp.com/public/16af79c050277e46161ad4c64761728822db401e9d01a1707ed42342fe821508",
    "懲戒履歴": "https://5ea2a167.viewer.kintoneapp.com/public/951a2a3f2c145c21f11a00de01e52473f5426255934838933999c55aa36a1e32",
    "事故・問題履歴": "https://5ea2a167.viewer.kintoneapp.com/public/3faf7cb536c1f2ec427443bc2a7683359f2514fe292a1824c6d225e588ec59e4",
    "休業・休職履歴": "https://5ea2a167.viewer.kintoneapp.com/public/185932d03ffe2036f46553a7eadf4cfa4af59ee1bec894ef4254cf9a0b6a22a0",
    //"育児・介護履歴":"#",
    "育児休業履歴": "https://5ea2a167.viewer.kintoneapp.com/public/02fdd4da288e9707420bb70f94c93e08a08cb5b00eeeb24f6fe5b5ae7c73d715",
    "介護休業履歴": "https://5ea2a167.viewer.kintoneapp.com/public/8d5e9e3392ffe33476cb6c0550176add3117e4435b63bd562889b1d182858e70",
    "子の看護休暇履歴":"https://5ea2a167.viewer.kintoneapp.com/public/bfea77d902a7573cebd323b9b22e166ef79de39e2d4021b1815ffd039abec751",
    "介護休暇履歴":"https://5ea2a167.viewer.kintoneapp.com/public/1d5342d958bc54901829ba3fbbd065044cadeaf1ed59030d950c3662b6c03c31",
    "対象児出生届履歴":"https://5ea2a167.viewer.kintoneapp.com/public/946dd0a5173800cacaeab5daf34b7a596dc02f396a67713f3437a28d233abbb0",
    "休業申出撤回変更履歴":"https://5ea2a167.viewer.kintoneapp.com/public/2a7391cd6cdbb02a7ed6b55ad0fd0da73a2e253b1d1b2fe73b1ec3381223c9c1",
    "育児による時間変更申出履歴":"https://5ea2a167.viewer.kintoneapp.com/public/ee25cd183c38717018db29dea6233c6dc52a5c892f472033dd12b1b703b7cd90",
    "介護による時間変更申出履歴":"https://5ea2a167.viewer.kintoneapp.com/public/fab20a804cdf6bee7ab97a8571b6b2cbf4f5e66c2392d6941cf4279cd36fa4b3",
    "労災履歴": "https://5ea2a167.viewer.kintoneapp.com/public/00b2dd2817990f6374b3026aa3f170a6ed67d98077049f1384800737c58f148f",
    "死亡履歴": "https://5ea2a167.viewer.kintoneapp.com/public/b6cf87343d4fa849928ac2ee7ea399c99c4a04efe8c4742a3a0846448e339b14",
  };
  /* CUBICのプルダウンリストとそのURLを登録 2023/01/14*/
  const procedureCUBICPairList = {
    "CUBIC（採用）":"https://916163bf.form.kintoneapp.com/public/8ad3d4076fa45390de675d14925c967bb5eb4170dac3b5c47bfe5f1ea3c12b70",
    "CUBIC（現有社員）":"https://916163bf.form.kintoneapp.com/public/4b34e11f3b7787605e693b90732747868ef47be53364ec111d1485eb6e15de3f",
 /* 2023/01/14 */ 
  };
  try {
    const procedureEmploymentTargetDom = make_pulldown(procedureEmploymentPairList, 2, "入社連絡");
    const procedureTargetDom = make_pulldown(procedurePairList, 4, "その他手続き");
    const personnnelManagementTargetDom = make_pulldown(personnnelManagementPairList, 5, "人事管理");
    const cubicTargetDom = make_pulldown(procedureCUBICPairList, 14, "cubic");
    if (procedureEmploymentTargetDom === undefined || procedureTargetDom === undefined || personnnelManagementTargetDom === undefined
       || cubicTargetDom === undefined) {
      throw new Error("loading error");
    }
    clearInterval(INTERVAL_ID); //非同期処理を削除
    return;
  } catch (e) {
    console.error("make pulldown error: ", e.message);
  }
  console.log("make pulldown try: ", PULLDOWN_COUNTER++);
  /* カウンターが一定回数を超えたら非同期処理を停止 */
  if (PULLDOWN_COUNTER > 30) {
    clearInterval(INTERVAL_ID);
    console.log("error: employees page could not be loaded.");
  }
}
