'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP
const euroTousd = 1.2;
// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2024-03-25T09:15:04.904Z',
    '2024-03-26T10:17:24.185Z',
    '2024-03-20T14:11:59.604Z',
    '2024-03-10T17:01:17.194Z',
    '2024-03-24T23:36:17.929Z',
    '2024-03-26T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const formatmovementsDate = function (date, locale) {
  const dayspassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
  const dayspass = dayspassed(new Date(), date);
  console.log(dayspass);
  if (dayspass === 0) return 'Today';
  if (dayspass === 1) return 'Yesterday';
  if (dayspass > 7) return 'Last week';
  if (dayspass <= 0) return `${dayspass}  days ago`;
  else {
    // const day = ` ${date.getDate()}`.padStart(2, 0);
    // const month = ` ${date.getMonth() + 1}`.padStart(2, 0);
    // const hours = ` ${date.getHours()}`.padStart(2, 0);
    // const minutes = ` ${date.getMinutes()}`.padStart(2, 0);
    // const year = date.getFullYear();

    return new Intl.DateTimeFormat(locale).format(date);
  }
};
const currencyFormatter = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

const displaymovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;
  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const date = new Date(acc.movementsDates[i]);
    const displaydates = formatmovementsDate(date);

    const formatmovs = currencyFormatter(mov, acc.locale, acc.currency);

    const html = `
    <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    }${type} deposit</div>
           <div class="movements__date">${displaydates}</div>
          <div class="movements__value">${formatmovs}</div>
     </div>
    
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const createusernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(Name => Name[0])
      .join('');
  });
};
createusernames(accounts);
console.log(accounts);
//===================================log out timer==============
const startLogoutTimer = function () {
  const tick=function () {
    //each call print neew remaining time
    const min = Math.trunc(time / 60);
    const sec = `${time % 60}`.padStart(2, 0);
    labelTimer.textContent = `${min}:${sec}`;

    //whe o secs left log out user

    if (time === 0) {
      clearInterval(logOuttimer);
      containerApp.style.opacity = 0;
      labelWelcome.textContent = `Log in to get started`;
    }
    //decrese each second
    time--;
  }
  //logut timer
  let time = 120;
  //whe o secs left log out user
  tick();
  const logOuttimer = setInterval(tick, 1000);
  return logOuttimer
}
const calcdisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce(function (accumulator, mov) {
    return accumulator + mov;
  }, 0);
  // const options = {
  //   style: 'currency',
  //   currency: acc.currency
  // }
  const formatmovs = currencyFormatter(acc.balance, acc.locale, acc.currency);

  labelBalance.textContent = formatmovs;
};
// calcdisplayBalance(account1.movements);

//--------calculating totals--------
const displaySummary = function (acc) {
  //money in--totals
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((accumulator, mov) => accumulator + mov);
  labelSumIn.textContent = currencyFormatter(incomes, acc.locale, acc.currency);
  //---money out--totals
  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((accumulator, mov) => accumulator + mov, 0);
  labelSumOut.textContent = currencyFormatter(
    `${Math.abs(out)}`,
    acc.locale,
    acc.currency
  );

  //--interest totals
  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(mov => (mov * acc.interestRate) / 100)
    .filter((int, _, arr) => int > 1)
    .reduce((accumulator, interest) => accumulator + interest);
  labelSumInterest.textContent = currencyFormatter(
    `${Math.abs(interest)}`,
    acc.locale,
    acc.currency
  );
};

const updateUI = function (acc) {
  //display movements
  console.log(acc);
  displaymovements(acc);

  //display balance
  calcdisplayBalance(acc);
  //display summary
  displaySummary(acc);
};


///=======================log in =============================
let currentAccount ,logOuttimer;
btnLogin.addEventListener('click', function (e) {
  //prevent form from sbmitting
  e.preventDefault();
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === +inputLoginPin.value) {
    //display welcome messages
    labelWelcome.textContent = `welcome back ${
      currentAccount.owner.split(' ')[0]
    }`;

    containerApp.style.opacity = 100;
    //create current dates
    const now = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric',
      // weekday: 'short',
      year: 'numeric',
    };
    // const locale=navigator.language

    // const day = ` ${now.getDate()}`.padStart(2, 0);
    // const month = ` ${now.getMonth() + 1}`.padStart(2, 0);
    // const year = now.getFullYear();
    // const minutes = now.getMinutes();
    // const hours = now.getHours();

    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);
    //clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputClosePin.blur();


    //start log out timer
    if (logOuttimer) clearInterval(logOuttimer);
    logOuttimer=startLogoutTimer();


    updateUI(currentAccount);

    // //display movements
    // displaymovements(currentAccount);

    // //display balance
    // calcdisplayBalance(currentAccount);
    // //display summary
    // displaySummary(currentAccount);
  }
});

//implementing dates

//implementing money transfers
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const reciverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  console.log(reciverAcc);

  //check conditions bf transfer
  if (
    amount > 0 &&
    currentAccount.balance >= amount &&
    reciverAcc &&
    reciverAcc?.username !== currentAccount.username
  ) {
    //transfers
    console.log('transer valid');
    currentAccount.movements.push(-amount);
    reciverAcc.movements.push(amount);

    //update dates for transfers
    currentAccount.movementsDates.push(new Date().toISOString());
    reciverAcc.movementsDates.push(new Date().toISOString());

    //update UI
    updateUI(currentAccount);
    //reset timer
    clearInterval(logOuttimer)
    logOuttimer = startLogoutTimer();
  }

  inputTransferTo.value = inputTransferAmount.value = '';
});

//loan request
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    setTimeout(function () {
      //add movemen from loan
      currentAccount.movements.push(amount);
      //update dates for loan
      currentAccount.movementsDates.push(new Date().toISOString());

      //updateUI
      updateUI(currentAccount);
      clearInterval(logOuttimer);
      logOuttimer = startLogoutTimer();
    }, 3000);

    inputLoanAmount.value = '';
  }
});

//deleting acconts
btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    //find account and delete
    console.log(true);
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);

    accounts.splice(index, 1);
    inputLoginPin.value = inputLoginUsername.value = '';
    containerApp.style.opacity = 0;
  }
});
let sorted = false;
btnSort.addEventListener('click', function () {
  displaymovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});
labelBalance.addEventListener('click', function () {
  [...document.querySelectorAll('.movements_row')].forEach((row, i) => {
    if (i % 2 === 0) {
      console.log('green');
      row.style.backgroundColor = 'orangered';
    }
  });
});

