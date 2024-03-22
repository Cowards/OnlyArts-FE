import http from './http.js'

const getInforAccount = async ()=>{
    const resultGetInfor = await http.send('POST', '/api/get-infor-account' ,
    {token: localStorage.getItem('token')})
    if(resultGetInfor.status == 'ok'){
        document.querySelector('.account__block').style.display = "none"
        document.querySelector('.infor-account__block').style.display ="block"
        document.querySelector('.userName a').innerHTML = resultGetInfor.data.userid
        return resultGetInfor.data
    }else{
        document.querySelector('.account__block').style.display = "block"
        document.querySelector('.infor-account__block').style.display ="none"
        document.querySelector('.userName a').innerHTML = ''
        return null
    }
}
getInforAccount()

document.querySelector('.signout-btn').addEventListener('click', ()=>{
    localStorage.removeItem('token')
    document.querySelector('.account__block').style.display = "block"
    document.querySelector('.infor-account__block').style.display ="none"
    document.querySelector('.userName a').innerHTML = ''
})

const navListItem = document.querySelectorAll('.nav-menu__link')
navListItem.forEach(item =>{
    item.addEventListener('click', event =>{
        navListItem.forEach(_item =>{
            _item.classList.remove('actived')
        })
        event.target.classList.add("actived")
    })
})

export default getInforAccount;