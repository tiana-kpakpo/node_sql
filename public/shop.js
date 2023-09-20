document.addEventListener('DOMContentLoaded', function () {
    const currentDateInput = document.getElementById('currentDate');
    const today = new Date();
    // console.log('Current date:', today);

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(today.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;
    currentDateInput.value = formattedDate;

    // console.log('Formatted date:', formattedDate);

});

//toggle

const themeToggler = document.querySelector("div.theme-toggler");

themeToggler.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme-variables');
    themeToggler.classList.toggle('active');
});



const uploadButton = document.querySelector("input[type=file]");

uploadButton.addEventListener("change", async (event) => {
    try {
         alert("attempting to upload to image file")
    let fileImage =  event.target.files[0];
    if(!fileImage){
        return alert("no file selected")
    }

    const formData = new FormData();
    formData.append("file", fileImage);
    let server =  await fetch('http://localhost:7070/store-image', {
        method : 'POST',
        headers: {
           Accept: "application/octet-stream",
        },
        body:  formData
    
    
    })//fetch api ends here

        if(server.status == 200){
        const response = await server.json()
            console.log(response)

            //submit product details
            const name = document.querySelector('input#productName').value;
            const description = document.querySelector('input#description').value;
            const stock = document.querySelector('input#stock').value;
            const price = document.querySelector('input#price').value;

            let result =  await fetch('http://localhost:7070/product-upload', {
                method : 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body:  JSON.stringify({
                    name: name,
                    description : description,
                    stock: stock,
                    price: price,
                    filename: response.filename
                })
            
            
            })
            const res = result.json();
            console.log(res)

        }

    } catch(err) {
        console.log(err)
     } 
});

// const addBtn = document.querySelector('.addProduct')
// addBtn.addEventListener('click', async () => {


// })


    // logout
    const logout = document.querySelector(".logout");
    logout.addEventListener("click", async (e) => {
        e.preventDefault();
        const confirmed = confirm("are u sure u want to logout");


        //if true then logout user 
        if(confirmed == true){
            window.location.href = "index.html";
            /*
            let token = localStorage.getItem('tokenKey');
            console.log(token)
            if(token != ""){
                
                const result = await fetch('http://localhost:5151/api/logout', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    mode : 'cors'
                 })

            if(result.status == 200){

                localStorage.removeItem('tokenKey');
                
            }
        } */
        
    }
        // return;
    });