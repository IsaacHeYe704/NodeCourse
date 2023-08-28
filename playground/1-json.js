const fs = require('fs');

const dataBuffer = fs.readFileSync('1-json.json');
const data = dataBuffer.toString();
const dataJSON = JSON.parse(data);
const newData ={
    name: "Isaac",
    planet:dataJSON.planet,
    age: 22
}
console.log(newData);
const newDataJSON = JSON.stringify(newData);
fs.writeFileSync('1-json.json', newDataJSON);