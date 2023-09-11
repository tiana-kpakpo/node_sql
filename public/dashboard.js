 // Function to parse query parameters from the URL
//  function getQueryParams() {
//     const queryParams = {};
//     const queryString = window.location.search.substring(1);
//     const paramPairs = queryString.split('&');

//     for (const pair of paramPairs) {
//         const [key, value] = pair.split('=');
//         queryParams[key] = decodeURIComponent(value);
//     }

//     return queryParams;
// }

// // Get query parameters from the URL
// const queryParams = getQueryParams();

// // Populate the table with the data
// const nameElement = document.getElementById('name');
// const emailElement = document.getElementById('email');
// const jobTitleElement = document.getElementById('jobTitle');

// if (queryParams.name) {
//     nameElement.textContent = queryParams.name;
// }

// if (queryParams.email) {
//     emailElement.textContent = queryParams.email;
// }

// if (queryParams.jobTitle) {
//     job_titleElement.textContent = queryParams.job_title;
// }

window.addEventListener('load', () => {

    console.log('variable.js is working');

    const switched = document.querySelector('.content .header .switch');
    
    switched.addEventListener('click', function(e) {
        e.preventDefault();

        document.body.classList.toggle('theme-dark');
    });

    setInterval(() => {
    const width = window.innerWidth;
    if(width <= 480) {
        console.log('width is less than 480');
        const sidebar = document.querySelector('.sidebar');
        sidebar.classList.add('sidebar-short');
    }
    }, 4000);

    const showBtn = document.querySelector('.show span');
    const sidebar = document.querySelector('.sidebar');

    showBtn.addEventListener('click', function(e) {
        e.preventDefault();
        sidebar.classList.remove('sidebar-short');
        sidebar.classList.toggle('sidebar-full');
    });


    //getting all employees

    async function getAllResponses() {
        const url = 'http://localhost:7070/api/employees';
      
        try {
          const result = await fetch(url);
          const response = await result.json();
          console.log('response from server');
          console.log(response);
      
          // Get the table body element
          const tableBody = document.getElementById('table_body');
      
          // Clear existing table rows if any
          tableBody.innerHTML = ' ';
      
          // Populate the table with employee data
          response.forEach(emp => {
            const row = tableBody.insertRow();

            const nameCell = row.insertCell(0); 
            nameCell.textContent = emp.name;
            
            const emailCell = row.insertCell(1); 
            emailCell.textContent = emp.email;
            
            const jobCell = row.insertCell(2); 
            jobCell.textContent = emp.job_title;
            
            const actionCell = row.insertCell(3);
            
            // action icons
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
    const deleteUrl = `http://localhost:7070/api/employee/${employeeId}`;

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


  
});