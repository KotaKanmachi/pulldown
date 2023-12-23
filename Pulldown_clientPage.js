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
    const toggleMenu = function () {
      wrapped_pulldown_menu.style.display =
        wrapped_pulldown_menu.style.display === "block" ? "none" : "block";
    };
    /* プルダウン出現のイベント付与 */
    wrapped_buttonText.addEventListener("click", function (e) {
      e.stopPropagation();
      toggleMenu();
    });
    document.addEventListener("click", function (event) {
      if (!wrapped_pulldown_menu.contains(event.target)) {
        wrapped_pulldown_menu.style.display = "none";
      }
    });
    parent_section.insertBefore(wrapped_buttonText, parent_section.firstChild);
    if (this.id === "人事管理") {
      wrapped_pulldown_menu.style.left = "30%";
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
      if (key === "従業員名簿") {
        choice.addEventListener("click", function () {
          window.location.href = pairList[key];
        });
      } else {
        choice.addEventListener("click", function () {
          const d = new Dialog_employee(key, menu, pairList[key]);
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
