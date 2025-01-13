const MyMathLibrary = {   
    add: function (a, b) {
        return a + b;
    },
    subtract: function (a, b) {
        return a - b;
    },
    multiply: function (a, b) {
        return a * b;
    },
    divide: function (a, b) {
        if (b === 0) {
            throw new Error("Division by zero");
        }
        return a / b;
    },
    convert : function(paramBase, paramConvert, paramValue){
        return fetch(`${baseUrl}${apiKey}&currencies=${paramBase}&base_currency=${paramConvert}`)
        .then(response => response.json())
        .then(data =>{
            return paramValue * data.data[selectedToConvertCurrency].value
        })
    },
    request: function(selectedBaseCurrency, selectedToConvertCurrency, inputBaseCurrency){
        return convert(selectedBaseCurrency, selectedToConvertCurrency, inputBaseCurrency)
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = MyMathLibrary;
} else {
    window.MyMathLibrary = MyMathLibrary;
}