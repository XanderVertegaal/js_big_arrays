const mainSect = document.querySelector("main")
const btnCountries = document.querySelector("#btnCountries")
const btnCapricorn = document.querySelector("#btnCapricorn")
const btnCreditcards = document.querySelector("#btnCreditcards")
const btnMostPeople = document.querySelector("#btnMostPeople")
const btnAverageAge = document.querySelector("#btnAverageAge")
const btnMatchmaking = document.querySelector("#btnMatchmaking")

const clearMain = () => {
    mainSect.querySelectorAll('*').forEach(element => element.remove())
}

const checkZodiac = function(birthday) {
    const Month = parseInt(birthday.slice(0, 2));
    const Day = parseInt(birthday.slice(3, 5));
    // console.log('Birthday: ', birthday)
    // console.log('Month: ', capriMonth)
    // console.log('Day: ', capriDay)
    switch (Month) {
        case 01:
            return (Day <= 19 ? 'Capricornus' : 'Aquarius');
        case 02:
            return (Day <= 19 ? 'Aquarius' : 'Pisces')
        case 03:
            return (Day <= 20 ? 'Pisces' : 'Aries')
        case 04:
            return (Day <= 20 ? 'Aries' : 'Taurus')
        case 05: 
            return (Day <= 21 ? 'Taurus' : 'Gemini')
        case 06:
            return (Day <= 21 ? 'Gemini' : 'Cancer')
        case 07:
            return (Day <= 22 ? 'Cancer' : 'Leo')
        case 08:
            return (Day <= 23 ? 'Leo' : 'Virgo')
        case 09:
            return (Day <= 22 ? 'Virgo' : 'Libra')
        case 10:
            return (Day <= 23 ? 'Libra' : 'Scorpio')
        case 11:
            return (Day <= 22 ? 'Scorpio' : 'Sagittarius')
        case 12:
            return (Day <= 22 ? 'Sagittarius' : 'Capricornus');
        default:
            return 'Undefined Zodiac!'
    }
}

const nearFuture = (expdate) => {
    const currYear = new Date().getFullYear()
    const currMonth = new Date().getMonth() + 1
    const expYear = parseInt('20' + expdate.split('/')[1]);
    const expMonth = parseInt(expdate.split('/')[0]);
    switch (expYear - currYear) {
        case 1:
            return true;
        case 0: 
            if (expMonth - currMonth > 0) {
                return true;
            }
        default:
            return false;
    }
}

// Assignment 1: List of countries
const getCountries = () => {
    clearMain();
    const countryList = []
    const countryTitle = document.createElement("h2")
    countryTitle.innerHTML = "List of countries"
    const countryOL = document.createElement("ol")
    countryOL.id = "list-of-countries"
    for (entry of randomPersonData) {
        if (!countryList.includes(entry.region)) {
            countryList.push(entry.region);
            let newLi = document.createElement('li')
            newLi.innerHTML = entry.region;
            countryOL.append(newLi);
        }
    }
    mainSect.append(countryTitle)
    mainSect.append(countryOL)
}


// Assignment 2: List of Capricorns
const getCapricorns = () => {
    clearMain();
    // Filter
    const womenCapri = randomPersonData.filter(entry => 
        (entry.gender == 'female') 
        && (entry.age > 30) 
        && (checkZodiac(entry.birthday.mdy) == 'Capricornus')
    )
    // Sorting
    womenCapri.sort((a, b) => {
            let x = a.name.toLowerCase();
            let y = b.name.toLowerCase();
            if (x < y) {return -1;}
            if (x > y) {return 1;}
            return 0;
        });
    // Adding to DOM
    const capricornTitle = document.createElement("h2")
    capricornTitle.innerHTML = "List of Capricorn women over thirty"
    const capricornUL = document.createElement("ul");
    capricornUL.id = "list-of-capricorns";
    for (person of womenCapri) {
        const newLi = document.createElement('li')
        const capricornPhoto = document.createElement("img")
        newLi.innerHTML = `${person.name} ${person.surname}, born on ${person.birthday.mdy}`;
        capricornPhoto.src = person.photo
        capricornUL.append(newLi);
        capricornUL.append(capricornPhoto)
    }
    mainSect.append(capricornTitle)
    mainSect.append(capricornUL)
}

// Assignment 3: Old credit cards
const getCreditcards = () => {
    clearMain();
    // Filter
    const arrCreditcards = randomPersonData.filter(entry => 
        (parseInt(entry.age) > 18)
        && (nearFuture(entry.credit_card.expiration)) 
    )
    // Sorting
    arrCreditcards.sort((a, b) => {
        const expYearA = parseInt(a.credit_card.expiration.split('/')[1]);
        const expMonthA = parseInt(a.credit_card.expiration.split('/')[0]);
        const expYearB = parseInt(b.credit_card.expiration.split('/')[1]);
        const expMonthB = parseInt(b.credit_card.expiration.split('/')[0]);
        if ((expYearA < expYearB) || (expYearA === expYearB && expMonthA < expMonthB)) {
            return -1
        } else {
            return 1
        }
    })
    // Adding to DOM
    const creditcardTitle = document.createElement("h2")
    creditcardTitle.innerHTML = "List of creditcards that are about to expire, sorted by date"
    const creditcardUL = document.createElement("ul");
    creditcardUL.id = "list-of-creditcards";
    for (card of arrCreditcards) {
        const newLi = document.createElement('li')
        newLi.innerHTML = `${card.name} ${card.surname}, tel.no. ${card.phone}, creditcard no. ${card.credit_card.number}, expiry date: ${card.credit_card.expiration}.`;
        creditcardUL.append(newLi);
    }
    mainSect.append(creditcardTitle);
    mainSect.append(creditcardUL);        
}

