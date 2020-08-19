// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"main.js":[function(require,module,exports) {
var $siteList = $(".siteList");
var $lastLi = $siteList.find("li.last"); //找出<li class="last">

var x = localStorage.getItem("x");
var xObject = JSON.parse(x);
var event;
window.hashMap = xObject || [{
  logo: "W",
  logoType: "image",
  url: "https://www.w3.org/",
  name: "W3C",
  id: 1
}, {
  logo: "W",
  logoType: "image",
  url: "https://www.baidu.com/",
  name: "百度",
  id: 2
}, {
  logo: "W",
  logoType: "image",
  url: "https://www.bilibili.com/",
  name: "哔哩哔哩",
  id: 3
}];
/*渲染hashmap*/

var render = function render() {
  $(".siteList").find("li:not(.last)").remove();
  hashMap.forEach(function (node, index) {
    node.id = index;
    var $siteList = $(".siteList");
    var $lastLi = $siteList.find("li.last"); //找出<li class="last">

    if (!node.name) {
      node.name = simplifyUrl(node.url);
    }

    if (node.logoType === "image") {
      var ico = node.url + "/favicon.ico";
      var $li = $("<li>\n                <div class=\"site\">\n                <div class=\"edit\">\n                  <svg class=\"icon\" aria-hidden=\"true\">\n                    <use xlink:href=\"#icon-choose2\"></use>\n                  </svg>\n                  </div>\n                    <div class=\"logo\">\n                    <img class =\"image\" src= ".concat(ico, " alt=\"\" />\n                    </div>\n                    <div class=\"link\">").concat(node.name, "</div>\n                </div> \n            </li>")).insertBefore($lastLi);
      /*跳转功能 */

      $li.on("click", function () {
        window.open(node.url);
      });
      /*删除功能*/
      // hashMap.splice(index, 1);
      // render();

      /*点击点点点时 */

      $li.on("click", ".edit", function (e) {
        e.stopPropagation();
        event = node;
        $("#name")[0].value = event.name;
        $("#url")[0].value = event.url;
        favDialog.showModal();
      });
    }
    /* ↓↓备用方案↓↓*/


    if (node.logoType === "text") {
      var _$li = $("<li>\n                  <div class=\"site\">\n                  <div class=\"edit\">\n                  <svg class=\"icon\" aria-hidden=\"true\">\n                    <use xlink:href=\"#icon-choose2\"></use>\n                  </svg>\n                  </div>\n                      <div class=\"logo\">".concat(simplifyUrl(simplifyUrl(node.url)[0]), "</div>\n                      <div class=\"link\">").concat(simplifyUrl(node.url), "</div>\n                  </div> \n              </li>")).insertBefore($lastLi);
      /*跳转功能 */


      _$li.on("click", function () {
        window.open(node.url);
      });
      /*删除功能*/


      _$li.on("click", ".close", function (e) {
        e.stopPropagation();
        hashMap.splice(index, 1);
        render();
      });
    }
  });
};
/*点击删除按钮时 */


$("#remove").on("click", function () {
  hashMap.splice(event.id, 1);
  favDialog.close();
  render();
});
/*点击确定按钮时 */

$("#confirm").on("click", function (e) {
  var current = hashMap.filter(function (t) {
    return t.id === event.id;
  })[0];
  var currenturl = $("#url")[0].value;
  console.log(current);
  current.name = $("#name")[0].value;

  if (currenturl.indexOf("http") !== 0) {
    //为0说明有http
    currenturl = "http://" + currenturl;
  }

  current.url = currenturl;
  favDialog.close();
  render();
});
$("#cancel").on("click", function () {
  favDialog.close();
  event = undefined;
});
/*添加功能 */

$(".addButton").on("click", function () {
  var url = window.prompt("输入要添加的网址 比如：www.baidu.com");

  if (url) {
    if (url.indexOf("http") !== 0) {
      //为0说明有http
      url = "http://" + url;
    }

    var newSite = {
      logo: url[0],
      logoType: "image",
      url: url
    };
    hashMap.push(newSite);
    render();
  }
});
/*如果页面被关闭了，就将数据保存到 localStorage 里*/

window.onbeforeunload = function () {
  var string = JSON.stringify(hashMap);
  localStorage.setItem("x", string); //key,value
};
/*简化link */


var simplifyUrl = function simplifyUrl(url) {
  return url.replace("https://", "").replace("http://", "").replace("www.", "").replace(/\/,*/, ""); //正则表达式，删除 / 开头的内容
};
/*main */


render();
},{}],"C:/Users/Administrator/AppData/Local/Yarn/Data/global/node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "52473" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["C:/Users/Administrator/AppData/Local/Yarn/Data/global/node_modules/parcel/src/builtins/hmr-runtime.js","main.js"], null)
//# sourceMappingURL=/main.1f19ae8e.js.map