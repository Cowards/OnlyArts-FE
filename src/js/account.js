import http from './http.js'
import getInforAccount from './header.js'
const changPasswordForm = document.querySelector('#account__form')
changPasswordForm.addEventListener('submit', async (event)=>{
    event.preventDefault()
    const newPhone = document.querySelector('#account-phone').value;
    const currentpwd = document.querySelector('#account-current-pwd').value;
    const newpassword = document.querySelector('#account-new-pwd').value;
    const resultChangeInfor = await http.send('POST', '/api/change-infor' ,
                                                {newPhone,currentpwd,newpassword, token: localStorage.getItem('token')})
    if(resultChangeInfor.status == 'ok'){
        localStorage.removeItem('token')
        document.querySelector('.account__block').style.display = "block"
        document.querySelector('.infor-account__block').style.display ="none"
        document.querySelector('.userName a').innerHTML = ''
        window.location="../page/login.html"
        alert('Password is changed')
    }else{
        alert(resultChangeInfor.error)
    }
    return resultChangeInfor;
})

const initInfor= async()=>{
    const inforUser = await getInforAccount()
    document.querySelector('#account-phone').value = inforUser.phoneNumber
    document.querySelector('#account-username').innerHTML = inforUser.userid
}
initInfor()