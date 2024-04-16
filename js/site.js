// get the Values from the user
function getValues() {
  // get the input for loanNumber
  let balance = document.getElementById('loanNumber').value;
  // get the input for termNumber
  let term = document.getElementById('termNumber').value;
  // get the input for interestNumber
  let rate = document.getElementById('interestNumber').value;
  // convert the input strings into numbers


  balance = Number(balance);
  term = Number(term);
  rate = Number(rate);

  if (isNaN(balance) || isNaN(term) || isNaN(rate) || balance < 0 || term < 1 || rate < 1 || rate > 100) {
    Swal.fire({
      icon: "error",
      title: "Oops!",
      text: 'Please enter a valid number.',
      backdrop: false
    });
  } else {
    // calculate total monthly payment
  const totalMonthlyPayment = ((balance)*(rate/1200)/(1-(1 + rate/1200)**(- term))).toFixed(2);
  // calculate remaining balance
  let values = [];
  let previousRemainingBalanceArray = [];
  let termMonths = [];
  let interest = [];
  let principalArray = [];
  let previousRemainingBalance = '';
  let principal = '';
  
  for(let months = 1; months <= term; months++) {
    termMonths.push(months);
  }

  for (let index = 0; index < termMonths.length; index++) {
    let month = termMonths[index];
    if (month == 1){
      let remainingBalance = balance;
      previousRemainingBalance = remainingBalance;
      values.push(previousRemainingBalance);
      let interestPayment = (previousRemainingBalance*rate/1200).toFixed(2);
      values.push(interestPayment);
      let principalPayment = (totalMonthlyPayment - interestPayment).toFixed(2);
      principal = principalPayment;
      values.push(principal);
    } else {
      remainingBalance = (previousRemainingBalance-principal).toFixed(2);
      previousRemainingBalance = remainingBalance;
      values.push(previousRemainingBalance);
      let interestPayment = (previousRemainingBalance*rate/1200).toFixed(2);
      values.push(interestPayment);
      let principalPayment = (totalMonthlyPayment - interestPayment).toFixed(2);
      principal = principalPayment;
      values.push(principal);
    }
  }
  displayValues(termMonth, values);
  }
}


// function displayValues(values) {

//   let tableHtml = '<tr>';

//   let j = 0;

//   for (let i = 0; i < values.length; i++) {
//     let value = values[i];

//     tableHtml += `<td>${value}</td>`


//   }
//   if (j % 6 == 0) {
//     tableHtml += '</tr><tr>'
//   }

// let tbody = document.getElementById('tableContent');
// tbody.innerHTML = tableHtml;

// }


// let tableHtml = '<tr>'
//let j = 1;

// if (j % 6 == 0) {
//   tableHtml += '</tr><tr>'
// }

// j++