 // Import the compare function from the appropriate file

  //function to compare the two objects so that in case of nested objects it can compare them as well as well as the arrangement of the keys
  function compare(obj1: any, obj2: any) {
    //if the two objects are not of the same type then return false
    if (typeof obj1 !== typeof obj2) {
      return false;
    }
    //if the two objects are arrays then compare them
    if (Array.isArray(obj1) && Array.isArray(obj2)) {
      if (obj1.length !== obj2.length) {
        return false;
      }
      for (let i = 0; i < obj1.length; i++) {
        if (!compare(obj1[i], obj2[i])) {
          return false;
        }
      }
    }
    //if the two objects are objects then compare them
    else if (typeof obj1 === "object" && typeof obj2 === "object") {
      const keys1 = Object.keys(obj1);
      const keys2 = Object.keys(obj2);
      if (keys1.length !== keys2.length) {
        return false;
      }
      for (let key of keys1) {
        if (!compare(obj1[key], obj2[key])) {
          return false;
        }
      }
    }
    //if the two objects are not arrays or objects then compare them
    else {
      if (obj1 !== obj2) {
        return false;
      }
    }
    return true;
  }


const arr=[{name:"tim",age:3},{name:"nancy",age:2}]
const testObj={age:3,name:"tim"}
const testObj1={name:"tim",age:3}
//fix the arr.includes to work on objects
console.log(arr.some((item)=>compare(item,testObj)));
