//用户校验
export function nameRule(rule,value,callback){
  let reg = /^[\w-]{4,16}$/ ;
  if (value === "") {
    callback(new Error('请输入用户名'));
  }else if (!reg.test(value)) {
    callback(new Error('请输入4-10位用户名'));
  } else {
    callback();
  }

}

// 密码正则匹配
export function passRule(rule, value, callback) {
  let pass = /^[\w-]{4,16}$/  ;
  if (value === "") {
    callback(new Error('请输入密码'));
  } else if (!pass.test(value)) {
    callback(new Error('请输入6-12位密码'));
  } else {
    callback();
  }
}