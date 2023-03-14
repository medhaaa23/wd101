
function validateDOB() {
    // Get the user's date of birth
    var dob = new Date(document.getElementById("dob").value);
    
    // Calculate the user's age
    var age = Math.floor((Date.now() - dob) / (1000 * 60 * 60 * 24 * 365.25));
    
    // Check if the user is within the age range
    if (age < 18 || age > 55) {
      alert("You must be between 18 and 60 years old to register.");
      return false;
    }
    
    // If the user's age is within the age range, submit the form
    alert("Form submitted!");
    return true;
  }


let userForm = document.getElementById("user-form");

const retrieveEntries = () =>{
    let entries = localStorage.getItem("user-entries");
    if(entries){
        entries = JSON.parse(entries);
    }
    else{
        entries = [];
    }
    return entries;
}

let userEntries= retrieveEntries();

const displayEntries = ()=>{
    const entries = retrieveEntries();
    const tableEntries = entries.map((entry)=>{
        const nameCell = `<td> ${entry.name}</td>`;
        const emailCell = `<td> ${entry.email}</td>`;
        const passwordCell = `<td> ${entry.password}</td>`;
        const dobCell = `<td> ${entry.dob}</td>`;
        const checkboxCell = `<td>${entry.checkbox}</td>`;

        const row = `<tr>${nameCell} ${emailCell} ${passwordCell} ${dobCell} ${checkboxCell}</tr>`;
        return row;
    }).join("\n");


    const table = `<table> <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Password</th>
        <th>Dob</th>
        <th>Accepted terms?</th>
    </tr> ${tableEntries} </table>`;

let details = document.getElementById("user-entries");
details.innerHTML = table; 


}

const saveUserForm =  (event)=>{
    event.preventDefault();
    const name = document.getElementById("text").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const dob = document.getElementById("dob").value;
    const checkbox = document.getElementById("checkbox").checked;

    const entry = {
        name,
        email,
        password,
        dob,
        checkbox,
    };
    userEntries.push(entry);

    localStorage.setItem("user-entries", JSON.stringify(userEntries));
    displayEntries();
}
userForm.addEventListener('submit',saveUserForm);
displayEntries();
