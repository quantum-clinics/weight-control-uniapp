import request from '@/static/js/base';

// 用户获取首页推荐课程
function userFetchRecomProducts() {
  return request({
    data: {
      method: "bonusProduct.getLastestBonusCourseProducts",
    }
  })
}

// 用户获取全部课程
function userFetchAllProduct(page, pageSize) {
  return request({
    data: {
      method: "bonusProduct.getBonusCourseProducts",
      data: {
        page,
        pageSize,
      }
    }
  })
}

// 用户兑换课程
function userExchangeProduct(id) {
  return request({
    data: {
      method: "bonusProduct.exchangeProduct",
      data: {
        id,
      }
    }
  })
}

export {
  userFetchRecomProducts,
  userFetchAllProduct,
  userExchangeProduct,
}
