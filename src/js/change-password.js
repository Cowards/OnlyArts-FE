import http from './http.js'
const changPasswordForm = document.querySelector('#change-password-form')
changPasswordForm.addEventListener('submit', async (event)=>{
    event.preventDefault()
    const newpassword = document.querySelector('#password-change-password__form').value;
    const resultChangePassword = await http.send('POST', '/api/change-password' ,
                                                {newpassword, token: localStorage.getItem('token')})
    if(resultChangePassword.status == 'ok'){
        alert('Password is changed')
    }else{
        alert(resultChangePassword.error)
    }
    return resultChangePassword;
})