'use strict';
const account1 = {
  owner: `john Constantin`,
  movements: [400, 250, -300, 1500, 280, -500, 1000, -80],
  interest: 1.4,
  pin: 1234,
  username : '',
};
const account2 = {
  owner: `Jackson Yaawang`,
  movements: [200, 400, 700, 1000, 250, 900, 300, 2000],
  interest: 1.2,
  pin: 5678,
  username : '',
};
const account3 = {
  owner: `Prayuth Cookgorma`,
  movements: [700, -120, -230, 1500, -400, -230, -600, 3000],
  interest: 1.5,
  pin: 8888,
  username : '',
};
const account = [account1, account2, account3];

const lblWelcome = document.querySelector('.welcome');
const lblDate = document.querySelector('.date');
const lblBalance = document.querySelector('.balance_value');
const lblSumIn = document.querySelector('.summary_value--in');
const lblSumOut = document.querySelector('.summary_value--out');
const lblSumInterest = document.querySelector('.summary_value--Interest');

const containerApp = document.querySelector(`.app`);
const containerMoverment = document.querySelector(`.movements`);

const btnLogin = document.querySelector('.login_btn');
const btnTransfer = document.querySelector('.form_btn--transfer');
const btnLoan = document.querySelector('.form_btn--loan');
const btnClose = document.querySelector('.form_btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUser = document.querySelector('.login_input--user');
const inputLoginPsw = document.querySelector('.loin_input--psw');
const inputTranferto = document.querySelector('.form_input--to');
const inputTransferAmount = document.querySelector('.form_input--amount');
const inputLoanAmount = document.querySelector('.form--loan--amount');
const inputCloseUsername = document.querySelector('.form_input--user');
const inputClosePsw = document.querySelector('.form_input--psw');

const displayMovements = (movements, sort = false) => {
  containerMoverment.innerHTML = '';

  const mov = sort ? movements.slice().sort((a,b) => a - b) : movements;

  movements.forEach((mov, i) => {
    //console.log(i,mov);
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `<div class="movements__row">
      <div class="movements__types movements__types--${type}">${
      i + 1
    }${type} </div>
      <div class="movements__value"> ${mov}฿ </div>
     </div>`;

    containerMoverment.insertAdjacentHTML('afterbegin', html);
  });
};

displayMovements(account1.movements);

const showBalance = (acc) => {
  acc.balance = acc.movements.reduce((pre, mov) => pre + mov, 0);
  lblBalance.textContent = `${acc.balance}฿`;
};
//showBalance(account1.movements);

const showSummary = (movements) => {
  const income = movements
    .filter((mov) => mov > 0)
    .reduce((pre, mov) => pre + mov, 0);
  lblSumIn.textContent = `${income}฿`;

  const outgoing = movements
    .filter((mov) => mov < 0)
    .reduce((pre, mov) => pre + mov, 0);
  lblSumOut.textContent = `${Math.abs(outgoing)}฿`;

  const interest = movements
    .filter((mov) => mov > 0)
    .map((deposit) => deposit * 0.2)
    .reduce((pre, mov) => pre + mov, 0);

  lblSumInterest.textContent = `${interest}฿`;
};

//showSummary(account1.movements);

const creatUsername = (accs) => {
  accs.forEach((accs) => {
    accs.username = accs.owner
      .toLowerCase()
      .split(' ')
      .map((name) => name[0])
      .join('');
  });
};
creatUsername(account);

const updateUI = (acc) => {
  displayMovements(acc.movements)
  showBalance(acc)
  showSummary(acc.movements)
};

let currentAcc;

btnLogin.addEventListener("click", (e) => {
  e.preventDefault();
  currentAcc = account.find((acc) => acc.username === inputLoginUser
  .value);

  if (currentAcc?.pin === Number(inputLoginPsw.value)){
      lblWelcome.textContent = `Welcome back, ${currentAcc.owner.split
          (" ")[0]} ${
              currentAcc.owner.split(" ")[1][0] }.🎊`;
      containerApp.style.opacity = 100;
       inputLoginUser.value = inputLoginPsw.value = "";
       updateUI(currentAcc);
  }
});

btnTransfer.addEventListener('click', (e) => {
  e.preventDefault();

  const amount = Number(inputTransferAmount.value);
  const recieverAcc = account.find(
    (acc) => acc.username === inputTranferto.value
  );
  // console.log(amount, recieverAcc, currentAcc.balance);

  if (
    amount > 0 &&
    recieverAcc &&
    currentAcc.balance >= amount &&
    recieverAcc?.username !== currentAcc.username
  ) {
    currentAcc.movements.push(-amount);
    recieverAcc.movements.push(amount);

    inputTranferto.value = inputTransferAmount.value = '';

    updateUI(currentAcc);
  }
});

btnClose.addEventListener('click', (e) => {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAcc.username && 
    Number(inputClosePsw.value) === currentAcc.pin
  ) {
    const index = account.findIndex(
      (acc) => acc.username === currentAcc.username
    );
    account.slice(index, 1);

    containerApp.style.opacity = 0;
    lblWelcome.textContent = " Log in is required";

  }
  inputCloseUsername.value = inputClosePsw.value = "";
});

btnLoan.addEventListener('click', (e) => {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);
  if (amount > 0 && currentAcc.movements.some((mov) => mov >= amount*0.1))
  {
    currentAcc.movements.push(amount);

    updateUI(currentAcc);
  }
  inputLoanAmount.value = '';
});

let sorted = false;
btnSort.addEventListener('click', (e) => {
  e.preventDefault();
  displayMovements(currentAcc.movements, !sorted)
});




//console.log(account.find((acc) => acc == account1));
//console.log(account.findIndex((acc) => acc == account1));
//console.log(account1.movements.find((mov) => mov < 0));
//console.log(account.find((acc) => acc.owner === "jackson Yaawang"));