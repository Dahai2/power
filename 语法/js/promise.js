$.ajax({
  url: 'https://www.easy-mock.com/mock/5a52256ad408383e0e3868d7/lagou/city',
  success (resCity) {
    let findCityId = resCity.filter(item => {
      if (item.id == 'c1') {
        return item
      }
    })[0].id

    $.ajax({
      //  请求第二个API: 根据上一个返回的在北京公司的id “findCityId”，找到北京公司的第一家公司的id
      url: 'https://www.easy-mock.com/mock/5a52256ad408383e0e3868d7/lagou/position-list',
      success (resPosition) {
        let findPostionId = resPosition.filter(item => {
          if (item.cityId == findCityId) {
            return item
          }
        })[0].id
        // 请求第三个API: 根据上一个API的id(findPostionId)找到具体公司，然后返回公司详情
        $.ajax({
          url: 'https://www.easy-mock.com/mock/5a52256ad408383e0e3868d7/lagou/company',
          success (resCom) {
            let comInfo = resCom.filter(item => {
              if (findPostionId == item.id) {
                return item
              }
            })[0]
            console.log(comInfo)
          }
        })
      }
    })
  }
})


// Promise 写法
// 第一步：获取城市列表
const cityList = new Promise((resolve, reject) => {
  $.ajax({
    url: 'https://www.easy-mock.com/mock/5a52256ad408383e0e3868d7/lagou/city',
    success (res) {
      resolve(res)
    }
  })
})

// 第二步：找到城市是北京的id
cityList.then(res => {
  let findCityId = res.filter(item => {
    if (item.id == 'c1') {
      return item
    }
  })[0].id

  findCompanyId().then(res => {
    // 第三步（2）：根据北京的id -> 找到北京公司的id
    let findPostionId = res.filter(item => {
      if (item.cityId == findCityId) {
        return item
      }
    })[0].id

    // 第四步（2）：传入公司的id
    companyInfo(findPostionId)

  })

})

// 第三步（1）：根据北京的id -> 找到北京公司的id
function findCompanyId () {
  let aaa = new Promise((resolve, reject) => {
    $.ajax({
      url: 'https://www.easy-mock.com/mock/5a52256ad408383e0e3868d7/lagou/position-list',
      success (res) {
        resolve(res)
      }
    })
  })
  return aaa
}

// 第四步：根据上一个API的id(findPostionId)找到具体公司，然后返回公司详情
function companyInfo (id) {
  let companyList = new Promise((resolve, reject) => {
    $.ajax({
      url: 'https://www.easy-mock.com/mock/5a52256ad408383e0e3868d7/lagou/company',
      success (res) {
        let comInfo = res.filter(item => {
          if (id == item.id) {
            return item
          }
        })[0]
        console.log(comInfo)
      }
    })
  })
}

