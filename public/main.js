//wait for page to authenticate
// const wrapper = document.querySelector('.container')
// wrapper.style.display = 'none';

//check if user has access token
// const token = localStorage.getItem('tokenKey');

//big condition
// if(!token){
//     window.location.href = './index.html'
// }

//condition
// if(token != 'admin-user-token'){
// alert("user not logged in");
// window.location.href = './index.html'
// }

//
// setTimeout(() => {
//     wrapper.style.display = 'grid';

// }, 2000)


    //create employee 
    const createEm = document.querySelector('button.create-employee')
    console.log(createEm)
    createEm.addEventListener('click', async (e) => {
        e.preventDefault();
        alert("attempting to create")

        const getToken = localStorage.getItem('tokenKey');

        const result = await fetch('http://localhost:5000/create-employee', {
            method: 'POST',
            mode : 'cors',
            headers : {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                token: getToken
            })
        }) //fetch ends here

        if(result.status == 200 || result.status == 201){
            let response = await result.json();
            console.log(response)
        }


    })


window.addEventListener('load', () => {

console.log('response.js is working')

 //get admin name
 const adminName = document.querySelector('#admin-name');
 //get all url parameters
 const params = new URLSearchParams(window.location.search);
 
 if(params.has('name')){
     adminName.innerHTML = params.get('name');
 }

async function getAllResponses() {
  const url = 'https://kojoyeboah53i-d962a2da663c.herokuapp.com/api/ordabl/employer/1';

  try {
    const result = await fetch(url);
    const response = await result.json();
    console.log('response from server');
    console.log(response);

    // Destructure the 'employee' array from the response
    const { employee } = response;
    console.log(employee);

    // Get the table body element
    const tableBody = document.getElementById('table_body');

    // Clear existing table rows if any
    tableBody.innerHTML = ' ';

    // Populate the table with employee data
    employee.forEach(emp => {
      const row = tableBody.insertRow();

      const jobCell = row.insertCell(0);
      jobCell.textContent = emp.job_title;

      const nameCell = row.insertCell(1);
      nameCell.textContent = emp.name;

      const emailCell = row.insertCell(2);
      emailCell.textContent = emp.email;

      const actionCell = row.insertCell(3);

      //action icons
      actionCell.innerHTML = `
      <i class="material-icons edit-button" data-id="${emp.id}">edit</i>
      <i class="material-icons delete-button" data-id="${emp.id}">delete</i>
           `;
    });

    const editButtons = document.querySelectorAll('.edit-button');
    const deleteButtons = document.querySelectorAll('.delete-button');

    editButtons.forEach(button => {
      button.addEventListener('click', handleEdit);
    });

    deleteButtons.forEach(button => {
      button.addEventListener('click', handleDelete);
    });

  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

// handleEdit function
async function handleEdit(event) {
    const employeeId = event.target.getAttribute('data-id');
    // Redirect to an edit page 
    window.location.href = `patch.html?id=${employeeId}`;
}

// handleDelete function
async function handleDelete(event) {
    const employeeId = event.target.getAttribute('data-id');
    const deleteUrl = `https://kojoyeboah53i-d962a2da663c.herokuapp.com/api/ordabl/employee/${employeeId}`;

      // Ask for confirmation before proceeding
      const confirmed = window.confirm('Are you sure you want to delete this employee?');

      if (!confirmed) {
          return; // User canceled the deletion
      }

    try {
      
        const result = await fetch(deleteUrl, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            }
        }); //fetch ends 

        const response = await result.json();
        console.log('Delete response:', response);

        if (response) {
          const rowToDelete = event.target.closest('tr');
            rowToDelete.classList.add('remove-deleted');

          
            setTimeout(() => {

                rowToDelete.remove();
            // Refresh the table after successful deletion
            getAllResponses();
            },300);
        } else {
            console.log('Delete operation did not return a response.');
        }
    } catch (error) {
        console.error('Error deleting data:', error);
    }
}

getAllResponses();



  
//toggle

const light_mode = document.querySelector("div.theme-toggler span.light_mode");
const dark_mode = document.querySelector("div.theme-toggler span.dark_mode");

dark_mode.addEventListener('click', () => {
    document.body.classList.add('dark-theme-variables');
    dark_mode.classList.add('active');
    light_mode.classList.remove('active');
});

light_mode.addEventListener('click', () => {
    document.body.classList.remove('dark-theme-variables');
    dark_mode.classList.remove('active');
    light_mode.classList.add('active');
});



    // logout
    const logout = document.querySelector(".logout");
    logout.addEventListener("click", async (e) => {
        e.preventDefault();
        console.log('button clicked')
        const confirmed = confirm("are you sure you want to logout");


        //if true then logout user 
        if(confirmed == true){
            let token = localStorage.getItem('tokenKey');
            console.log(token)
            if(token != ""){
                
                const result = await fetch('http://localhost:5000/backend/logout',{
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"

                    },
                    // body: JSON.stringify({}),

                    mode : 'cors'
                 })
            // })

            if(result.status == 200){

                localStorage.setItem('tokenKey', "");
                
                window.location.href = "./index.html";
            }else{
              console.log('logout not successful')
            }
        }
        
    }
        // return;
    });

})