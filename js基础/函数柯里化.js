//add(1)(2)(3)得出6
//简单的闭包实现
function sum(x){
  return function(y){
    x = x+y;
    return function(z){
      x = x+z;
      return x
    }
  }
}
console.log(sum(1)(2)(3));
//通用版本
function add(){
  // 第一次执行时，定义一个数组专门用来存储所有的参数
  let _args=Array.prototype.slice.call(arguments)
  // 在内部声明一个函数，利用闭包的特性保存_args并收集所有的参数值
  let _adder = function(){
      _args.push(...arguments)
      return _adder
  }
  // toString隐形转换的特性
  _adder.toString = function(){
      return _args.reduce(function(prev,curr){
          return prev+curr
      },0)
  }
  return _adder;
}
console.log(add(1)(2)(3))