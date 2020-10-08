var arr = [1, 2, 3];

//----------------------------------------------
function head(arr){
    if(arr[0] == undefined) return null;
    return arr[0];
}
console.log("Head of [1,2,3] =", head(arr));
//----------------------------------------------

//----------------------------------------------
function tail(arr){
    return tailHelper(arr, 0, []);
}

function tailHelper(arr, i, newArr){

    if(arr[i] == undefined) return newArr;
    if(i == 0) return tailHelper(arr, i + 1, []);

    newArr[i - 1] = arr[i];
    return tailHelper(arr, i + 1, newArr);
}
console.log("Tail of [1,2,3] =", tail(arr));
//----------------------------------------------

//----------------------------------------------
function map(arr, func){
    return mapHelper(arr, func, 0, []);
}

function mapHelper(arr, func, i, newArr){
    if(arr[i] == undefined) return newArr;

    newArr[i] = func(arr[i]);
    return mapHelper(arr, func, i + 1, newArr);
}

identity = n => n;
square = n => n*n;
cube = n => n*n*n;

console.log("Map : Cube maping of [1,2,3] =", map(arr, cube));
//----------------------------------------------

//----------------------------------------------
function filter(arr, func){
    return filterHelper(arr, func, 0, [], 0);
}

function filterHelper(arr, func, index, newArr, newIndex){
    if(arr[index] == undefined) return newArr;

    if(func(arr[index])){
        newArr[newIndex] = arr[index];
        return filterHelper(arr, func, index + 1, newArr, newIndex + 1);
    }

    return filterHelper(arr, func, index + 1, newArr, newIndex);
}

filterUpperCase = ch => (/^[A-Z]/).test(ch);
filterLowerCase = ch => (/^[a-z]/).test(ch);
isEven = n => (n % 2 == 0);
isOdd = n => (n % 2 != 0);

console.log("filterUpperCase on ['a','B','c','D'] =", filter(['a','B','c','D'], filterUpperCase));
//----------------------------------------------

//----------------------------------------------
function reduce(arr, func, initialValue){
    if(initialValue == undefined)
        return reduceHelper(arr, func, 1, arr[0]);
    else
        return reduceHelper(arr, func, 0, initialValue);
}

function reduceHelper(arr, func, i, result){
    if(arr[i] == undefined) return result;

    var value = func(result, arr[i]);
    return reduceHelper(arr, func, i + 1, value);
}
console.log("Reduce : Sum of [1,2,3] =", reduce(arr, (x, y) => x + y));
//----------------------------------------------

//----------------------------------------------
function max(arr){
    if(arr[0] == undefined) return null;
    return maxHelper(arr, 0);
}

function maxHelper(arr, i){
    if(arr[i] == undefined) return Number.NEGATIVE_INFINITY;

    var maxOfRest = maxHelper(arr, i + 1);
    return (arr[i] >= maxOfRest) ? arr[i] : maxOfRest;
}
console.log("Max of [1,2,3] =", max(arr));
//----------------------------------------------

//----------------------------------------------
function min(arr){
    if(arr[0] == undefined) return null;
    return minHelper(arr, 0);
}

function minHelper(arr, i){
    if(arr[i] == undefined) return Number.POSITIVE_INFINITY;

    var minOfRest = minHelper(arr, i + 1);
    return (arr[i] <= minOfRest) ? arr[i] : minOfRest;
}
console.log("Min of [1,2,3] =", min(arr));
//----------------------------------------------

//----------------------------------------------
function reverse(arr){
    var newArr = [];
    reverseHelper(arr, 0, newArr);
    return newArr;
}

function reverseHelper(arr, i, newArr){
    if(arr[i] == undefined) return i - 1;

    var size = reverseHelper(arr, i + 1, newArr);
    newArr[size - i] = arr[i];
    return size;
}
console.log("Reverse of [1,2,3] =", reverse(arr));
//----------------------------------------------

//----------------------------------------------
function last(arr){
    return head(reverse(arr));
}
console.log("Last of [1,2,3] =", last(arr));
//----------------------------------------------

