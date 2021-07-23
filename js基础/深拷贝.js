//普通赋值引用数据类型
let orignArray = [1,2,3,4,5,6]
let copyArray = orignArray
copyArray = [1,1,1,1,1]
console.log(copyArray)//[1,1,1,1,1]
console.log(orignArray)//[1,1,1,1,1]
//1.JSON转换：
let copyObj = [1,2,3,4,5]
let targetObj = JSON.parse(JSON.stringify(copyObj))
//2.普通递归函数：
function deepCopy( source ) {
if (!isObject(source)) return source; //如果不是对象的话直接返回
    let target = Array.isArray( source ) ? [] : {} //数组兼容
    for ( let k in source ) {
    	if (source.hasOwnProperty(k)) {//只拷贝对象自身的属性
    		if ( typeof source[ k ] === 'object' ) {
            	target[ k ] = deepCopy( source[ k ] )
        	} else {
            	target[ k ] = source[ k ]
        	}
    	}
    }
    return target	
}
function isObject(obj) {
    return typeof obj === 'object' && obj !== null
}
