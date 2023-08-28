// Object property shorthand
const userName = 'Isaac'
const userAge = 22

const user ={ 
    userName,
    userAge,
    location: 'bogota'
}
console.log(user);
// object destructuring
const product = {
    label:'Red Notebook',
    price:3,
    stock:201,
    salePrice: undefined
}
const {label, stock} = product
console.log(label,stock);
//ISAACS COMMENT: this is actually used in useState from react
const userNames = ['Isaac','Alberto','Juan']
const [user1,user2] = userName
//rename destructured variables or using default value
//since rating is null 5 will be used
const {label:newLableName, rating = 5} = product
console.log(newLableName,rating);

//ISAAC COMMENT: destructure is also used in react props 
const transaction = (type, {label})=>{
    console.log(type, label);
}
transaction('order', product)