//----------------------------------------------
function init(arr){
    return reverse(tail(reverse(arr)));
}
console.log("Init of [1,2,3] =", init(arr));
//----------------------------------------------

//----------------------------------------------
function length(arr){
    return lengthHelper(arr, 0);
}

function lengthHelper(arr, i){
    if(arr[i] == undefined) return 0;
    return lengthHelper(arr, i + 1) + 1;
}
console.log("Length of [1,2,3] =", length(arr));
//----------------------------------------------

//----------------------------------------------
function take(arr, n){
    return takeHelper(arr, n, 0, []);
}

function takeHelper(arr, n, i, newArr){
    if(n == 0 || arr[i] == undefined) return newArr;

    newArr[i] = arr[i];
    return takeHelper(arr, n - 1, i + 1, newArr);
}
console.log("Take first 2 elements of [1,2,3] =", take(arr, 2));
//----------------------------------------------

//----------------------------------------------
function drop(arr, n){
    if(n == 0) return arr;

    var len = length(arr);
    if(n >= len) return [];

    return reverse(take(reverse(arr), len - n));
}
console.log("Drop first 2 elements of [1,2,3] =", drop(arr, 2));
//----------------------------------------------

//----------------------------------------------
function contains(arr, n){
    if(typeof(n) == "object")
        return containsObject(arr, n, 0);
    return containsItem(arr, n, 0);
}

function containsItem(arr, n, i){
    if(arr[i] == undefined) return false;
    if(arr[i] == n) return true;
    return containsItem(arr, n, i + 1);
}

function containsObject(arr, obj, i){
    if(arr[i] == undefined) return false;
    if(objectCompare(arr[i], obj)) return true;
    return containsObject(arr, obj, i + 1);
}

function objectCompare(obj1, obj2){
    if(typeof(obj1)!="object" || typeof(obj2)!="object") return false;

    let ent1 = Object.entries(obj1);
    let ent2 = Object.entries(obj2);

    let len1 = length(ent1);
    let len2 = length(ent2);
    if(len1 != len2) return false;

    return objectCompareHelper(ent1, ent2, 0);
}

function objectCompareHelper(arr1, arr2, i){
    if(arr1[i] == undefined) return true;
    if(arr1[i][0] != arr2[i][0] || arr1[i][1] != arr2[i][1])
        return false;
    return objectCompareHelper(arr1, arr2, i + 1);
}
console.log("2 contains in [1,2,3] =", contains(arr, 2));
console.log("{b : 2} contains in [{a : 1}, {b : 2}] =", contains([{a : 1}, {b : 2}], {b : 2}));
//----------------------------------------------

//----------------------------------------------
function cycle(arr){
    var len = length(arr);
    var obj = {
        array : arr,
        length : len,
        index : 0,
        next : function(){
            var val = this.array[this.index];
            this.index = (this.index + 1) % this.length;
            return val;
        }
    }
    return obj;
}
var x = cycle([1, 2, 3]);
console.log("x = cycle([1,2,3])");
console.log("x.next() =", x.next());
console.log("x.next() =", x.next());
//----------------------------------------------

//----------------------------------------------
function range(start, end, step = 1){
    return rangeHelper(start, end, step, [], 0);
}

function rangeHelper(val, end, step, arr, i){
    if(step > 0 && val >= end) return arr;
    if(step < 0 && val <= end) return arr;

    arr[i] = val;
    return rangeHelper(val + step, end, step, arr, i + 1);
}
console.log("range(0,5) =", range(0,5));
//----------------------------------------------

//----------------------------------------------
function sum(arr){
    return reduce(arr, (x, y) => x + y);
}
console.log("Sum of range(1,11) =", sum(range(1,11)));
//----------------------------------------------

//----------------------------------------------
function sumOfSquares(arr){
    return sum(map(arr, square));
}
console.log("Sum of Squares of [1,2,3] =", sumOfSquares(arr));
//----------------------------------------------

