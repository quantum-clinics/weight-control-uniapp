// 通过uni.api请求的方法返回的参数因平台差异性不同需要转换成相同的模式

// 接口传递参数需要配置
// 接口返回参数需要配置

const config = {
  'weixin': {
    userInfo: 'scope.userInfo',
  },
  'alipay': {
    userInfo: 'userInfo',
  }
};

export default config;
