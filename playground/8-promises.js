const doWorkPromise = new Promise((resolve, reject)=>
{
    setTimeout(()=>{
        resolve('2 seconds have passed')
        // reject('unable to complete')
    }, 2000)
})

//
//
//                            Fullfiled
//                          /
//Promise === Pending --> 
//                          \
//                            Rejected
//
//
doWorkPromise
.then((result)=> console.log(result))
.catch( error => console.log(error))

const add = (a,b)=>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve(a + b)
        }, 2000)
    })
}


add(1,2)
.then((n)=>(add(n,2))
)
.then( result => console.log(result))
.catch( e => console.log(e))
.finally( ()=> console.log('result has arrived'))


