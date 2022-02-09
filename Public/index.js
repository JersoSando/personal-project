// console.log('require')
// const axios = require('axios');
// import axios from 'axios';

// working vars for html pages
const baseUrl = 'http://localhost:5000'
const signUpForm = document.querySelector('#submit-button');
const loginPage = document.querySelector('#login-btn')
const logo = document.querySelector(".logo")




// brings you back to homepage 
const returnHome = () =>{
    console.log('where am i hitting return home')
    window.location = './index.html'
}


logo.addEventListener('click', returnHome);

// axios.post(sign up)
const displayUser = async (id) => {
    console.log('made it inside display user', id)
    await axios.get(`${baseUrl}/stationery/user/${id}`)
        .then(res => {
            // window.location.replace("./index.html")
            console.log('what is res data:: ', res)
            const newDiv = document.createElement('div')
            const newContent = document.createTextNode(`Hello, ${res.data.firstName}`)
            newDiv.appendChild(newContent);
            const cart = document.getElementsByClassName('cart')
            document.getElementById('front').appendChild(newDiv);
        })
    // direct user to index.html with user's name on header
}

// axios.get (login)
const fetchUser = async (event) => {
    event.preventDefault()
    let email = document.getElementById('email').value
    let password = document.getElementById('password').value

    const loginUser = {
        email,
        password
    }
    await axios.post(`${baseUrl}/stationery/login`, loginUser)
        .then(res => {
            if (res.data.isLoggedIn) {
                let confirm = window.confirm(res.data.message)
                if (confirm) window.location.replace('./index.html')
            } else {
                window.alert(res.data.message)
                email = '';
                password = '';
            }
        })
        .catch(err => {
            console.log('what be err', err)
            window.alert(err.data)
        })
} // end of fetch user

signUpForm && signUpForm.addEventListener('click', (elem) => {
    console.log('made it into signup')
    elem.preventDefault();
    // let newUser;

    console.log('I was called inside form thing')

    let firstName = document.getElementById('Firstname-input').value
    let lastName = document.getElementById('Lastname-input').value
    let email = document.getElementById('email-input').value
    let password = document.getElementById('password-input').value
    let rePassword = document.getElementById('repassword').value

    // write logic make make sure the passwords match, and if they dont
    // do something that lets the user know that the passwords did not match.
    const newUser = {
        firstName,
        lastName,
        email,
        password
    }

    axios.post(`${baseUrl}/stationery/user`, newUser)
        .then(res => {
            console.log('made it inside the axios func: ', res)
            displayUser(res.data.id)
        })
        .catch(err => console.log(err))
})
    
    
loginPage && loginPage.addEventListener('click', fetchUser)

