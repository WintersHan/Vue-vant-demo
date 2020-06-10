/*
方法总览：

[方法1] 打开相机扫描二维码
[方法2] 借助原生实现跳转页面
[方法3] 借助原生跳转至前一页面（支持跳转并刷新）
[方法4] 借助原生获取用户当前位置信息
[方法5] 调用相机扫描身份证，获取身份证信息
[方法6] 关闭所有H5页面，并跳转到APP首页
[方法7] 调用原生端支付宝支付功能
[方法8] 调用原生端微信支付功能
[方法9] 上传图片到Theme服务器(手机拍照上传或手机本地相册选择单张图片上传)
[方法10] 连续打开多个H5页面后，回退到指定页面，比如现有A、B、C、D四个H5页，从A跳转到B，B跳转到C，C跳转到D，如果在D页跳转到B页，并实现点击返回键后返回到A页面
[方法11] 在H5页中主动通知原生端做某项操作（比如刷新某H5页面）

*/
/* eslint-disable */
const interactionMethod = {};
// 浏览器初始化代码块
const browser = {
  versions: (function () {
    const u = navigator.userAgent; const app = navigator.appVersion;
    return {// 移动终端浏览器版本信息
      trident: u.indexOf('Trident') > -1, // IE内核
      presto: u.indexOf('Presto') > -1, // opera内核
      webKit: u.indexOf('AppleWebKit') > -1, // 苹果、谷歌内核
      gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, // 火狐内核
      mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), // 是否为移动终端
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
      android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, // android终端或者uc浏览器
      iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, // 是否为iPhone或者QQHD浏览器
      iPad: u.indexOf('iPad') > -1, // 是否iPad
      webApp: u.indexOf('Safari') == -1
      // 是否web应该程序，没有头部与底部
    };
  }()),
  language: (navigator.browserLanguage || navigator.language).toLowerCase()
};

// ------------------------------------ios交互必须代码 勿删！！！------------------------//
window.setupWebViewJavascriptBridge = function setupWebViewJavascriptBridge (callback) {
  if (window.WebViewJavascriptBridge) {
    return callback(WebViewJavascriptBridge);
  }
  if (window.WVJBCallbacks) {
    return window.WVJBCallbacks.push(callback);
  }
  window.WVJBCallbacks = [callback];
  const WVJBIframe = document.createElement('iframe');
  WVJBIframe.style.display = 'none';
  WVJBIframe.src = 'https://__bridge_loaded__';
  document.documentElement.appendChild(WVJBIframe);
  setTimeout(function () {
    document.documentElement.removeChild(WVJBIframe);
  }, 0);
};

setupWebViewJavascriptBridge(function (bridge) {
  /* Initialize your app here */

  bridge.registerHandler('JS Echo', function (data, responseCallback) {
    console.log('JS Echo called with:', data);
    responseCallback(data);
  });
  bridge.callHandler('ObjC Echo', { 'key': 'value' }, function responseCallback (responseData) {
    console.log('JS received response:', responseData);
  });
});
// -----------------------------------------------------------------------------//

/*
[方法1] 打开相机扫描二维码
	[参数1] jsFuncName: 原生回调H5中的js方法名,该方法用于接收相机扫描识别出的字符串
	[参数2] scanType：扫描类型，参数值为normal时，表示相机扫描二维码后，将识别到的字符串原封不动传递给[参数1]回调方法。其他情况联系APP同事。
	[返回值] 字符串
[参数值示例] interactionMethod.openQRCode("getQRcode","normal");
[返回值示例] "As37481548157544"
[调用示例] 参考示例2
[调用系统] 疫情统计APP(居民端、管理端)
[创建人  ] 吴昊原
[创建时间] 2020年2月17日14:24:09
[修改时间] 2020年3月17日14:25:01
*/
interactionMethod.openQRCode = function (jsFuncName, scanType) {
  if (jsFuncName == null || jsFuncName == '') {
    return '方法明不能为空';
  }
  if (scanType == null) {
    scanType = 'normal';
  }
  if (browser.versions.ios || browser.versions.iPhone || browser.versions.iPad) {
    setupWebViewJavascriptBridge(function (bridge) {
      bridge.callHandler('openQRCode', {
        'jsFuncName': jsFuncName,
        'scanType': scanType
      });
    });
    // window.WebViewJavascriptBridge.callHandler('openQRCode', {
    // 	"jsFuncName":jsFuncName,
    // 	"scanType":scanType
    // });
  } else if (browser.versions.android) {
    window.pnumber.openQRCode(jsFuncName, scanType);
  } else {
    // 返回-1表示不是手机端
    return '-1';
  }
};

