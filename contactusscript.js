function validateForm() {
    // Get form elements
    const name = document.getElementById('i1').value;
    const email = document.getElementById('i2').value;
    const mobile = document.getElementById('i3').value;
    const query = document.getElementById('i4').value;

    // Regular expression for email validation
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    // Regular expression for mobile number validation (assuming a 10-digit number)
    const mobilePattern = /^[0-9]{10}$/;

    // Validate Full Name (not empty)
    if (name === "") {
        alert("Full Name is required!");
        return false;
    }

    // Validate Email
    if (email === "") {
        alert("Email address is required!");
        return false;
    } else if (!email.match(emailPattern)) {
        alert("Please enter a valid email address!");
        return false;
    }

    // Validate Mobile Number
    if (mobile === "") {
        alert("Mobile Number is required!");
        return false;
    } else if (!mobile.match(mobilePattern)) {
        alert("Please enter a valid 10-digit mobile number!");
        return false;
    }

    // Validate Query (not empty)
    if (query === "") {
        alert("Query is required!");
        return false;
    }

    // If all fields are valid, trigger success modal
    const successModal = new bootstrap.Modal(document.getElementById('successModal'));
    successModal.show();
    
    // Optionally, you can reset the form here if you want after successful submission
    document.getElementById('myform').reset();
    
    return false; // Prevent form submission (optional, as we're using modal to show success)
}
