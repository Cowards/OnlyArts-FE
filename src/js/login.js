import http from './http.js'
import getInforAccount from './header.js'
const loginForm = document.querySelector('#login-form')
loginForm.addEventListener('submit', async (event)=>{
    event.preventDefault()
    const username = document.querySelector('#username-login__form').value;
    const password = document.querySelector('#password-login__form').value;
    const resultLogin = await http.send('POST','/api/login' ,{username,password})
    if(resultLogin.status == 'ok'){
        localStorage.setItem('token', resultLogin.data)
        window.location="../page/index.html"
        alert('Sign in is completed')
        // lưu token nhận được vào localStorage khi đăng nhập
    }else{
        alert(resultLogin.error)
    }
    return resultLogin;
})
const checkSigned = async()=>{
    const data =  await getInforAccount();
    // console.log(data)
    if(data){
        window.location="../page/index.html"
    }
}
checkSigned()