/*
[方法2] 借助原生实现跳转页面
	[参数1] url: 要跳转页面的地址
	[返回值] 无
[参数值示例] interactionMethod.jumpNewWebView("http://www.baidu.com");
[返回值示例] 无
[调用示例] 参考示例1
[调用系统] 疫情统计APP(居民端、管理端)
[创建人  ] 赵禄义
[创建时间] 2020年2月17日14:24:09
[修改时间] 2020年3月17日14:25:01
*/
interactionMethod.jumpNewWebView = function (url) {
  if (browser.versions.ios || browser.versions.iPhone || browser.versions.iPad) {
    setupWebViewJavascriptBridge(function (bridge) {
      bridge.callHandler('jumpNewWebView', {
        'url': url
      });
    });
    // window.WebViewJavascriptBridge.callHandler('jumpNewWebView', {
    //     "url": url,
    // });
  } else if (browser.versions.android) {
    window.pnumber.jumpNewWebView(url);
  } else {
    // 返回-1表示不是手机端
    window.location = url;
    return '-1';
  }
};

// 说明：通过手机原生返回上级web页面的方法
// 参数：isRefresh-上级页面是否需要刷新

/*
[方法3] 借助原生跳转至前一页面（支持跳转并刷新）
	[参数1] isRefresh: true 表示跳转并刷新；false 表示仅跳转，不刷新
	[返回值] 无
[参数值示例] interactionMethod.goBackWebView(true); 跳至上一页，并刷新
[返回值示例] 无
[调用示例] 参考示例1
[调用系统] 疫情统计APP(居民端、管理端)、nbphs-mb
[创建人  ] 赵禄义
[创建时间] 2020年2月17日14:24:09
[修改时间] 2020年3月17日14:25:01
*/
interactionMethod.goBackWebView = function (isRefresh) {
  if (browser.versions.ios || browser.versions.iPhone || browser.versions.iPad) {
    setupWebViewJavascriptBridge(function (bridge) {
      bridge.callHandler('goBackWebView', {
        'isRefresh': isRefresh
      });
    });
    // window.WebViewJavascriptBridge.callHandler('goBackWebView', {
    //     "isRefresh": isRefresh,
    // });
  } else if (browser.versions.android) {
    window.pnumber.goBackWebView(isRefresh);
  } else {
    // 返回-1表示不是手机端
    return '-1';
  }
};

// 说明：调起APP的定位服务获取用户当前位置信息
// 参数：jsFuncName-回调js方法：APP获取到位置信息，通过H5的jsFuncName(data) JS 回传给H5；其中data为位置信息的json数据
//			json数据内容为：
//			/**经纬度*/
//    		private double latitude;
//    		private double longitude;
//    		/**区域编码*/
//    		private String adcode;
//    		/**国家名称*/
//   		private String country;
//			/**省名称*/
//			private String province;
//			/**城市名称*/
//			private String city;
//			/**城市编码*/
//			private String citycode;
//			/**区县名称*/
//			private String district;
//			/**乡镇街道名称*/
//			private String township;
//			/**乡镇街道编码*/
//			private String towncode;
//			/**街道名称*/
//			private String neighborhood;
//			/**建筑名称*/
//			private String building;

/*
[方法4] 借助原生获取用户当前位置信息
	[参数1] jsFuncName: H5中声明的js方法名，用来接收原生返回的用户位置信息
	[返回值] json字符串，各属性为 latitude:纬度；longitude：经度；adcode：区域编码 ；country：国家名称；province：省名称city：城市名称citycode：城市编码district：区县名称township：乡镇街道名称towncode：乡镇街道编码neighborhood：街道名称building：建筑名称
[参数值示例] interactionMethod.getLocationInfo("getLocation");
[返回值示例] {"adcode":"370102","building":"","city":"济南市","citycode":"0531","country":"中国","district":"历下区","latitude":36.677825,"longitude":117.136837,"neighborhood":"新泺大街","province":"山东省","towncode":"142号","township":"新泺大街"}
[调用示例] 参考示例2
[调用系统] 疫情统计APP(居民端、管理端)、百灵医生居民端
[创建人  ] 赵禄义
[创建时间] 2020年2月17日14:24:09
[修改时间] 2020年3月17日14:25:01
*/
interactionMethod.getLocationInfo = function (jsFuncName) {
  if (browser.versions.ios || browser.versions.iPhone || browser.versions.iPad) {
    // window.WebViewJavascriptBridge.callHandler('getLocationInfo', {
    //     "jsFuncName": jsFuncName
    // });
    setupWebViewJavascriptBridge(function (bridge) {
      bridge.callHandler('getLocationInfo', {
        'jsFuncName': jsFuncName
      });
    });
  } else if (browser.versions.android) {
    window.pnumber.getLocationInfo(jsFuncName);
  } else {
    // 返回-1表示不是手机端
    return '-1';
  }
};

