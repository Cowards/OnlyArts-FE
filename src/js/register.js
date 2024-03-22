import http from './http.js'
import getInforAccount from './header.js'

const regForm = document.querySelector('#reg-form')
regForm.addEventListener('submit', async (event)=>{
    event.preventDefault()
    const username = document.querySelector('#username-reg__form').value;
    const password = document.querySelector('#password-reg__form').value;
    const rePassword = document.querySelector('#re-password-reg__form').value;
    const phoneNumber = document.querySelector('#phone-reg__form').value;
    if(password != rePassword){
        alert('password and rePassword is dissimilarity')
        return null
    }
    console.log(phoneNumber)
    const resultReg = await http.send('POST', '/api/register' ,{username,password,phoneNumber})
    if(resultReg.status == 'ok'){
        window.location="../page/login.html"
        alert('user registration is Completed')
        
    }else{
        alert(resultReg.error)
    }
    return resultReg;
})

const checkSigned = async()=>{
    const data =  await getInforAccount();
    // console.log(data)
    if(data){
        window.location="../page/index.html"
    }
}
checkSigned()