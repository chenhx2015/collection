let arr = [1, [[2, 3], 4], [5, 6]];

function flat(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (typeof arr[i] !== "number") {
      flat(arr[i]);
    } else {
      console.log(arr[i]);
    }
  }
}
flat(arr); // 1, 2, 3, 4, 5, 6
