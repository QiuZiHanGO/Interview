//[1,[2,[3,4]],5] >>> [1,2,3,4,5]
let originArray = [1,[2,[3,4]],5]
//普通递归方法
function arrayFloat(arr){
  let target = [];
  arr.forEach(element => {
    if(!Array.isArray(element)){
      target.push(element);
    }else{
      target = target.concat(arrayFloat(element))
    }
  });
  return target
}
console.log(arrayFloat(originArray));
//使用reduce实现扁平化
const flat = (arr) => {
  return arr.reduce((prev,cur)=>{
    return prev.concat(Array.isArray(cur)?flat(cur):cur) 
  },[])
}
console.log(flat(originArray));