let selectBaseCurrency = document.getElementById('fromCurrency')
let selectToConvertCurrency = document.getElementById('toCurrency')
let inputBaseCurrency = document.getElementById('kwota')

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
      })
  } else {
    alert('Proszę podać wartość do przeliczenia.')
  }
}

function allCurrencies(){
  const allCurrencies = ["USD", "NOK", "AUD", "JPY", "PLN", "UAH", "HUF", "CZK", "CHF", "EUR"]
  const allCurrenciesString = allCurrencies.join("%2C")
  const allCurrenciesUrl = `https://api.currencyapi.com/v3/latest?apikey=${apiKey}&currencies=${allCurrenciesString}&base_currency=PLN`
  console.log(allCurrenciesUrl)
  fetch(allCurrenciesUrl)
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error('Błąd pobierania danych o walutach')
        }
      })
      .then((data) => {
        for(let i = 0; i < allCurrencies.length; i++){
          let temp = ""
          temp = document.getElementById(allCurrencies[i])
          temp.innerHTML = (1 / data.data[allCurrencies[i]].value).toFixed(2)+" PLN"
        }
      })
      .catch((error) => {
        console.error('Błąd:', error)
        errorKurs.innerHTML = "Wystąpił błąd pobierania walut"
      })
}

allCurrencies()
updateBaseCurrencyValue()
updateToConvertCurrencyValue()
