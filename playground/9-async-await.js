//async functions return promises by default no undefined
const add = (a,b)=>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            if(a < 0 || b <0) reject("non negative numbers")
            resolve(a + b)
        }, 2000)
    })
}

(async function(){

    const sumOne = await add(2,3);
    const sumTwo = await add(5,-3);
    console.log(sumOne),sumTwo;
})()


