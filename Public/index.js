// console.log('require')
// const axios = require('axios');
// import axios from 'axios';

// working vars for html pages
const baseUrl = 'http://localhost:5000'
const signUpForm = document.querySelector('#submit-button');
const loginPage = document.querySelector('#login-btn')
const logo = document.querySelector(".logo")
const body = document.querySelector('body');

const loginMenuBtn = document.querySelector('#logIn-btn');
const signUpMenuBtn = document.querySelector('#signUp-btn')

const loginBoxElem = document.querySelector('.login-box')
let signupBoxElem = document.querySelector('.signup-box');
let itemCardMain = document.querySelector('.item-cards');
const mainSection = document.querySelector('#main')

let count = 0;


const itemCardComp = () => {
    const itemCardElemStr = (`<div role='main' class="item-cards">
    <span class="product">
        <img class="item" src="https://cdn11.bigcommerce.com/s-dfloq/images/stencil/500x659/products/615/3331/1__23775.1640109893.png?c=2"
        alt="planner pic"/>
        <p class="description">Our 2022 Weekly Planner is one of our best sellers. Includes a monthly view and horizontal layout for the weekly views!</p>
        <p class='price'>$15.00</p>
        <button onclick="return addToCart()" class='add-to-cart'id='planner-btn'>Add To Cart</button>
    </span>
    <span class="product">
        <img class="item" src="https://images.squarespace-cdn.com/content/v1/59d27d8629f18706b8c7d50e/1582065800866-4DQBWDWQJXWNAQ3TZJ8C/daily+planner+pad_shop+image_with+pencil.jpg?format=1500w"
        alt="planner pad"/>
        <p class="description">Our daily desk pad allows you to write down your to-do lists, plan your day, and write down any notes to have with you as you work</p>
        <p class='price'>$10.00</p>
        <button onclick="return addToCart()" class='add-to-cart'id='planner-pad-btn'>Add To Cart</button>
    </span>
    <span class="product">
        <img class="item" src="https://cdn.shopify.com/s/files/1/0903/2160/products/Islander-Leather-Journal-With-Wrap-2_d95c29b1-874e-4e2a-a1a9-9491ae0a5d34_1024x1024.jpg?v=1643063203"
        alt="journal-pic"/>
        <p class="description">The lined journal is perfect for writing down your thoughts & ideas. With thick paper that doesn't bleed through, you can use any writing utensil you choose</p>
        <p class='cost'>$12.00</p>
        <button onclick="return addToCart()" class='add-to-cart' id='journal-btn'>Add To Cart</button>
    </span>
</div>`);
const frag = document.createRange().createContextualFragment(itemCardElemStr);
return frag;
}

const loginComp = () => {
    const loginCompStr = (`<div class="login-box">
    <div style="display:flex">
        <form class ='box' style="margin:auto">
            Email: <input type="text" placeholder="enter email" id='email'/>
            <br/>
            Password: <input type="password" placeholder="enter password" id='password'/>
            <div>
                <button onclick="return fetchUser(event)" id='login-btn'>Log-in</button>
            </div>
        </form>
    </div>
</div>`);
const frag = document.createRange().createContextualFragment(loginCompStr.trim());
return frag;
}

const signUpFormComp = () => {
    const signUpFormStr = (`<div class="signup-box">
    <div style="display:flex">
           <form id="signup-form" style="margin:auto">
               First Name: <input id='Firstname-input' type="text" placeholder="Enter your first name"/>
               <br/>
               Last Name: <input id="Lastname-input" type="text" placeholder="Enter your last name"/>
               <br/>
               Email: <input id="email-input" type="text" placeholder="Email"/>
               <br/>
               Password: <input id="password-input" type="password" placeholder="Enter password"/>
               <br/>
               Re-enter Password: <input id="repassword" type="password" placeholder="Re-enter password"/>
               <div>
                   <button onclick="return testSubmit(event)" id="submit-button">Submit</button>
               </div>
           </form>
           </div>
       </div>`);
       const frag = document.createRange().createContextualFragment(signUpFormStr.trim());
       return frag;
}

// adding items to cart
const addToCart = () => {
    const itemCounterTest = document.querySelector('#bag-counter');
    count = count + 1;
    if (count === 1) {
        itemCounterTest.textContent = '1 item'
    } else {
        itemCounterTest.textContent = count + ' items'
    }
}

// brings you back to homepage 
const returnHome = () =>{
    const loginBoxElemTest = document.querySelector('.login-box');
    const signupBoxElemTest = document.querySelector('.signup-box');

    if(loginBoxElemTest) {
        loginBoxElemTest.remove()
        mainSection.appendChild(itemCardComp())
    }else if(signupBoxElemTest) {
        signupBoxElemTest.remove()
        mainSection.appendChild(itemCardComp())
    }
}


logo.addEventListener('click', () => returnHome());

// axios.post(sign up)
const displayUser = async (id) => {
    await axios.get(`${baseUrl}/stationery/user/${id}`)
        .then(res => {
            const newDiv = document.createElement('div')
            const newContent = document.createTextNode(`Hello, ${res.data.firstName}`)
            newDiv.appendChild(newContent);
            document.querySelector('.cart').appendChild(newDiv);
            returnHome()
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
                window.confirm(res.data.message)
                displayUser(res.data.userId)
            } else {
                window.alert(res.data.message)
                email = '';
                password = '';
            }
        })
        .catch(err => {
            window.alert(err)
        })
} // end of fetch user

const testSubmit = (elem) => {
    elem.preventDefault();

    let firstName = document.getElementById('Firstname-input').value
    let lastName = document.getElementById('Lastname-input').value
    let email = document.getElementById('email-input').value
    let password = document.getElementById('password-input').value
    let rePassword = document.getElementById('repassword').value

    if(password !== rePassword){
        window.alert('Passwords do not match')
        return
    }else{
        const newUser = {
            firstName,
            lastName,
            email,
            password,
        }
    
        axios.post(`${baseUrl}/stationery/user`, newUser)
            .then(res => {
                displayUser(res.data.id)
            })
            .catch(err => console.log(err))
    }
}

const loginScreen = () => {
    const itemCardMainTest = document.querySelector('.item-cards');
    const signupBoxElemTest = document.querySelector('.signup-box');

    if(itemCardMainTest){
        itemCardMainTest.remove()
        mainSection.appendChild(loginComp())
    } else if (signupBoxElemTest){
        signupBoxElemTest.remove()
        mainSection.appendChild(loginComp())
    }
}

loginMenuBtn.addEventListener('click', loginScreen)

const signUpScreen = () => {
    const itemCardMainTest = document.querySelector('.item-cards');
    const loginBoxElemTest = document.querySelector('.login-box');

    if(itemCardMainTest){
        itemCardMainTest.remove()
        mainSection.appendChild(signUpFormComp())
    }else if (loginBoxElemTest){
        loginBoxElemTest.remove()
        mainSection.appendChild(signUpFormComp())
    }
}

signUpMenuBtn.addEventListener('click', signUpScreen)

document.querySelector('#planner-btn').addEventListener('click', addToCart)
document.querySelector('#planner-pad-btn').addEventListener('click', addToCart)
document.querySelector('#journal-btn').addEventListener('click', addToCart)