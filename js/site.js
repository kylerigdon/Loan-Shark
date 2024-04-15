
// Display the message the user entered.
function displayMessage() {
    let inputBox = document.getElementById('message');
    let message = inputBox.value;

    Swal.fire({
        title: "App Name",
        text: message,
        icon: "success",
        backdrop: false
      });
}