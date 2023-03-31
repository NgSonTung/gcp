const fs = require("fs");

const data = [
  "acer",
  "apple",
  "asus",
  "ava",
  "befit",
  "corsair",
  "garmin",
  "honor",
  "hp",
  "xiaomi",
  "huawei",
  "lenovo",
  "linksys",
  "logitech",
  "mesh",
  "mozard",
  "nokia",
  "oppo",
  "poco",
  "rapoo",
  "realme",
  "samsung",
  "tenda",
  "vivo",
];

let result = [];
let index = 0;
for (let i of data) {
  index += 1;
  result.push({
    brandID: index,
    brandName: i,
  });
}
const fjson = JSON.stringify(result);
fs.writeFileSync("brand.json", fjson);
