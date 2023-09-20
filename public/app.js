window.addEventListener('load', () => {


    console.log('app.js is working'); 


    const btn = document.querySelector('.input-group button');

    btn.addEventListener('click', async function (e) {
        e.preventDefault();

        const email = document.querySelector('input#email');
        const password = document.querySelector('input#password');
        // console.log(email.value);
        const error = document.querySelector('.wrapper form .error');
        const message = document.querySelector('.wrapper form .error .error-message');
        
        message.style.padding = '13px;'

                //checks for empty email and password
        if (email.value == '' || email.value == null || password.value == '' || password.value == null) {
            $(error).fadeIn('slow');
            $(message).text('field cannot be empty');

            // remove error message after 3 seconds
            setTimeout(() => {
                $(error).fadeOut('slow');
            }, 3000);
            return;
        }else{
            
            // alert(email.value)

            //make fetch request
            const result = await fetch('http:localhost:5000/backend/auth',{
                method: 'POST',
                headers : {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email.value,
                    password: password.value
                })
               }) //fetch ends here

               //check http status
               if(result.status != 200){
                //get message from response
                 const response = await result.json();
                $(error).fadeIn('slow');
                $(message).text(response.message);

                    // remove error message after 3 seconds
                    setTimeout(() => {
                        $(error).fadeOut('slow');
                    }, 3000);

                    return;
                   }

                   if(result.status == 200){
                    //getting user back from server

                    const response = await result.json();
                    let name = response.name;
                    let token = response.token;

                    //clear previous storage
                    localStorage.setItem('name', '');
                    localStorage.setItem('tokenkey', '');

                     
                     //set new storage
                     localStorage.setItem('name', name);
                     localStorage.setItem('tokenKey', token);

                    window.location.href = `./dashboard.html?name=${name}`;
                
                   }

        }
        

     


    });

})






