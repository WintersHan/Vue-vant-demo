// 判断机型
const u = navigator.userAgent;

function setupWebViewJavascriptBridge (callback) {
  // var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
  // 判断ios 还是Android
  if (/(iPhone|iPad|iPod|iOS)/i.test(u)) {
    if (window.WebViewJavascriptBridge) {
      return callback(window.WebViewJavascriptBridge);
    }
    if (window.WVJBCallbacks) {
      return window.WVJBCallbacks.push(callback);
    }
    window.WVJBCallbacks = [callback];
    const WVJBIframe = document.createElement('iframe');
    WVJBIframe.style.display = 'none';
    WVJBIframe.src = 'https://__bridge_loaded__';
    document.documentElement.appendChild(WVJBIframe);
    setTimeout(() => {
      document.documentElement.removeChild(WVJBIframe);
    }, 0);
  }
}

const deviceType = isIOSOrAndroid();
/**
 *  判断是不是iOS 0:浏览器 1：ios  2：Android
 * */
function isIOSOrAndroid () {
  if (/(iPhone|iPad|iPod|iOS)/i.test(u)) {
    return 1;
  } else if (/(Android|Linux)/i.test(u)) {
    return 2;
  } else {
    return 0;
  }
}

function callHandler (name, data, callback) {
  setupWebViewJavascriptBridge(function (bridge) {
    bridge.callHandler(name, data, callback);
  });
}
// eslint-disable-next-line no-unused-vars
function registerhandler (name, callback) {
  setupWebViewJavascriptBridge(function (bridge) {
    bridge.registerHandler(name, function (data, responseCallback) {
      callback(data, responseCallback);
    });
  });
}

// 安卓注册事件监听
function connectWebViewJavascriptBridge (callback) {
  if (window.WebViewJavascriptBridge) {
    // eslint-disable-next-line no-undef
    callback(WebViewJavascriptBridge);
  } else {
    document.addEventListener(
      'WebViewJavascriptBridgeReady',
      function () {
        // eslint-disable-next-line no-undef
        callback(WebViewJavascriptBridge);
      },
      false
    );
  }
}

connectWebViewJavascriptBridge(function (bridge) {
  // 初始化
  if (!/(iPhone|iPad|iPod|iOS)/i.test(u)) {
    console.log('初始化');
    bridge.init(function (message, responseCallback) {
      // var data = {'Javascript Responds': 'Wee!'};
      // responseCallback(data);
    });
  }
});