// 说明：调起APP扫描身份证功能
// 参数：jsFuncName-APP获取到身份证信息后，通过该js名的js回传给H5，内容为身份证json数据
//			json数据内容为：
//				private String name;//姓名
//				private String idCard;//身份证号
//				private String birth;//出生日期
//				private String sex;//性别
//				private String address;//地址

/*
[方法5] 调用相机扫描身份证，获取身份证信息
	[参数1] jsFuncName: H5中声明的js方法名，用来接收原生返回的数据信息
	[返回值] json字符串，各属性为 name：姓名；idCard：身份证号；birth：出生日期；sex：性别；address：户籍地址；
[参数值示例] interactionMethod.getIdentityCardInfo("getIDcardInfo");
[返回值示例] 无
[调用示例] 参考示例2
[调用系统] 疫情统计APP(居民端、管理端)、百灵医生居民端
[创建人  ] 赵禄义
[创建时间] 2020年2月17日14:24:09
[修改时间] 2020年3月17日14:25:01
*/
interactionMethod.getIdentityCardInfo = function (jsFuncName) {
  if (browser.versions.ios || browser.versions.iPhone || browser.versions.iPad) {
    setupWebViewJavascriptBridge(function (bridge) {
      bridge.callHandler('getIdentityCardInfo', {
        'jsFuncName': jsFuncName
      });
    });
    // window.WebViewJavascriptBridge.callHandler('getIdentityCardInfo', {
    //     "jsFuncName": jsFuncName
    // });
  } else if (browser.versions.android) {
    window.pnumber.getIdentityCardInfo(jsFuncName);
  } else {
    // 返回-1表示不是手机端
    return '-1';
  }
};

/*
[方法6] 关闭所有H5页面，并跳转到tab首页
	[参数1] 无
	[返回值] 无
[参数值示例] interactionMethod.finishH5AndJumpToHome();
[返回值示例] 无
[调用示例] 参考示例1
[调用系统] 疫情统计APP(居民端、管理端)、百灵医生居民端
[创建人  ] 赵禄义
[创建时间] 2020年2月17日14:24:09
[修改时间] 2020年3月17日14:25:01
*/
interactionMethod.finishH5AndJumpToHome = function () {
  if (browser.versions.ios || browser.versions.iPhone || browser.versions.iPad) {
    setupWebViewJavascriptBridge(function (bridge) {
      bridge.callHandler('finishH5AndJumpToHome', {});
    });
    // window.WebViewJavascriptBridge.callHandler('finishH5AndJumpToHome', {});
  } else if (browser.versions.android) {
    window.pnumber.finishH5AndJumpToHome();
  } else {
    // 返回-1表示不是手机端
    return '-1';
  }
};

/*
[方法7] 跳转到登录页面
	[参数1] 无
	[返回值] 无
[参数值示例] interactionMethod.jumpLoginView();
[返回值示例] 无
[调用示例] 参考示例1
[调用系统] 无
[创建人  ] 赵禄义
[创建时间] 2020年2月17日14:24:09
[修改时间] 2020年3月17日14:25:01
*/
interactionMethod.jumpLoginView = function () {
  if (browser.versions.ios || browser.versions.iPhone || browser.versions.iPad) {
    setupWebViewJavascriptBridge(function (bridge) {
      bridge.callHandler('jumpLoginView', {});
    });
    // window.WebViewJavascriptBridge.callHandler('jumpLoginView', {});
  } else if (browser.versions.android) {
    window.pnumber.jumpLoginView();
  } else {
    // 返回-1表示不是手机端
    return '-1';
  }
};

// 说明：调用原生端支付宝支付功能
// 参数：url-原生端通过该url获取支付相关参数，及支付成功后跳转的url地址

/*
[方法7] 调用原生端支付宝支付功能
	[参数1] url: 支付时原生端从url中获取支付相关参数，同时也是支付成功后跳转的url地址
	[返回值] 无
[参数值示例] interactionMethod.aliAppPay("http://www.baidu.com");
[返回值示例] 无
[调用示例] 参考示例1
[调用系统] 无
[创建人  ] 赵禄义
[创建时间] 2020年2月17日14:24:09
[修改时间] 2020年3月17日14:25:01
*/
interactionMethod.aliAppPay = function (url) {
  if (browser.versions.ios || browser.versions.iPhone || browser.versions.iPad) {
    setupWebViewJavascriptBridge(function (bridge) {
      bridge.callHandler('aliAppPay', {
        'url': url
      });
    });
    // window.WebViewJavascriptBridge.callHandler('aliAppPay', {
    //     "url": url,
    // });
  } else if (browser.versions.android) {
    window.pnumber.aliAppPay(url);
  } else {
    // 返回-1表示不是手机端
    window.location = url;
    return '-1';
  }
};

