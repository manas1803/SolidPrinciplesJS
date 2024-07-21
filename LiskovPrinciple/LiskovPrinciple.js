// example function to make HTTP requests
function makeRequest(url, errorHandler) {
    fetch(url)
        .then(response => response.json())
        .catch(error => errorHandler.handle(error))
    }

// We can have several functions to handle errors
const consoleErrorHandler = function handle(error){
    console.log(error)
}

const externalErrorHandler = function handle(error){
    sendErrorToExternalService(error)
}

makeRequest(url, consoleErrorHandler);
makeRequest(url, externalErrorHandler);