export default {
  /**
     * 调起扫描二维码
     * jsFuncName 方法名
     * scanType 扫描类型
     * */
  openQRCode: function (jsFuncName, scanType) {
    if (isIOSOrAndroid() === 1) {
      callHandler('openQRCode', {
        'jsFuncName': jsFuncName,
        'scanType': scanType
      }, (res) => {

      });
    } else if (deviceType === 2) {
      window.pnumber.openQRCode(jsFuncName, scanType);
    } else {
      return -1;
    }
  },
  /**
     * 通知原生跳转新的页面
     * url 页面地址
     * */
  jumpNewWebView: function (url) {
    if (deviceType === 1) {
      callHandler('jumpNewWebView', {
        'url': url
      }, (res) => {

      });
    } else if (deviceType === 2) {
      window.pnumber.jumpNewWebView(url);
    } else {
      return -1;
    }
  },
  /**
     * 通知原生返回上级页面(原生返回，并不是web的goback方法) 注意！！！！！
     * isRefresh  是否刷新
     * */
  goBackWebView: function (isRefresh) {
    if (deviceType === 1) {
      callHandler('goBackWebView', {
        'isRefresh': isRefresh
      }, (res) => {

      });
    } else if (deviceType === 2) {
      window.pnumber.goBackWebView(isRefresh);
    } else {
      return -1;
    }
  },
  /**
     * 调起登录页并回传userid
     * jsFuncName 回传js方法名
     * 如果jsFuncName == vue 会刷新当前页  jsFuncName 是空的就返回app的首页  jsFuncName正常返回userid
     * */
  jumpLoginForUserId: function (jsFuncName) {
    if (deviceType === 1) {
      callHandler('jumpLoginForUserId', {
        'jsFuncName': jsFuncName
      }, (res) => {

      });
    } else if (deviceType === 2) {
      window.pnumber.jumpLoginForUserId(jsFuncName);
    } else {
      return -1;
    }
  },
  /**
     * 获取地理位置
     * jsFuncName 回传js方法名
     * */
  getLocationInfo: function (jsFuncName) {
    if (deviceType === 1) {
      callHandler('getLocationInfo', {
        'jsFuncName': jsFuncName
      }, () => {

      });
    } else if (deviceType === 2) {
      window.pnumber.getLocationInfo(jsFuncName);
    } else {
      return -1;
    }
  },
  /**
     * 获取用户id
     * callbackRespFunc 调用时的function 回调写法  不是参数！！！不是参数！！！不是参数！！！
     * */
  getUserId: function (callbackRespFunc) {
    if (deviceType === 1) {
      callHandler('getUserId', {

      }, (res) => {
        typeof (callbackRespFunc) === 'function' && callbackRespFunc(res);
      });
    } else if (deviceType === 2) {
      const res = window.pnumber.getUserId();
      typeof (callbackRespFunc) === 'function' && callbackRespFunc(res);
    } else {
      return -1;
    }
  },
  /**
     * 获取用户信息
     * callbackRespFunc 调用时的function 回调写法  不是参数！！！不是参数！！！不是参数！！！
     * */
  getUserInfo: function (callbackRespFunc) {
    if (deviceType === 1) {
      callHandler('getUserInfo', {

      }, (res) => {
        typeof (callbackRespFunc) === 'function' && callbackRespFunc(res);
      });
    } else if (deviceType === 2) {
      const res = window.pnumber.getUserInfo();
      typeof (callbackRespFunc) === 'function' && callbackRespFunc(res);
    } else {
      return -1;
    }
  },
  /**
     * 通知手机端跳转到融云的聊天页面
     * targetId 用户id
     * targetName  用户名称
     * */
  startRongYunChat: function (targetId, targetName) {
    if (deviceType === 1) {
      callHandler('startRongYunChat', {
        'targetId': targetId,
        'targetName': targetName
      }, (res) => {
      });
    } else if (deviceType === 2) {
      window.pnumber.startRongYunChat(targetId, targetName);
    } else {
      return -1;
    }
  },
  /**
     * 关闭当前原生页面
     * isRefresh 是否刷新
     * */
  closeCurrentAppPage: function (isRefresh) {
    if (deviceType === 1) {
      callHandler('closeCurrentAppPage', {
        'isRefresh': isRefresh
      }, () => {
      });
    } else if (deviceType === 2) {
      window.pnumber.closeCurrentAppPage(isRefresh);
    } else {
      return -1;
    }
  },
  /**
     * 调用原生相机或者相册上传图片
     * number 上传图片的最大个数 （仅相册选择多图使用）
     * */
  selectSomePictures: function (number) {
    if (deviceType === 1) {
      callHandler('selectSomePictures', {
        'number': number
      }, (res) => {
      });
    } else if (deviceType === 2) {
      window.pnumber.selectSomePictures(number);
    } else {
      return -1;
    }
  },
  /**
     * 更新app版本
     * */
  updateVersion: function () {
    if (deviceType === 1) {
      callHandler('updateVersion', {

      }, (res) => {
      });
    } else if (deviceType === 2) {
      window.pnumber.updateVersion();
    } else {
      return -1;
    }
  },
  /**
     * 获取app版本
     * callbackRespFunc 调用时的function 回调写法  不是参数！！！不是参数！！！不是参数！！！
     * */
  getAppVersionCode: function (callbackRespFunc) {
    if (deviceType === 1) {
      callHandler('getAppVersionCode', {

      }, (res) => {
        typeof (callbackRespFunc) === 'function' && callbackRespFunc(res);
      });
    } else if (deviceType === 2) {
      const res = window.pnumber.getAppVersionCode();
      typeof (callbackRespFunc) === 'function' && callbackRespFunc(res);
    } else {
      return -1;
    }
  },
  /**
     * 获取就诊人信息
     * callbackRespFunc 调用时的function 回调写法  不是参数！！！不是参数！！！不是参数！！！
     * */
  getPatientInfo: function (callbackRespFunc) {
    if (deviceType === 1) {
      callHandler('getPatientInfo', {

      }, (res) => {
        typeof (callbackRespFunc) === 'function' && callbackRespFunc(res);
      });
    } else if (deviceType === 2) {
      const res = window.pnumber.getPatientInfo();
      typeof (callbackRespFunc) === 'function' && callbackRespFunc(res);
    } else {
      return -1;
    }
  },
  /**
     * 保存就诊人信息
     * patientInfo  就诊人信息 json格式字符串
     * */
  savePatientInfo: function (patientInfo) {
    if (deviceType === 1) {
      callHandler('savePatientInfo', {
        'patientInfo': patientInfo
      }, (res) => {
      });
    } else if (deviceType === 2) {
      window.pnumber.savePatientInfo();
    } else {
      return -1;
    }
  },
  /**
     * 返回到之前的web页面  注意：前面的web页面都是通过路由或者后台跳转到web并不是原生跳转的页面
     * url: 回退到的url地址，使用时请仔细检查该url是否正确
     * */
  goBackToUrl: function (url) {
    if (deviceType === 1) {
      callHandler('goBackToUrl', {
        'url': url
      }, (res) => {
      });
    } else if (deviceType === 2) {
      window.pnumber.goBackToUrl();
    } else {
      return -1;
    }
  },
  /**
     * 上传图片 单张
     * filePath 上传地址
     * tag 类型表示
     * 返回 图片访问的相对路径
     * */
  selectPictures: function (filePath, tag) {
    if (deviceType === 1) {
      callHandler('selectPictures', {
        'filePath': filePath,
        'tag': tag
      }, (res) => {
      });
    } else if (deviceType === 2) {
      window.pnumber.selectPictures();
    } else {
      return -1;
    }
  },
  /**
     * 调起微信支付
     *  url 请求地址 让原生请求获取微信所需参数      后期可直接改成微信的所需参数
     * */
  jumpToWeChatPay: function (url) {
    if (deviceType === 1) {
      callHandler('jumpToWeChatPay', {
        'url': url
      }, (res) => {
      });
    } else if (deviceType === 2) {
      window.pnumber.jumpToWeChatPay();
    } else {
      return -1;
    }
  },
  /**
     * 调起支付宝
     * url  请求地址 让原生请求获取支付宝所需字符串   后期可直接改成支付宝的所需字符串
     * */
  aliAppPay: function (url) {
    if (deviceType === 1) {
      callHandler('aliAppPay', {
        'url': url
      }, (res) => {
      });
    } else if (deviceType === 2) {
      window.pnumber.aliAppPay();
    } else {
      return -1;
    }
  },
  /**
     * 直接调起登录页面
     * 登录成功回到首页
     * */
  jumpLoginView: function () {
    if (deviceType === 1) {
      callHandler('jumpLoginView', {
      }, (res) => {
      });
    } else if (deviceType === 2) {
      window.pnumber.jumpLoginView();
    } else {
      return -1;
    }
  },
  /**
     * 关闭所有H5页面 回到app首页
     * */
  finishH5AndJumpToHome: function () {
    if (deviceType === 1) {
      callHandler('finishH5AndJumpToHome', {

      }, (res) => {
      });
    } else if (deviceType === 2) {
      window.pnumber.finishH5AndJumpToHome();
    } else {
      return -1;
    }
  },
  /**
     * 获取身份证信息
     * jsFuncName 回传信息的json方法名
     * */
  getIdentityCardInfo: function (jsFuncName) {
    if (deviceType === 1) {
      callHandler('getIdentityCardInfo', {
        'jsFuncName': jsFuncName
      }, (res) => {
      });
    } else if (deviceType === 2) {
      window.pnumber.getIdentityCardInfo();
    } else {
      return -1;
    }
  }
};
