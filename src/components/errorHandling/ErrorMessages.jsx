// errorMessages.js

export const getErrorMessages = (statusCode) => {
    switch (statusCode) {
        case 429:
            return "Too many requests, please try again later";
        case 500:
            return "Internal Server Error!";
        case 504:
            return "Server is taking too long to respond, request timeout!";
        default:
            return "Please try again later.";
    }
};