// Assignment 4: Most inhabitants
const getMostPeople = () => {
    clearMain();
    //
    const countryList = {}
    for (entry of randomPersonData) {
        if (!(entry.region in countryList)) {
            countryList[entry.region] = 1;
        } else {
            countryList[entry.region]++;
        } 
    }
    // Sorting
    const arrCountries = Object.entries(countryList).sort((a,b) => b[1] - a[1]);   
    // Adding to DOM
    const mostCountriesTitle = document.createElement("h2")
    mostCountriesTitle.innerHTML = "List of countries with inhabitants, sorted"
    const mostCountriesUL = document.createElement("ul");
    mostCountriesUL.id = "list-of-countries-and-inhabitants";
    for (country of arrCountries) {
        const newLi = document.createElement('li')
        newLi.innerHTML = `${country[0]}: ${country[1]} inhabitant(s).`;
        mostCountriesUL.append(newLi);
    }
    mainSect.append(mostCountriesTitle);
    mainSect.append(mostCountriesUL); 
}

// Assignment 5: Get Average Age
const getAverageAge = () => {
    clearMain();
    const countryList = [];
    for (entry of randomPersonData) {
        if (!countryList.includes(entry.region)) {
            countryList.push(entry.region);
        }
    }
    const newNavBar = document.createElement('nav')
    for (country of countryList) {
        const newBtn = document.createElement('input')
        newBtn.type = 'button'
        newBtn.value = country
        newBtn.id = `btn${country}`
        newNavBar.append(newBtn)
    }
    mainSect.append(newNavBar)

    const ageObject = {};
    for (entry of randomPersonData) {
        if (!(entry.region in ageObject)) {
            ageObject[entry.region] = []
        }
        ageObject[entry.region].push(entry.age)
    }

    const ageNotification = document.createElement('h3')
    for (country in ageObject) {
        const ageSum = ageObject[country].reduce((a, b) => a + b)
        const ageAverage = Math.round((ageSum / ageObject[country].length))
        ageObject[country] = ageAverage
        const currButton = newNavBar.querySelector(`[value="${country}"]`)
        currButton.addEventListener('click', function(event) {
            ageNotification.innerHTML = `The average age of people from ${event.target.value} in this database is ${ageObject[event.target.value]}`
            mainSect.append(ageNotification)
        })
    }
}


// Assignment 6: Matchmaking

const listBachelors = () => {
    clearMain();
    const randomAdults = randomPersonData.filter(entry => entry.age > 17).sort((a, b) => {
        let x = a.name.toLowerCase();
        let y = b.name.toLowerCase();
        if (x < y) {return -1;}
        if (x > y) {return 1;}
        return 0;
    })

    const newUl = document.createElement('ul')
    for (entry of randomAdults) {
        entry['star_sign'] = checkZodiac(entry.birthday.mdy)
        // console.log(entry)
        const newLi = document.createElement('li')
        const newPar = document.createElement('p')
        const BachInfo = [entry.name, entry.surname, entry.region, entry.age, entry.star_sign]
        newPar.innerHTML = `${entry.name} ${entry.surname} (${entry.region}), ${entry.age} years old. Star sign: ${entry.star_sign}`
        const newImg = document.createElement('img')
        newImg.src = entry.photo
        const newBtn = document.createElement('input')
        newBtn.type = 'button'
        newBtn.id = `btn${entry.name}${entry.surname}`
        newBtn.value = "Find match!"

        newLi.append(newPar)
        newLi.append(newBtn)
        newLi.append(newImg)

        newUl.append(newLi)
        mainSect.append(newUl)
        
        newBtn.addEventListener('click', () => {
            clearMain();
            const bachTitle = document.createElement('h3')
            bachTitle.innerHTML = `The selected bachelor(ette) is: ${BachInfo[0]} ${BachInfo[1]}, who is a ${BachInfo[4]}.`
            const bachSubtitle = document.createElement('h4')
            bachSubtitle.innerHTML = `Other bachelor(ette)s who, like ${BachInfo[0]}, are ${BachInfo[4]}:`
            
            const matchList = document.createElement('ul')
            for (person in randomAdults) {
                if (randomAdults[person]['star_sign'] === BachInfo[4] && randomAdults[person]['surname'] !== BachInfo[1]) {

                    const matchPerson = randomAdults[person]
                    const matchLi = document.createElement('li')
                    const matchPar = document.createElement('p')
                    matchPar.innerHTML = `${matchPerson['name']} ${matchPerson['surname']} (${matchPerson['region']}): ${matchPerson['age']} years old. Star sign: ${matchPerson['star_sign']}.`
                    const matchImg = document.createElement('img')
                    matchImg.src = matchPerson['photo']

                    matchLi.append(matchPar)
                    matchLi.append(matchImg)
                    matchList.append(matchLi)


                    mainSect.append(bachTitle)
                    mainSect.append(bachSubtitle)
                    mainSect.append(matchList)
                    
                }
            }
        })
    }
}

btnCountries.addEventListener('click', getCountries);
btnCapricorn.addEventListener('click', getCapricorns);
btnCreditcards.addEventListener('click', getCreditcards);
btnMostPeople.addEventListener('click', getMostPeople);
btnAverageAge.addEventListener('click', getAverageAge);
btnMatchmaking.addEventListener('click', listBachelors);
