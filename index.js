const nothing = async()=>{
    try{
    const response = await fetch("http://localhost:3000/server-check")
    console.log("Hello")
    }catch(err){
        console.log("Error")
    }
}

nothing()
console.log("Loading...")