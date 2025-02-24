let selectBaseCurrency = document.getElementById('fromCurrency')
let selectToConvertCurrency = document.getElementById('toCurrency')
let inputBaseCurrency = document.getElementById('kwota')
let error = document.getElementById("errorKalkulator")

let selectedBaseCurrency
let selectedToConvertCurrency

function updateBaseCurrencyValue() {
  selectedBaseCurrency = selectBaseCurrency.value
  console.log(selectedBaseCurrency)
}

function updateToConvertCurrencyValue() {
  selectedToConvertCurrency = selectToConvertCurrency.value
  console.log(selectedToConvertCurrency)
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
          throw new Error('Błąd pobierania danych o walutach')
        }
      })
      .then((data) => {
        const exchangeRate = data.data[selectedToConvertCurrency].value
        console.log(`Kurs wymiany: ${exchangeRate}`)

        const result = MyMathLibrary.multiply(inputBaseCurrencyValue, exchangeRate)
        document.getElementById("kwota_przeliczona").value = result.toFixed(2)
      })
      .catch((error) => {
        console.error('Błąd:', error)
        error.innerHTML = `Błąd połączenia z bazą`
      })
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
      })
    }
}

allCurrencies()
updateBaseCurrencyValue()
updateToConvertCurrencyValue()
