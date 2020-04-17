function printf(str, info) {
  for (const key in info) {
    if (info.hasOwnProperty(key)) {
      const element = info[key];
      console.log("e", element);
      console.log(typeof element);
    }
  }
}
let str = "kkk";
let infoObj = {
  name: "chen",
  city: "shanghai"
};
printf(str, infoObj);