// 说明：调用原生端微信支付功能
// 参数：url-原生端通过该url获取支付相关参数，及支付成功后跳转的url地址

/*
[方法8] 调用原生端微信支付功能
	[参数1] url: 支付时原生端从url中获取支付相关参数，同时也是支付成功后跳转的url地址
	[返回值] 无
[参数值示例] interactionMethod.jumpToWeChatPay("http://www.baidu.com");
[返回值示例] 无
[调用示例] 参考示例1
[调用系统] 无
[创建人  ] 赵禄义
[创建时间] 2020年2月17日14:24:09
[修改时间] 2020年3月17日14:25:01
*/
interactionMethod.jumpToWeChatPay = function (url) {
  if (browser.versions.ios || browser.versions.iPhone || browser.versions.iPad) {
    setupWebViewJavascriptBridge(function (bridge) {
      bridge.callHandler('jumpToWeChatPay', {
        'url': url
      });
    });
    // window.WebViewJavascriptBridge.callHandler('jumpToWeChatPay', {
    //     "url": url,
    // });
  } else if (browser.versions.android) {
    window.pnumber.jumpToWeChatPay(url);
  } else {
    // 返回-1表示不是手机端
    window.location = url;
    return '-1';
  }
};

// 说明：调用原生端拍照或者选择相册图片功能，原生端实现上传图片到Theme服务器，将图片相对路径回传给h5，回传js为setConsultImge(imagePath)
// 参数：filePath-Theme服务器上传图片所需参数
//		tag-Theme服务器上传图片所需参数

/*
[方法9] 上传图片到Theme服务器(手机拍照上传或手机本地相册选择单张图片上传)
	[参数1] filePath:
	[参数2] tag:
	[返回值] 图片访问的相对路径
[参数值示例] interactionMethod.selectPictures("http://www.baidu.com");
[返回值示例] "/theme/upload/doctor_image/20190827/5ad04bfe87cf4d5e90025d92310dfc4d.png"
[调用示例] 参考示例2
[调用系统] 无
[创建人  ] 赵禄义
[创建时间] 2020年2月17日14:24:09
[修改时间] 2020年3月17日14:25:01
*/
interactionMethod.selectPictures = function (filePath, tag) {
  if (browser.versions.ios || browser.versions.iPhone || browser.versions.iPad) {
    setupWebViewJavascriptBridge(function (bridge) {
      bridge.callHandler('selectPictures', {
        'filePath': filePath,
        'tag': tag
      });
    });
    // window.WebViewJavascriptBridge.callHandler('selectPictures', {
    //     "filePath": filePath,
    //     "tag": tag
    // });
  } else if (browser.versions.android) {
    window.pnumber.selectPictures(filePath, tag);
  } else {
    // 返回-1表示不是手机端
    return '-1';
  }
};

// 说明：联系打开多个H5页面后，需要回退到指定页面，比如A跳转到B，B跳转到C，C跳转到D，如果D想回退到B，调用该方法，url传入B的地址即可
// 参数：url-回退到的url地址，使用时请仔细检查该url

/*
[方法10] 连续打开多个H5页面后，回退到指定页面，比如现有A、B、C、D四个H5页，从A跳转到B，B跳转到C，C跳转到D，如果在D页跳转到B页，并实现点击返回键后返回到A页面
	[参数1] url: 回退到的url地址，使用时请仔细检查该url是否正确
	[返回值] 无
[参数值示例] interactionMethod.goBackToUrl("http://www.baidu.com");
[返回值示例] 无
[调用示例] 参考示例1
[调用系统] 无
[创建人  ] 赵禄义
[创建时间] 2020年2月17日14:24:09
[修改时间] 2020年3月17日14:25:01
*/
interactionMethod.goBackToUrl = function (url) {
  if (browser.versions.ios || browser.versions.iPhone || browser.versions.iPad) {
    setupWebViewJavascriptBridge(function (bridge) {
      bridge.callHandler('goBackToUrl', {
        'url': url
      });
    });
    // window.WebViewJavascriptBridge.callHandler('goBackToUrl', {
    //     "url": url,
    // });
  } else if (browser.versions.android) {
    window.pnumber.goBackToUrl(url);
  } else {
    // 返回-1表示不是手机端
    return '-1';
  }
};

// 说明：发送通知给原生端，通知原生端做某项操作
// 参数：notifyType-通知类型，如需使用请联系APP同事进行维护;比如：传递reloadMine，为个人信息修改后通知原生端刷新我的页面

