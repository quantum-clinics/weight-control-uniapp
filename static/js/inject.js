const app = getApp();
const utils = require("./utils");
const __callAPI = utils.callAPI;
const retryOption = {
  waitTime: app.globalData.requestRetryWaitTime || 5
};

export default function (origin) {
  const originData = origin.data ? { ...origin.data() } : null;
  const originMethods = origin.methods ? { ...origin.methods } : null;
  return {
    ...origin,
    data() {
      return {
        ...originData,
        errorMessage: '',
        OSS: app.globalData.OSS,
      }
    },
    onHide() {
      uni.hideLoading();
    },
    methods: {
      ...originMethods,
      callAPI(method, params, callBack) {
        return new Promise((resolve, reject) => {
          const onFinish = (err, data, pushs) => {
            if (err) {
              uni.hideLoading();

              if (err.code === 100) {
                // no permission error, redirect to launch page
                return uni.reLaunch({
                  url: '/pages/launch/index',
                });
              }

              if (err.code === 20001) {
                return uni.showModal({
                  title: '提示',
                  content: err.message,
                  success: ({ confirm }) => {
                    if (!confirm) {
                      return
                    }

                    uni.navigateTo({
                      url: '/pages/refill/index',
                    })
                  }
                });
              }

              if (!(callBack && callBack(err))) {
                this.message(`[网络错误-代码:${err.code}] ${err.message}`);
              }

              return reject(err);
            }
            // if (pushs && pushs.trophy) {
            //   this.showTrophyDialog(pushs.trophy);
            // }

            // if (pushs && pushs.task) {
            //   this.showTaskTestDialog(test);
            // }

            callBack && callBack(null, data.result);
            resolve(data.result);
          };

          if (params && params.__delay) {
            setTimeout(() => {
              __callAPI(method, {
                ...params,
                __delay: null
              }, onFinish, retryOption);
            }, params.__delay);
          } else {
            __callAPI(method, params, onFinish, retryOption);
          }
        });
      },
      message(text, type) {
        clearTimeout(this.msgTimer);

        this.errorMessage = text || '';
        this.msgType = type || 'warn';

        this.msgTimer = setTimeout(() => {
          this.errorMessage = '';
          this.msgType = type || 'warn';
        }, 3500);
      }
    }
  }
}
