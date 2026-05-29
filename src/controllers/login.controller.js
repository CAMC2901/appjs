export async function loginController(){
    const form = document.getElementById("loginForm");

    form.addEventListener("submit", async (event)=>{
        event.preventDefault()

        const username = document.getElementById("username").value
        const password = document.getElementById("password").value

        if (!username || !password){
            alert("The fields are required!!")
            return
        }

        const userData = await loginFunction(username, password)
        
        if(userData.length > 0){
            const user = userData[0]
            localStorage.setItem("user", JSON.stringify(user))

            // Redirige según el rol
            window.location.hash = "home"
        }else{
            alert("User or password are wrong!!!")
        }
    })
}

async function loginFunction(username, password){
    const response = await fetch(`http://localhost:3000/users?username=${username}&password=${password}`)
    const data = await response.json()
    return data
}