/*
[方法11] 在H5页中主动通知原生端做某项操作（比如刷新某H5页面）
	[参数1] notifyType: 操作类型，reloadMine 为在“百灵医生居民APP”中个人信息修改页修改用户信息点击保存后通知原生端刷新我的页面中的用户信息
	[返回值] 无
[参数值示例] interactionMethod.sendNotifyToAPP("reloadMine");
[返回值示例] 无
[调用示例] 参考示例1
[调用系统] 无
[创建人  ] 赵禄义
[创建时间] 2020年2月17日14:24:09
[修改时间] 2020年3月17日14:25:01
*/
interactionMethod.sendNotifyToAPP = function (notifyType) {
  if (browser.versions.ios || browser.versions.iPhone || browser.versions.iPad) {
    setupWebViewJavascriptBridge(function (bridge) {
      bridge.callHandler('sendNotifyToAPP', {
        'notifyType': notifyType
      });
    });
    // window.WebViewJavascriptBridge.callHandler('sendNotifyToAPP', {
    //     "notifyType": notifyType,
    // });
  } else if (browser.versions.android) {
    window.pnumber.sendNotifyToAPP(notifyType);
  } else {
    // 返回-1表示不是手机端
    return '-1';
  }
};

// 说明：调起原生的登录页面，登录成功后原生回传给h5 userId
// 参数：jsFuncName- js名称，原生通过该js 将userId 回传给H5

/*
[方法12] 调起原生的登录页面，登录成功后原生回传给h5 userId
	[参数1] jsFuncName:  js名称，原生通过该js 将userId 回传给H5
	[返回值] 无
[参数值示例] interactionMethod.jumpLoginForUserId("getAppUserId");
[返回值示例] 无
[调用示例] 参考示例2
[调用系统] 无
[创建人  ] 赵禄义
[创建时间] 2020年2月17日14:24:09
[修改时间] 2020年3月17日14:25:01
*/
interactionMethod.jumpLoginForUserId = function (jsFuncName) {
  if (browser.versions.ios || browser.versions.iPhone || browser.versions.iPad) {
    setupWebViewJavascriptBridge(function (bridge) {
      bridge.callHandler('jumpLoginForUserId', {
        'jsFuncName': jsFuncName
      });
    });
    // window.WebViewJavascriptBridge.callHandler('jumpLoginForUserId', {
    //     "jsFuncName": jsFuncName
    // });
  } else if (browser.versions.android) {
    window.pnumber.jumpLoginForUserId(jsFuncName);
  } else {
    // 返回-1表示不是手机端
    return '-1';
  }
};

/*
[方法13] 保存就诊人信息
	[参数1] patientInfo:  就诊人信息 json数据
	[返回值] 无
[参数值示例] interactionMethod.savePatientInfo("xxxx");
[返回值示例] 无
[调用示例] 参考示例2
[调用系统] 无
[创建人  ] 赵禄义
[创建时间] 2020年2月17日14:24:09
[修改时间] 2020年3月17日14:25:01
*/
interactionMethod.savePatientInfo = function (patientInfo) {
  if (browser.versions.ios || browser.versions.iPhone || browser.versions.iPad) {
    setupWebViewJavascriptBridge(function (bridge) {
      bridge.callHandler('savePatientInfo', {
        'patientInfo': patientInfo
      });
    });
    // window.WebViewJavascriptBridge.callHandler('savePatientInfo', {
    //     "patientInfo": patientInfo
    // });
  } else if (browser.versions.android) {
    window.pnumber.savePatientInfo(patientInfo);
  } else {
    // 返回-1表示不是手机端
    return '-1';
  }
};

/*
[方法14] 获取就诊人信息，返回json数据
[返回值] json数据
[参数值示例] interactionMethod.getPatientInfo(callbackRespFunc);
[返回值示例] 无
[调用示例] 参考示例2
[调用系统] 无
[创建人  ] 赵禄义
[创建时间] 2020年2月17日14:24:09
[修改时间] 2020年3月17日14:25:01
*/
interactionMethod.getPatientInfo = function (callbackRespFunc) {
  if (browser.versions.ios || browser.versions.iPhone || browser.versions.iPad) {
    setupWebViewJavascriptBridge(function (bridge) {
      bridge.callHandler('getPatientInfo', {}, function responseCallback (responseData) {
        typeof (callbackRespFunc) === 'function' && callbackRespFunc(responseData);
      });
    });
    // setupWebViewJavascriptBridge(function (bridge) {
    //     bridge.callHandler('getPatientInfo', {}, function responseCallback(responseData) {
    //         typeof (callbackRespFunc) === "function" && callbackRespFunc(responseData);
    //     })
    // });
  } else if (browser.versions.android) {
    const responseData = window.pnumber.getPatientInfo();
    if (typeof (callbackRespFunc) === 'function') {
      callbackRespFunc(responseData);
    } else {
      return responseData;
    }
  } else {
    // 返回-1表示不是手机端
    return '-1';
  }
};

