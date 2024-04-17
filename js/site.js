// get the Values from the user
function getValues() {
  // get the input for loanNumber
  let balance = document.getElementById("loanNumber").value;
  // get the input for termNumber
  let term = document.getElementById("termNumber").value;
  // get the input for interestNumber
  let rate = document.getElementById("interestNumber").value;

  // convert the input strings into numbers
  balance = Number(balance);
  term = Number(term);
  rate = Number(rate);

  // check to make sure the user input a number
  if (
    isNaN(balance) ||
    isNaN(term) ||
    isNaN(rate) ||
    balance < 0 ||
    term < 1 ||
    rate < 1 ||
    rate > 100
  ) {
    Swal.fire({
      icon: "error",
      title: "Oops!",
      text: "Please enter a valid number.",
      backdrop: false,
    });
  } else {
    //send the values to calculate our information
    let calculatedValues = calculateValues(balance, term, rate);

    // pass the balance and calculatedValues to be used to display their values
    displayValues(calculatedValues, balance);
  }
}

function calculateValues(balance, term, rate) {
  // calculate total monthly payment
  const totalMonthlyPayment =
    (balance * (rate / 1200)) / (1 - (1 + rate / 1200) ** -term);

  let termMonths = [];
  let previousRemainingBalanceArray = [];
  let interest = [];
  let principalArray = [];
  let totalInterestArr = [];
  // set previousRemainingBalance to initially be the value of balance
  let previousRemainingBalance = balance;
  let totalInterest = 0;

  for (let months = 1; months <= term; months++) {
    termMonths.push(months);

    // calculate the interest payment and add it to the interest array
    let interestPayment = (previousRemainingBalance * rate) / 1200;
    interest.push(interestPayment);
    // calculate the total interest paid for each month and add it to totalInterestArr
    totalInterest += interestPayment;
    totalInterestArr.push(totalInterest);

    // calculate the principal payments and add each iteration to the principalArray
    let principalPayment = totalMonthlyPayment - interestPayment;
    principalArray.push(principalPayment);

    // calculate remaining balance and add each iteration to the previousRemainingBalanceArray
    previousRemainingBalance -= principalPayment;
    previousRemainingBalanceArray.push(previousRemainingBalance);
  }

  // create an object to hold the results
  let results = {
    monthsArr: termMonths,
    paymentNum: totalMonthlyPayment,
    principalArr: principalArray,
    interestArr: interest,
    totalInterestArr: totalInterestArr,
    totalInterestNum: totalInterest,
    balanceArr: previousRemainingBalanceArray,
  };

  return results;
}

// display the results here in a table
function displayValues(myObject, loanAmount) {
  let totalCost = (loanAmount + myObject.totalInterestNum).toFixed(2);
  let totalPrincipal = myObject.totalInterestNum.toFixed(2);
  let loan = loanAmount.toFixed(2);

  // configure a formatter to USD
  let usDollar = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  // getting the element with an id of monthlyPayment and changing the text to be the value of paymentNum
  document.getElementById("monthlyPayment").textContent = usDollar.format(
    myObject.paymentNum
  );

  // getting the element with an id of summary and changing the content of it
  let summary = document.getElementById("summary");
  let summaryContent = summary.content;

  // targetting the classes of the elements I would like to change
  let principalElement = summary.querySelector(".totalPrincipal");
  principalElement.textContent = usDollar.format(loan);
  let interestElement = summary.querySelector(".totalInterest");
  interestElement.textContent = usDollar.format(
    myObject.totalInterestNum.toFixed(2)
  );
  let costElement = summary.querySelector(".totalCost");
  costElement.textContent = usDollar.format(totalCost);

  // setting the html table content to be empty
  tableHtml = "";

  // using a for loop to search through myObject and get the monthsArr length and
  // increment through it while also declaring each variable as one of the corrisponding arrays or numbers
  // in the object then creating a table using them.
  for (let i = 0; i < myObject.monthsArr.length; i++) {
    let month = myObject.monthsArr[i];
    let principal = myObject.principalArr[i].toFixed(2);
    let interest = myObject.interestArr[i].toFixed(2);
    let totalInterests = myObject.totalInterestArr[i].toFixed(2);
    let balance = Math.abs(myObject.balanceArr[i]).toFixed(2);
    let totalInterest = myObject.totalInterestNum.toFixed(2);
    let payment = myObject.paymentNum.toFixed(2);

    tableHtml += `<tr>
    <td>${month}</td><td>${payment}</td><td>${principal}</td><td>${interest}</td><td>${totalInterests}</td><td>${balance}</td></tr>`;
  }

  // displaying the created table on the html page
  let tbody = document.getElementById("tableContent");
  tbody.innerHTML = tableHtml;
}
