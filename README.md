# [ React + Vite ] template
> A simple React + Vite project template. ``` npx create-react-app ``` is a great tool, but it is too heavy. ``` npm create vite@latest ``` (Vite) is a lightweight tool that can be used to quickly build a React project.
Hosted Link [Click here](https://main.d2j9n0er3g7k47.amplifyapp.com/)

## Setting up the Repository
1. Clone the repository
```
Click the Clone button  
```
2. Copy this HTTP command line and paste it in your terminal
```
git clone git@bitbucket.org:katalis-ai/katalis.git
```
3. You will be able to proceed to clone only if you are given the access (if not, ask the project maintainer)
4. Then most probably if you are new to ```Bitbucket``` you haven't set up your SSH key. Follow the steps below to set up your SSH key.
    - Click the Settings Icon on the right of navbar
    - Select the ```Personal Bitbucket Settings``` option
    - Click the ```SSH keys``` option on the left navbar
    - Then see this youtube video properly [Link](https://www.youtube.com/watch?v=81UQIVh7jM0)
    - Then you will be able to clone the repository
5. Also you might face issue with entering the password to verify if that is your account, just click on ```Get help logging in``` and you will be able to reset you password. (Reset only if you have forgotten your password, otherwise not)

## Project setup
Make sure you are inside the root directory of the project.
Then run the following commands to start 
```
npm install
npm run dev
```

## For calling the API
Whenever you are going to use the .env file, you need to add the prefix "VITE" to the variable name. 
And if you are going to use those variables in your app, you need to do like below :

```.env``` file (let say this is your env file)
```
VITE_SERVER_URL= "http://localhost:5000"
```

```App.js``` file (let say this is your app file)
If you are going to use that variable and call an api, do like this :
```
axios.get(`${import.meta.env.VITE_SERVER_URL}`)
```