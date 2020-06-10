/**
 * 获取当前地理位置
 * 未加载到百度地图时，默认取天安门坐标
 * 500毫秒内未获取到地理位置时，默认取天安门坐标
*/
import { fetchConfig } from '@/api/common';
export const DEFAULT_LOCATION = { longitude: 116.40387397, latitude: 39.91488908 };

const wxGetLocation = () => {
  const url = window.location.href;
  console.log('wxGetLocation');
  return new Promise((resolve, reject) => {
    fetchConfig(url).then(res => {
      toAuth(res).then(authData => {
        // console.log(authData)
        resolve(authData);
      });
    }).catch(err => {
      reject(err);
    });
  });
};
export const getLocation = wxGetLocation;
const toAuth = (res) => {
  return new Promise((resolve, reject) => {
    window.wx.config({
      debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: res.appId, // 必填，公众号的唯一标识
      timestamp: res.timestamp, // 必填，生成签名的时间戳
      nonceStr: res.nonceStr, // 必填，生成签名的随机串
      signature: res.signature, // 必填，签名
      jsApiList: [
        'openLocation',
        'getLocation'
      ]
    });
    window.wx.ready(function () {
    // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
      window.wx.getLocation({
        type: 'gcj02',
        // type: 'wgs84',
        success: function (res) {
          resolve({
            status: 'OK',
            latitude: res.latitude,
            longitude: res.longitude
          });
        },
        cancel: function () {
          resolve({
            status: 'CANCEL'
          });
        },
        fail: function () {
          resolve({
            status: 'FAIL'
          });
        }
      });
    });
    window.wx.error(function (error) {
    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
      reject(error);
    });
  });
};
