let button = document.querySelector("button")
let img = document.getElementsByTagName("img")[0]
img.setAttribute("src","https://images.dog.ceo/breeds/terrier-silky/n02097658_188.jpg")

button.addEventListener("click",()=>{
    //fetch scaffolding
    let endpoint = "https://dog.ceo/api/breeds/image/random"
    fetch(endpoint) //utilizing the endpoint, default is GET
        .then((data)=>{
            console.log(data)
            if(data.ok){
                return data.json()//returning parsed data
            }else{
                throw Error('James broke it!!!')
            }

        }
        )
        .then(parsedData => {
            console.log(parsedData.message)
            img.setAttribute("src", parsedData.message)
        })
        .catch(errors=>{
            console.log(errors)
        })
    }
)