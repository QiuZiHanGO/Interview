//1.冒泡排序
let orignArray = [1,5,3,4,2,9,8,3]
function bubbleSort(nums){
  let length = nums.length;
  for(let i=0;i<length-1;i++){
    for(let j=0;j<length-i;j++){
      if(nums[j] > nums[j+1]){
        let temp = nums[j+1];
        nums[j+1] = nums[j];
        nums[j] = temp;
      }
    }
  }
  return nums
}
console.log(bubbleSort(orignArray))
//2.快速排序
function quickSort(nums){
  if(nums.length === 0 || nums.length === 1){
    return nums
  }
  let middleIndex = Math.floor(nums.length/2);
  let middleItem = nums.splice(middleIndex,1);
  let rightList = [],leftList = [];
  nums.forEach(element => {
    if(element<=middleItem){
      leftList.push(element)
    }else{
      rightList.push(element)
    }
  });
  return quickSort(leftList).concat(middleItem).concat(quickSort(rightList))
}
console.log(quickSort(orignArray))
//3.选择排序