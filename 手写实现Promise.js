//实现promise.all
function diyPromiseAll(promises){
  return new Promise((resolve,reject)=>{
    if(!Array.isArray(promises)){
      throw new TypeError('promises must be an Array')
    }
    let result = [];
    let count = 0;
    promises.forEach((promise,index)=>{
      promise.then((res)=>{
        result[index] = res;
        count++;
        count === promises.length && resolve(result);
      },(err)=>{
        reject(err)
      })
    })
  })
}
let p1 = Promise.resolve(1),
    p2 = Promise.resolve(2),
    p3 = Promise.resolve(3);

diyPromiseAll([p1, p2, p3]).then((res)=>{
    console.log(res, 'res')
}, (err)=>{
    console.log(err, 'err')
})
// [1, 2, 3]
//实现promise.race
function diyPromiseRace(promises){
  return new Promise((resolve,reject)=>{
    if(!Array.isArray(promises)){
      throw new TypeError('promises must be an Array')
    }
    promises.forEach((promise,index)=>{
      promise.then((res)=>{
        resolve(res)
      },(err)=>{
        reject(err)
      })
    })
  })
}
diyPromiseRace([p1,p2,p3]).then((res)=>{
  console.log(res);
}).catch((err)=>{
  console.log(err)
})
//实现Promise
const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';
class DiyPromise{
  constructor(executor){
    this.status = PENDING;
    this.value = undefined;
    this.reason = undefined;
    let resolve = (value)=>{
      if(this.status === PENDING){
        this.status = FULFILLED;
        this.value = value;
      }
    }
    let reject = (reason)=>{
      if(this.status === PENDING){
        this.status = REJECTED;
        this.reason = reason;
      }
    }
    try{
    // 立即执行，将 resolve 和 reject 函数传给使用者
      executor(resolve,reject)
    }catch(error){
      reject(error)
    }
  }
  then(onFulfilled, onRejected){
    if(this.status===FULFILLED){
      onFulfilled(this.value)
    }else if(this.status===REJECTED){
      onRejected(this.reason)
    }
  }
}
const diyPromise = new DiyPromise((resolve, reject) => {
  resolve('成功');
}).then(
  (data) => {
    console.log('success', data)
  },
  (err) => {
    console.log('faild', err)
  }
)// success 成功