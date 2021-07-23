//Animal父类，Dog子类
//1.ES5实现继承
function Animal(name,age){
  this.name = name;
  this.age = age;
}
Animal.prototype.drink = function(){
  console.log('i can drink')
}
function Dog(name,age,like){
  Animal.call(this,name,age);
  this.like = like;
}
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;
let coco = new Dog('旺财',3,'牛肉');
console.log(coco.name,coco.age,coco.like);
coco.drink();
//2.ES6类实现继承
class Father{
  constructor(name,age){
    this.name = name;
    this.age = age;
  }
  drink(){
    console.log('i can drink')
  }
}
class Child extends Father{
  constructor(name,age,like){
    super(name,age);
    this.like = like;
  }
}
let lolo = new Child('小明',29,'apple');
console.log(lolo.name,lolo.age,lolo.like)
lolo.drink();