/*
[方法15] 获取APP当前应用版本号
	[返回值] 无
[参数值示例] interactionMethod.getAppVersionCode(callBackVersion);
[返回值示例] 无
[调用示例] 参考示例2
[调用系统] 无
[创建人  ] 赵禄义
[创建时间] 2020年2月17日14:24:09
[修改时间] 2020年3月17日14:25:01
*/
interactionMethod.getAppVersionCode = function (callbackRespFunc) {
  if (browser.versions.ios || browser.versions.iPhone || browser.versions.iPad) {
    setupWebViewJavascriptBridge(function (bridge) {
      bridge.callHandler('getAppVersionCode', {}, function responseCallback (responseData) {
        typeof (callbackRespFunc) === 'function' && callbackRespFunc(responseData);
      });
    });
  } else if (browser.versions.android) {
    const responseData = window.pnumber.getAppVersionCode();
    if (typeof (callbackRespFunc) === 'function') {
      callbackRespFunc(responseData);
    } else {
      return responseData;
    }
  } else {
    // 返回-1表示不是手机端
    return '-1';
  }
};

/*
[方法16] 调起APP的升级APP功能
	[返回值] 无
[参数值示例] interactionMethod.updateVersion();
[返回值示例] 无
[调用示例] 参考示例2
[调用系统] 无
[创建人  ] 赵禄义
[创建时间] 2020年2月17日14:24:09
[修改时间] 2020年3月17日14:25:01
*/
interactionMethod.updateVersion = function () {
  if (browser.versions.ios || browser.versions.iPhone || browser.versions.iPad) {
    setupWebViewJavascriptBridge(function (bridge) {
      bridge.callHandler('updateVersion', {});
    });
    // window.WebViewJavascriptBridge.callHandler('updateVersion', {});
  } else if (browser.versions.android) {
    window.pnumber.updateVersion();
  } else {
    // 返回-1表示不是手机端
    return '-1';
  }
};

