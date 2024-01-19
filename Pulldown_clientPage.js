class Pulldown_clientPage extends Pulldown {
  pair_list; //プルダウンメニューの選択肢の配列

  constructor(id, childTarget, pairList) {
    super(id, childTarget);
    this.pair_list = pairList;
  }
  assemble() {
    /* parent_targetにappendするプルダウンdomの組み立て。プルダウンを出すイベントの付与 */
    /* sectionタグを取得 */
    const parent_section = this.child_target.parentNode;
    while (parent_section !== null && !parent_section.matches("section")) {
      parent_section = parent_section.parentNode;
    }
    const pulldown_menu = this.make_pulldown_menu();
    const wrapped_pulldown_menu = this.wrap(
      PULLDOWN_MENU_CLASSNAME,
      pulldown_menu
    );
    wrapped_pulldown_menu.id = this.id;
    wrapped_pulldown_menu.style.display = "none";
    const wrapped_buttonText = this.wrap(
      PULLDOWN_BUTTON_CLASSNAME,
      this.child_target
    );
    /* プルダウン出現のイベント付与 */
    wrapped_buttonText.addEventListener("click", function (e) {
      const flag = wrapped_pulldown_menu.style.display;
      const pulldowns = document.getElementsByClassName("nkr-pulldownMenu");
      for (let i = 0; i < pulldowns.length; i++) {
        pulldowns[i].style.display = "none";
      }
      e.stopPropagation();
      wrapped_pulldown_menu.style.display = flag === "block" ? "none" : "block";
    });
    document.addEventListener("click", function (event) {
      if (!wrapped_pulldown_menu.contains(event.target)) {
        wrapped_pulldown_menu.style.display = "none";
      }
    });

    parent_section.insertBefore(wrapped_buttonText, parent_section.firstChild);
    if (this.id === "人事管理") {
      wrapped_pulldown_menu.style.left = "70%";
    } else if (this.id === "cubic") {
      wrapped_pulldown_menu.style.left = "60%";
    } else if (this.id === "入社連絡") {
      wrapped_pulldown_menu.style.left = "0%";
    }
    return wrapped_pulldown_menu;
  }
  make_pulldown_menu() {
    /* プルダウンメニュー作成 */
    const menu = document.createElement("ul");
    const pairList = this.pair_list;
    Object.keys(this.pair_list).forEach((key) => {
      const choice = document.createElement("li");
      choice.textContent = key;
      /* メニュークリックで従業員選択ポップアップ出現 */
      if (
        key === "従業員名簿" ||
        key === "CUBIC（採用）" ||
        key === "CUBIC（現有社員）" ||
        key === "本人入力データ確認" ||
        key === "雇用契約書作成" ||
        key === "入社連絡(追加/修正)" ||
        key === "社員登録・入社連絡"
      ) {
        choice.addEventListener("click", function () {
          //            window.location.href = pairList[key];                        /*2023/01/14*/
          const newWindow = window.open("about:blank"); /*2023/01/14*/
          if (newWindow) {
            console.log("object exist");
            newWindow.location.href = pairList[key];
          } else {
            console.log("object not exist");
          }
        });
      } else {
        choice.addEventListener("click", function () {
          const d = new Dialog_clientPage(key, menu, pairList[key]);
          d.update(d.assemble());
          const modalDialog = document.getElementById(d.id);
          modalDialog.showModal();
        });
      }

      menu.appendChild(choice);
    });
    return menu;
  }
  update(dom) {
    /*既存のdomがあれば削除し、新規のdomを登録*/
    let remove_target = document.getElementById(this.id);
    if (remove_target !== null && remove_target !== undefined) {
      remove_target.remove();
    }
    this.child_target.parentNode.parentNode.after(dom);
  }
}
