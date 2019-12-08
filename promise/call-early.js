import { thirdFunction } from "./third-module-callback";
import { thirdFunction as thirdFunction2Promise } from "./thrid-module-promise";

var a = 0;
function result(data) {
  console.log(a);
}

//使用 callback
thirdFunction(url, result);

//使用promise
thirdFunction2Promise(url).then(function(val) {
  result();
});

a++;