// 说明：调用原生端拍照或者选择相册图片功能，原生端实现上传图片到Theme服务器，将图片相对路径回传给h5，h5通过setConsultImge方法接收，多图片地址通过,隔开
/*
[方法17] 上传图片到Theme服务器(手机拍照上传或手机本地相册选择多张图片上传)
	[参数1] 获取图片数量:
	[返回值] 图片访问的相对路径
[参数值示例] interactionMethod.selectSomePictures(6);
[返回值示例] "/theme/upload/doctor_image/20190827/5ad04bfe87cf4d5e90025d92310dfc4d.png"
[调用示例] 参考示例2
[调用系统] 无
[创建人  ] 赵禄义
[创建时间] 2020年2月17日14:24:09
[修改时间] 2020年3月17日14:25:01
*/
interactionMethod.selectSomePictures = function (number) {
  if (browser.versions.ios || browser.versions.iPhone || browser.versions.iPad) {
    setupWebViewJavascriptBridge(function (bridge) {
      bridge.callHandler('selectSomePictures', {
        'number': number
      });
    });
    // window.WebViewJavascriptBridge.callHandler('selectSomePictures', {
    //     "number": number
    // });
  } else if (browser.versions.android) {
    window.pnumber.selectSomePictures(number);
  } else {
    // 返回-1表示不是手机端
    return '-1';
  }
};
/*
[方法18] 获取原生缓存的userId
[返回值] json数据
[参数值示例] interactionMethod.getUserId(callbackRespFunc);
[返回值示例] 无
[调用示例] 参考示例2
[调用系统] 无
[创建人  ] 赵禄义
[创建时间] 2020年2月17日14:24:09
[修改时间] 2020年3月17日14:25:01
*/
interactionMethod.getUserId = function (callbackRespFunc) {
  if (browser.versions.ios || browser.versions.iPhone || browser.versions.iPad) {
    setupWebViewJavascriptBridge(function (bridge) {
      bridge.callHandler('getUserId', {}, function responseCallback (responseData) {
        typeof (callbackRespFunc) === 'function' && callbackRespFunc(responseData);
      });
    });
    // setupWebViewJavascriptBridge(function (bridge) {
    //     bridge.callHandler('getUserId', {}, function responseCallback(responseData) {
    //         typeof (callbackRespFunc) === "function" && callbackRespFunc(responseData);
    //     })
    // });
  } else if (browser.versions.android) {
    const responseData = window.pnumber.getUserId();
    if (typeof (callbackRespFunc) === 'function') {
      callbackRespFunc(responseData);
    } else {
      return responseData;
    }
  } else {
    // 返回-1表示不是手机端
    return '-1';
  }
};
/*
[方法19] 关闭当前原生页面,isRefresh标识是否刷新上个页面，默认不刷新
[返回值]
[参数值示例] interactionMethod.closeCurrentAppPage(false);
[返回值示例] 无
[调用示例] 参考示例2
[调用系统] 无
[创建人  ] 赵禄义
[创建时间] 2020年2月17日14:24:09
[修改时间] 2020年3月17日14:25:01
*/
interactionMethod.closeCurrentAppPage = function (isRefresh) {
  if (browser.versions.ios || browser.versions.iPhone || browser.versions.iPad) {
    setupWebViewJavascriptBridge(function (bridge) {
      bridge.callHandler('closeCurrentAppPage', {
        'isRefresh': isRefresh
      });
    });
    // window.WebViewJavascriptBridge.callHandler('closeCurrentAppPage', {
    //     "isRefresh": isRefresh
    // });
  } else if (browser.versions.android) {
    window.pnumber.closeCurrentAppPage(isRefresh);
  } else {
    // 返回-1表示不是手机端
    return '-1';
  }
};
/*
[方法20] 调用原生打开融云聊天页面
[返回值]
[参数值示例] interactionMethod.startRongYunChat(targetId,targetName);
[参数说明] targetId-对方用户Id，targetName-对方用户昵称
[返回值示例] 无
[调用示例] 参考示例2
[调用系统] 无
[创建人  ] 赵禄义
[创建时间] 2020年2月17日14:24:09
[修改时间] 2020年3月17日14:25:01
*/
interactionMethod.startRongYunChat = function (targetId, targetName) {
  if (browser.versions.ios || browser.versions.iPhone || browser.versions.iPad) {
    setupWebViewJavascriptBridge(function (bridge) {
      bridge.callHandler('startRongYunChat', {
        'targetId': targetId,
        'targetName': targetName
      });
    });
    // window.WebViewJavascriptBridge.callHandler('startRongYunChat', {
    //     "targetId": targetId,
    //     "targetName": targetName
    // });
  } else if (browser.versions.android) {
    window.pnumber.startRongYunChat(targetId, targetName);
  } else {
    // 返回-1表示不是手机端
    return '-1';
  }
};
/*
[方法22] 获取原生缓存的用户信息
[返回值] json数据
[参数值示例] interactionMethod.getUserInfo(callbackRespFunc);
[返回值示例] 无
[调用示例] 参考示例2
[调用系统] 无
[创建人  ] 赵禄义
[创建时间] 2020年2月17日14:24:09
[修改时间] 2020年3月17日14:25:01
*/
interactionMethod.getUserInfo = function (callbackRespFunc) {
  if (browser.versions.ios || browser.versions.iPhone || browser.versions.iPad) {
    setupWebViewJavascriptBridge(function (bridge) {
      bridge.callHandler('getUserInfo', {}, function responseCallback (responseData) {
        typeof (callbackRespFunc) === 'function' && callbackRespFunc(responseData);
      });
    });
  } else if (browser.versions.android) {
    const responseData = window.pnumber.getUserInfo();
    if (typeof (callbackRespFunc) === 'function') {
      callbackRespFunc(responseData);
    } else {
      return responseData;
    }
  } else {
    // 返回-1表示不是手机端
    return '-1';
  }
};
/*
[方法24] 先关闭所有H5页面，然后跳到一个H5页面
  [参数1] url: 跳转的h5 页面地址
  [返回值] 无
[参数值示例] interactionMethod.closeAllH5AndJumpToH5("http://www.baidu.com");
[返回值示例] 无
[调用示例] 参考示例
[调用系统] 无
[创建人  ] 赵禄义
[创建时间] 2020年2月17日14:24:09
[修改时间] 2020年3月17日14:25:01
*/
interactionMethod.closeAllH5AndJumpToH5 = function (url) {
  if (browser.versions.ios || browser.versions.iPhone || browser.versions.iPad) {
    setupWebViewJavascriptBridge(function (bridge) {
      bridge.callHandler('closeAllH5AndJumpToH5', {
        'url': url
      });
    });
    // window.WebViewJavascriptBridge.callHandler('closeAllH5AndJumpToH5', {
    //     "url": url
    // });
  } else if (browser.versions.android) {
    window.pnumber.closeAllH5AndJumpToH5(url);
  } else {
    // 返回-1表示不是手机端
    return '-1';
  }
};

