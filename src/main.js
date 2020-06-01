const $siteList = $(".siteList");
const $lastLi = $siteList.find("li.last"); //找出<li class="last">
const x = localStorage.getItem("x");
const xObject = JSON.parse(x);
window.hashMap = xObject || [
  {
    logo: "W",
    logoType: "text",
    url: "https://www.w3.org/",
  },
];

/*渲染hashmap*/
const render = () => {
  $(".siteList").find("li:not(.last)").remove();
  hashMap.forEach((node, index) => {
    const $siteList = $(".siteList");
    const $lastLi = $siteList.find("li.last"); //找出<li class="last">
    if (node.logoType === "image") {
      const ico = node.url + "/favicon.ico";
      const $li = $(`<li>
                <div class="site">
                <div class="edit">
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-choose2"></use>
                  </svg>
                  </div>
                    <div class="logo">
                    <img class ="image" src= ${ico} alt="" />
                    </div>
                    <div class="link">${simplifyUrl(node.url)}</div>
                </div> 
            </li>`).insertBefore($lastLi);
      /*跳转功能 */
      $li.on("click", () => {
        window.open(node.url);
      });
      /*删除功能*/
      $li.on("click", ".edit", (e) => {
        e.stopPropagation();
        hashMap.splice(index, 1);
        render();
      });
    }

    /* ↓↓备用方案↓↓*/
    if (node.logoType === "text") {
      const $li = $(`<li>
                  <div class="site">
                  <div class="edit">
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-choose2"></use>
                  </svg>
                  </div>
                      <div class="logo">${simplifyUrl(
                        simplifyUrl(node.url)[0]
                      )}</div>
                      <div class="link">${simplifyUrl(node.url)}</div>
                  </div> 
              </li>`).insertBefore($lastLi);
      /*跳转功能 */
      $li.on("click", () => {
        window.open(node.url);
      });
      /*删除功能*/
      $li.on("click", ".close", (e) => {
        e.stopPropagation();
        hashMap.splice(index, 1);
        render();
      });
    }
  });
};

/*添加功能 */
$(".addButton").on("click", () => {
  let url = window.prompt("输入要添加的网址");
  if (url.indexOf("http") !== 0) {
    url = "http://" + url;
  }
  const newSite = { logo: url[0], logoType: "image", url: url };
  hashMap.push(newSite);
  render();
});

/*如果页面被关闭了，就将数据保存到 localStorage 里*/
window.onbeforeunload = () => {
  const string = JSON.stringify(hashMap);
  localStorage.setItem("x", string); //key,value
};

/*简化link */
const simplifyUrl = (url) => {
  return url
    .replace("https://", "")
    .replace("http://", "")
    .replace("www.", "")
    .replace(/\/,*/, ""); //正则表达式，删除 / 开头的内容
};

/*main */
render();
