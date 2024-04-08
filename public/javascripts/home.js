console.clear();

const themeButtons = document.querySelectorAll('.c-theme');

themeButtons.forEach(theme => {
  theme.addEventListener('click', () => {
    document.documentElement.classList.toggle('theme--dark');
  });
});

const flights = [
{
  departTime: '11:45 AM',
  arriveTime: '4:50 PM',
  points: '36,750',
  flightTime: '8h 5m',
  dollars: '$527' },
{
  departTime: '12:00 PM',
  arriveTime: '6:45 PM',
  points: '32,490',
  flightTime: '9h 45min',
  dollars: '$532' },
{
  departTime: '12:00 PM',
  arriveTime: '7:50 PM',
  points: '30,620',
  flightTime: '10h 50m',
  dollars: '$450' },
{
  departTime: '12:10 PM',
  arriveTime: '7:50 PM',
  points: '25,033',
  flightTime: '10h 40m',
  dollars: '$373' }];



const renderPoints = () => {
  flights.forEach(flight => {
    const newFlight = document.createElement('li');
    newFlight.classList = 'c-list__item';
    newFlight.setAttribute('data-price', `${flight.dollars}`);
    newFlight.setAttribute('data-departure', `${flight.departTime}`);
    newFlight.setAttribute('data-arrival', `${flight.arriveTime}`);
    newFlight.setAttribute('data-points', `${flight.points}`);
    newFlight.setAttribute('data-time', `${flight.flightTime}`);
    newFlight.setAttribute('data-payment', 'points');
    newFlight.innerHTML = `
			<button class="c-list__link c-media">
				<div class="c-media__content">
					<div class="c-schedule">
						<div class="c-schedule__item"><small class="u-text--b-default">Departs</small><strong>${flight.departTime}</strong></div>
						<div class="c-schedule__item c-plane">
							<svg class="c-plane__icon" xmlns="http://www.w3.org/2000/svg" viewbox="0 0 24 24" fill="currentColor">
								<path d="M10.18 9"></path>
								<path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"></path>
							</svg>
						</div>
						<div class="c-schedule__item"><small class="u-text--b-default">Arrives</small><strong>${flight.arriveTime}</strong></div>
					</div>
				<div class="c-media__img c-avatar c-schedule__button" data-avatar="${flight.points}"></div>
			</div>
			</button>
		`;

    newFlight.addEventListener('click', () => {
      if (!newFlight.classList.contains('c-schedule--active')) {
        if (newFlight.parentNode.querySelector('.c-schedule--active')) {
          newFlight.parentNode.querySelector('.c-schedule--active').
          classList.remove('c-schedule--active');
        }
        newFlight.classList.add('c-schedule--active');
        renderActiveData();
        document.getElementById('flightActions').style.display = 'block';
      } else {
        if (newFlight.classList.contains('c-schedule--active')) {
          newFlight.classList.remove('c-schedule--active');
          document.getElementById('flightActions').style.display = 'none';
        }
      }
    });

    document.getElementById('flightList').appendChild(newFlight);
  });
};

const renderDollars = () => {
  flights.forEach(flight => {
    const newFlight = document.createElement('li');
    newFlight.classList = 'c-list__item';
    newFlight.setAttribute('data-price', `${flight.dollars}`);
    newFlight.setAttribute('data-departure', `${flight.departTime}`);
    newFlight.setAttribute('data-arrival', `${flight.arriveTime}`);
    newFlight.setAttribute('data-points', `${flight.points}`);
    newFlight.setAttribute('data-time', `${flight.flightTime}`);
    newFlight.setAttribute('data-payment', 'dollars');
    newFlight.innerHTML = `
			<button class="c-list__link c-media">
				<div class="c-media__content">
					<div class="c-schedule">
						<div class="c-schedule__item"><small class="u-text--b-default">Departs</small><strong>${flight.departTime}</strong></div>
						<div class="c-schedule__item c-plane">
							<svg class="c-plane__icon" xmlns="http://www.w3.org/2000/svg" viewbox="0 0 24 24" fill="currentColor">
								<path d="M10.18 9"></path>
								<path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"></path>
							</svg>
						</div>
						<div class="c-schedule__item"><small class="u-text--b-default">Arrives</small><strong>${flight.arriveTime}</strong></div>
					</div>
				<div class="c-media__img c-avatar c-schedule__button" data-avatar="${flight.dollars}"></div>
			</div>
			</button>
		`;

    newFlight.addEventListener('click', () => {
      if (!newFlight.classList.contains('c-schedule--active')) {
        if (newFlight.parentNode.querySelector('.c-schedule--active')) {
          newFlight.parentNode.querySelector('.c-schedule--active').
          classList.remove('c-schedule--active');
        }
        newFlight.classList.add('c-schedule--active');
        renderActiveData();
        document.getElementById('flightActions').style.display = 'block';
      } else {
        if (newFlight.classList.contains('c-schedule--active')) {
          newFlight.classList.remove('c-schedule--active');
          document.getElementById('flightActions').style.display = 'none';
        }
      }
    });

    document.getElementById('flightList').appendChild(newFlight);
  });
};

renderDollars();

const toggleBtns = document.querySelectorAll('.c-toggle__btn');

toggleBtns.forEach(toggle => {
  toggle.addEventListener('click', () => {
    const paymentType = toggle.dataset.payment;
    document.getElementById('flightActions').style.display = 'none';
    if (!toggle.classList.contains('c-toggle__btn--active')) {
      toggle.parentNode.querySelector('.c-toggle__btn--active').
      classList.remove('c-toggle__btn--active');
      toggle.classList.add('c-toggle__btn--active');
      if (paymentType == 'dollars') {
        document.getElementById('flightList').innerHTML = '';
        renderDollars();
      } else {
        document.getElementById('flightList').innerHTML = '';
        renderPoints();
      }
    } else {

    }
  });
});

const selectContainer = document.getElementById('selectFlights');
const reviewContainer = document.getElementById('reviewFlights');

const confirmBtn = document.getElementById('confirm');
const backBtn = document.getElementById('back');

const renderActiveData = () => {
  const activeItem = document.querySelector('.c-schedule--active');
  const departureTime = activeItem.dataset.departure;
  const arrivalTime = activeItem.dataset.arrival;
  const pointsVal = activeItem.dataset.points;
  const dollarVal = activeItem.dataset.price;
  const flightTime = activeItem.dataset.time;
  const payment = activeItem.dataset.payment;

  let activeValues = [
  departureTime,
  arrivalTime,
  pointsVal,
  dollarVal,
  flightTime];


  console.log(payment);

  if (payment == 'points') {
    document.getElementById('activeCost').innerHTML = ' <small class="u-text--b-default">(points)</small> -' + activeValues[2];
    document.getElementById('total').innerHTML = activeValues[2];
  } else {
    document.getElementById('activeCost').innerHTML = '-' + activeValues[3] + '.00';
    document.getElementById('total').innerHTML = activeValues[3] + '.00';
  }

  document.getElementById('departureTime').innerHTML = activeValues[0];
  document.getElementById('arrivalTime').innerHTML = activeValues[1];
};

confirmBtn.addEventListener('click', () => {
  selectContainer.style.display = 'none';
  reviewContainer.style.display = 'block';
});

backBtn.addEventListener('click', () => {
  selectContainer.style.display = 'block';
  reviewContainer.style.display = 'none';
});