/*
[方法25] 调起原生语音输入桥
  [参数1] jsFuncName:  js名称，原生通过该js 将语音转成的文字回传给H5
  [返回值] 无
[参数值示例] interactionMethod.voiceInput("getVoiceInput");
[返回值示例] 无
[调用示例] 参考示例2
[调用系统] 无
[创建人  ] 赵禄义
[创建时间] 2020年2月17日14:24:09
[修改时间] 2020年3月17日14:25:01
*/
interactionMethod.voiceInput = function (jsFuncName) {
  if (browser.versions.ios || browser.versions.iPhone || browser.versions.iPad) {
    setupWebViewJavascriptBridge(function (bridge) {
      bridge.callHandler('voiceInput', {
        'jsFuncName': jsFuncName
      });
    });
    // window.WebViewJavascriptBridge.callHandler('voiceInput', {
    //     "jsFuncName": jsFuncName
    // });
  } else if (browser.versions.android) {
    window.pnumber.voiceInput(jsFuncName);
  } else {
    // 返回-1表示不是手机端
    return '-1';
  }
};
/*
[方法26] 调起原生预览大图
  [参数1] images:图片全路径，多图片以英文,隔开
        [参数2] position:默认展示图片位置，如3张图片展示第二张，则传2
  [返回值] 无
[参数值示例] interactionMethod.showBigImage("http://www.1.jpg,http://www.2.jpg",1);
[返回值示例] 无
[调用示例] 参考示例
[调用系统] 无
[创建人  ] 赵禄义
[创建时间] 2020年2月17日14:24:09
[修改时间] 2020年3月17日14:25:01
*/
interactionMethod.showBigImage = function (images, position) {
  if (browser.versions.ios || browser.versions.iPhone || browser.versions.iPad) {
    setupWebViewJavascriptBridge(function (bridge) {
      bridge.callHandler('showBigImage', {
        'images': images,
        'position': position
      });
    });
    // window.WebViewJavascriptBridge.callHandler('showBigImage', {
    //     "images": images,
    //     "position": position
    // });
  } else if (browser.versions.android) {
    window.pnumber.showBigImage(images, position);
  } else {
    // 返回-1表示不是手机端
    return '-1';
  }
};

/*
[方法27] 打开新的h5页面,关闭旧的H5页面
	[参数1] url:新页面地址
	[返回值] 无
[参数值示例] interactionMethod.jumpNewActivityAndFinishOldActivity("地址");
[返回值示例] 无
[调用示例] 参考示例
[调用系统] 无
[创建人  ] 赵禄义
[创建时间] 2020年2月17日14:24:09
[修改时间] 2020年3月17日14:25:01
*/
interactionMethod.jumpNewActivityAndFinishOldActivity = function (url) {
  if (browser.versions.ios || browser.versions.iPhone || browser.versions.iPad) {
    setupWebViewJavascriptBridge(function (bridge) {
      bridge.callHandler('jumpNewActivityAndFinishOldActivity', {
        'url': url
      });
    });
  } else if (browser.versions.android) {
    window.pnumber.jumpNewActivityAndFinishOldActivity(url);
  } else {
    // 返回-1表示不是手机端
    return '-1';
  }
};

/*
[方法28] 使用APP缓存数据
	[参数1] key:缓存数据key值，通过该值调用getCache(key)获取缓存数据
【参数2】value：缓存值
	[返回值] 无
[参数值示例] interactionMethod.putCache("key","value");
[返回值示例] 无
[调用示例] 参考示例
[调用系统] 无
[创建人  ] 赵禄义
[创建时间] 2020年2月17日14:24:09
[修改时间] 2020年3月17日14:25:01
*/
interactionMethod.putCache = function (key, value) {
  if (browser.versions.ios || browser.versions.iPhone || browser.versions.iPad) {
    setupWebViewJavascriptBridge(function (bridge) {
      bridge.callHandler('putCache', {
        'key': key,
        'value': value
      });
    });
  } else if (browser.versions.android) {
    window.pnumber.putCache(key, value);
  } else {
    // 返回-1表示不是手机端
    return '-1';
  }
};

/*
[方法29] 获取缓存数据
[返回值] 缓存数据，存什么，取什么
[参数值示例] interactionMethod.getCache(key,callbackRespFunc);
[返回值示例] 无
[调用示例] 参考示例2
[调用系统] 无
[创建人  ] 赵禄义
[创建时间] 2020年2月17日14:24:09
[修改时间] 2020年3月17日14:25:01
*/
interactionMethod.getCache = function (key, callbackRespFunc) {
  if (browser.versions.ios || browser.versions.iPhone || browser.versions.iPad) {
    setupWebViewJavascriptBridge(function (bridge) {
      bridge.callHandler('getCache', { 'key': key }, function responseCallback (responseData) {
        typeof (callbackRespFunc) === 'function' && callbackRespFunc(responseData);
      });
    });
  } else if (browser.versions.android) {
    const responseData = window.pnumber.getCache(key);
    if (typeof (callbackRespFunc) === 'function') {
      callbackRespFunc(responseData);
    } else {
      return responseData;
    }
  } else {
    // 返回-1表示不是手机端
    return '-1';
  }
};

export default interactionMethod;
/* eslint-disable */
