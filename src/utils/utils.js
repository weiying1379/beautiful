// 不足10补0
export let getDate = (utctime) => {

  let date = (typeof utctime == 'string' ? new Date(utctime) : utctime)//判断传入值为单个还是数组多个
  // if(typeof time  == 'string')
  //     t = new Date(time)
  // else 
  //     t = time
  //Date会自动把时间转化为当前时区的时间
  // 1. 取带时区的时间
  function getnum(num) {
    return num < 10 ? "0" + num : num;
  }
  return getnum(date.getFullYear()) + '-' + getnum(date.getMonth() + 1) + '-' + getnum(date.getDate()) + ' ' +getnum(date.getHours()) + ":" + getnum(date.getMinutes()) + ":" + getnum(date.getSeconds())


}
