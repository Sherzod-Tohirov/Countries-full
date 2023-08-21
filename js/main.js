document.addEventListener('DOMContentLoaded', function() {

let elHeaderBtn = document.querySelector('.site-header__btn');
let elSiteHeader = document.querySelector('.site-header');
let siteBody = document.querySelector('.site-body');
let elCountries = document.querySelector('.countries');
let elItems = document.querySelectorAll('.country');
let elSearchInputWrapper = document.querySelector('.countries__search-input-wrapper');
let elSearchInput = document.querySelector('.countries__search-input');
let elSearchFilter = document.querySelector('.countries__filter');
let elLogoImg = document.querySelector('.logo__img');
let elCountryName = document.querySelectorAll('.country__name');
let elCountryDesc = document.querySelectorAll('.country__desc');
let elCountryText = document.querySelectorAll('.country__text'); 
let country_id;
const elList= document.querySelector('.js-list');

if(localStorage.getItem('mode') && localStorage.getItem('mode') === 'dark') {
	darkmodeEnabled(elHeaderBtn, elSiteHeader, siteBody, elSearchInput, elSearchFilter, elSearchInputWrapper, elSearchInput, elItems, elCountryName, elCountryDesc, elCountryText, elLogoImg);
}

elHeaderBtn.addEventListener('click', () => {
   darkmodeEnabled(elHeaderBtn, elSiteHeader, siteBody, elSearchInput, elSearchFilter, elSearchInputWrapper, elSearchInput, elItems, elCountryName, elCountryDesc, elCountryText, elLogoImg);
   if(localStorage.getItem('mode')) {
      if(localStorage.getItem('mode') === 'light') {
		localStorage.setItem('mode', 'dark');
	  } else {
		localStorage.setItem('mode', 'light');
	  }
   }else {
	localStorage.setItem('mode', 'dark');
   }
}); 
 


	fetch('https://restcountries.com/v3.1/all')
	.then(res => res.json())
	.then(data => {
	    console.log(data[0]);
        renderCountries(data, elList);
		addCountryInfo(data);

		elSearchFilter.addEventListener('change', (evt) => {
			if(elSearchFilter.value === 'all') {
				renderCountries(data, elList);
				return;
			}

			let new_data = data.filter(item => {
				console.log(item.region);
				 return item.region === elSearchFilter.value;
			});

		   renderCountries(new_data, elList); 
		   addCountryInfo(new_data);
		});

		elSearchInput.addEventListener('keyup', (evt) => {
           let new_data = data.filter(item => {
              return item.name.common.toLowerCase().startsWith(elSearchInput.value.toLowerCase());
		   });

		   renderCountries(new_data, elList);
		   addCountryInfo(new_data);

		});

		
	})
	.catch(error => console.log(`Error occurred ! \n ${error}`));

	




});








function add_dark_mode(element, css_class) {
	element.forEach(item => {
   	item.classList.toggle(`${css_class}`);
   });
}

function add_toggle(element, css_class) {
	element.classList.toggle(`${css_class}`);
}

function darkmodeEnabled(elHeaderBtn, elSiteHeader, siteBody, elSearchInput, elSearchFilter, elSearchInputWrapper, elSearchInput, elItems, elCountryName, elCountryDesc, elCountryText, elLogoImg) {
	document.body.classList.toggle('dark-mode');
	add_toggle(elHeaderBtn, 'dark-mode-text-color');
	add_toggle(elHeaderBtn, 'site-header__btn-dark-mode');
	add_toggle(elSiteHeader, 'dark-mode-header');
	add_toggle(siteBody, 'dark-mode-main');
	add_toggle(elSearchInput, 'dark-mode-header');
	add_toggle(elSearchFilter, 'dark-mode-header');
	add_toggle(elSearchInputWrapper, 'countries__search-input-wrapper--dark-mode')
	add_toggle(elSearchInput, 'countries__search-input--dark-mode');
	add_dark_mode(elItems, 'dark-mode-items');
	add_dark_mode(elCountryName, 'dark-mode-text-color');
	add_dark_mode(elCountryDesc, 'dark-mode-text-color');
	add_dark_mode(elCountryText, 'dark-mode-text-color');
	if(elLogoImg.src != "file:///D:/Farobiy/Forobiy/Original%20files/Countries/images/logo.svg") {
		 elLogoImg.src = "./images/logo.svg";
	}else {
		 elLogoImg.src = "./images/logodarkmode.svg";
	}
	if(elSearchFilter.style.backgroundImage != 'url("./images/arrdndarkmode.svg")') {
	   elSearchFilter.style.backgroundImage = 'url("./images/arrdndarkmode.svg")';
	}else {
		elSearchFilter.style.backgroundImage = 'url("./images/arrdn.svg")';
	}
}

function renderCountries(data, elList) {
	elList.innerHTML = '';
	data.forEach(item => {
        elList.innerHTML +=  
			`      
					<li class="countries__item country">
					<a class="countries__link js-country-link" href="./views/country.html" data-id="${item.flags.svg}">
					<img class="countries__img" src="${item.flags.svg}" width="267" height="160" alt="${item.name.common} flag">
					<div class="country__info-wrapper">
						<h3 class="country__name">
							${item.name.official}
						</h3>
						<div class="country__details">
							<p class="country__desc">
								<strong class="country__title">Population: </strong> 
								<span class="country__text">${item.population.toLocaleString()}</span>
							</p>
							<p class="country__desc">
								<strong class="country__title">Region: </strong> 
								<span class="country__text">${item.region}</span>
							</p>
							<p class="country__desc">
								<strong class="country__title">Capital: </strong> 
								<span class="country__text">${item.capital}</span>
							</p>
						</div>
					</div>
					</a>
					</li>
			`
	});
}

function addCountryInfo(data) {
	const elCountryLinks = document.querySelectorAll('.js-country-link');
		elCountryLinks.forEach(link => {
			link.addEventListener('click', (evt) => {
					country_id = evt.target.parentElement.dataset.id;
					if(country_id) {
						let new_data = data.filter(item => {
							return item.flags.svg === country_id;
						});

						localStorage.setItem('countryInfo', JSON.stringify(new_data));

						
					}
			});
		});
}
