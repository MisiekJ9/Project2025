let selectBaseCurrency = document.getElementById('fromCurrency')
let selectToConvertCurrency = document.getElementById('toCurrency')
let inputBaseCurrency = document.getElementById('kwota')
let error = document.getElementById("errorKalkulator")
let isCurrencyApiWorking = true 

let selectedBaseCurrency
let selectedToConvertCurrency

function updateBaseCurrencyValue() {
  selectedBaseCurrency = selectBaseCurrency.value
  console.log(selectedBaseCurrency)
  adjustCurrencyOptions()
}

function updateToConvertCurrencyValue() {
  selectedToConvertCurrency = selectToConvertCurrency.value
  console.log(selectedToConvertCurrency)
  adjustCurrencyOptions()
}

selectBaseCurrency.addEventListener('change', updateBaseCurrencyValue)
selectToConvertCurrency.addEventListener('change', updateToConvertCurrencyValue)


const apiKey = 'cur_live_3X5TpMpTz9M1m5bptONhtboPj8mZAvzaAgEAZEBH'

function convertCurrency() {
  error.innerHTML = ``
  let inputBaseCurrencyValue = inputBaseCurrency.value

  if (inputBaseCurrencyValue != 0 && inputBaseCurrencyValue != '') {
    const currencyUrl = `https://api.currencyapi.com/v3/latest?apikey=${apiKey}&currencies=${selectedToConvertCurrency}&base_currency=${selectedBaseCurrency}`
    
    fetch(currencyUrl)
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error('CurrencyAPI error')
        }
      })
      .then((data) => {
        const exchangeRate = data.data[selectedToConvertCurrency].value
        const result = MyMathLibrary.multiply(inputBaseCurrencyValue, exchangeRate)
        document.getElementById("kwota_przeliczona").value = result.toFixed(2)
      })
      .catch((error) => { 
        console.error("CurrencyAPI zawiodło, próba użycia NBP API...")
        error.innerHTML = `Awaria systemu! Dostępne wyłącznie kursy z/do PLN`

        isCurrencyApiWorking = false
        adjustCurrencyOptions()

        if (selectedBaseCurrency !== 'PLN' && selectedToConvertCurrency !== 'PLN') {
          error.innerHTML = `Aktualnie system obsługuje tylko kursy z/do PLN`
          return;
        }

        const currencyToFetch = selectedBaseCurrency === 'PLN' ? selectedToConvertCurrency : selectedBaseCurrency

        const nbpUrl = `http://api.nbp.pl/api/exchangerates/rates/A/${currencyToFetch}/?format=json`

        fetch(nbpUrl)
        .then((response) => {
          if (response.ok) {
            return response.json()
          } else {
            throw new Error('NBP API error')
          }
        })
        .then((data) => {
          const rate = data.rates[0].mid
          let result

          if (selectedBaseCurrency === 'PLN') {
            result = MyMathLibrary.divide(inputBaseCurrencyValue, rate)
          } else {
            result = MyMathLibrary.multiply(inputBaseCurrencyValue, rate)
          }

          document.getElementById("kwota_przeliczona").value = result.toFixed(2)
        })
        .catch((error) => {
          console.error('Błąd NBP API:', error)
          error.innerHTML = `Błąd połączenia z bazą`
        });
    });
  } else {
    error.innerHTML = `Proszę podać wartość do przeliczenia`
  }
}

function allCurrencies(){
  const allCurrencies = ["USD", "NOK", "AUD", "CAD", "GPB", "CHF", "DKK", "SEK", "CZK", "ISK", "EEK", "JPY", "HUF", "RUR", "UAH", "BGN", "PLN", "TRL", "ROL", "MDL", "MKD", "CSD", "BAM", "ALL", "EUR"]
  for(let i = 0; i < allCurrencies.length; i++){
  fetch(`https://api.currencyapi.com/v3/latest?apikey=${apiKey}&currencies=${allCurrencies[i]}&base_currency=PLN`)
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error('Błąd pobierania danych o walutach')
        }
      })
      .then((data) => {
        let kurs = ""
        kurs = document.getElementById(allCurrencies[i])
        kurs.innerHTML = (1 / data.data[allCurrencies[i]].value).toFixed(2)+" PLN"
      })
      .catch((error) => {
        console.error('Błąd:', error)
        errorKurs = document.getElementById(allCurrencies[i])
        errorKurs.innerHTML = "Błąd danych"
        errorKurs.style.color = "red"
      })
    }
}

function adjustCurrencyOptions() {
  const allOptionsFrom = selectBaseCurrency.options
  const allOptionsTo = selectToConvertCurrency.options

  if (isCurrencyApiWorking) {
    for (let opt of allOptionsFrom) opt.disabled = false
    for (let opt of allOptionsTo) opt.disabled = false
    return;
  }

  // TRYB NBP: tylko pary z PLN
  const isFromPLN = selectBaseCurrency.value === 'PLN'
  const isToPLN = selectToConvertCurrency.value === 'PLN'

  if (!isFromPLN) {
    for (let option of allOptionsTo) {
      option.disabled = option.value !== 'PLN'
      option.title = option.disabled ? "Dostępne tylko pary z PLN" : ""
      option.style.opacity = option.disabled ? 0.5 : 1
    }
  } else {
    for (let option of allOptionsTo) {
      option.disabled = false
      option.title = ""
      option.style.opacity = 1
    }
  }

  if (!isToPLN) {
    for (let option of allOptionsFrom) {
      option.disabled = option.value !== 'PLN'
      option.title = option.disabled ? "Dostępne tylko pary z PLN" : ""
      option.style.opacity = option.disabled ? 0.5 : 1
    }
  } else {
    for (let option of allOptionsFrom) {
      option.disabled = false
      option.title = ""
      option.style.opacity = 1
    }
  }
}


//allCurrencies()
updateBaseCurrencyValue()
updateToConvertCurrencyValue()
