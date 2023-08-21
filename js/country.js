document.addEventListener('DOMContentLoaded', (evt) => {
	const elCountryInfoWrapper = document.querySelector('.js-country-info-wrapper');
	const elCountryInfoTitle = document.querySelector('.js-country-info-title');

	if (!localStorage.getItem('countryInfo')) {
		console.log("No info found !");
		return;
	}

	let data = JSON.parse(localStorage.getItem('countryInfo'));
	renderCountryInfo(data[0], elCountryInfoWrapper, elCountryInfoTitle);

	const elHeaderBtn = document.querySelector('.site-header__btn');
	const elBackLink = document.querySelector('.country-info__back-link');
	const elLogoImg = document.querySelector('.logo__img');

	if (localStorage.getItem('mode') && localStorage.getItem('mode') === 'dark') {
		darkmodeEnabled(elHeaderBtn, elBackLink, elLogoImg);
	}



	elHeaderBtn.addEventListener('click', () => {
		darkmodeEnabled(elHeaderBtn, elBackLink, elLogoImg);
		if (localStorage.getItem('mode')) {
			if (localStorage.getItem('mode') === 'light') {
				localStorage.setItem('mode', 'dark');
			} else {
				localStorage.setItem('mode', 'light');
			}
		} else {
			localStorage.setItem('mode', 'dark');
		}
	});

	


});











function renderCountryInfo(data, list, title) {
	title.innerHTML = `"${data.name.common}" info`;
	if (data.languages) {
		if (typeof data.languages === 'object') {
			let values = Object.values(data.languages);
			data.languages = values;
		}
	}

	if (data.currencies) {
		if (typeof data.currencies === 'object') {
			let values = Object.values(data.currencies)[0].name;
			data.currencies = values;
		}
	}
	list.innerHTML = `
    <a class="country-info__back-link" href="../index.html">Back</a>
    <div class="country-info__details-wrapper">
    <img class="country-info__img" src="${data.flags.svg}" width="560" height="419" alt="${data.name.common} flag">
    <div class="country-info__details">
      <h2 class="country-info__name" title="Belgium">${data.name.official}</h2>
      <div class="country-info__lists-wrapper">
        <ul class="country-info__list">
          <li class="country-info__item">
            <strong class="country-info__title" title="Native Name"> Native Name: </strong>
            <span class="country-info__desc" title="${data.name.common}"> ${data.name.common} </span>
          </li>
          <li class="country-info__item">
            <strong class="country-info__title" title="Population"> Population: </strong>
            <span class="country-info__desc" title="${data.population.toLocaleString()}"> ${data.population.toLocaleString()} </span>
          </li>
          <li class="country-info__item">
            <strong class="country-info__title" title="Region"> Region: </strong>
            <span class="country-info__desc" title="${data.region}"> ${data.region} </span>
          </li>
          <li class="country-info__item">
            <strong class="country-info__title" title="Sub Region"> Sub Region: </strong>
            <span class="country-info__desc" title="${data.subregion}"> ${data.subregion} </span>
          </li>
          <li class="country-info__item">
            <strong class="country-info__title" title="Capital"> Capital: </strong>
            <span class="country-info__desc" title="${data.capital}"> ${data.capital} </span>
          </li>
        </ul>
        <ul class="country-info__list">
          <li class="country-info__item">
            <strong class="country-info__title" title="Top Level Domain"> Top Level Domain: </strong>
            <span class="country-info__desc" title="${data.tld[0]}"> ${data.tld[0]} </span>
          </li>
          <li class="country-info__item">
            <strong class="country-info__title" title="Currencies"> Currencies: </strong>
            <span class="country-info__desc" title="${data.currencies}"> 
               ${data.currencies} 
            </span>
          </li>
          <li class="country-info__item">
            <strong class="country-info__title" title="Languages"> Languages: </strong>
            <span class="country-info__desc" title="${data.languages.join(', ')}"> ${data.languages.join(', ')} </span>
          </li>
        </ul>
      </div>
      <div class="country-info__additional-desc-wrapper">
        <p class="country-info__additional-desc" title="Border Countries"> Border Countries: </p>
        <div class="country-info__additional-desc-stage-wrapper">
             
               ${data.borders ? data.borders.map(border => {
                     return `<span class="country-info__additional-desc-stage" title="${border}">${border}</span>`;
               }).join(" ") : ` <span class = "country-info__additional-desc-stage" title="Not Given"> Not Info </span>`}

	`;
 
 
 }
 

 function darkmodeEnabled(elHeaderBtn, elBackLink, elLogoImg) {
    document.body.classList.toggle('dark-mode');
    elHeaderBtn.classList.toggle('site-header__btn-dark-mode');
    console.log(elBackLink);
    elBackLink.classList.toggle('country-info__back-link--dark-mode');

    if(!elLogoImg.src.endsWith('/images/logo.svg')) {
      elLogoImg.src = "../images/logo.svg";
   }else {
      elLogoImg.src = "../images/logodarkmode.svg";
   }

 }