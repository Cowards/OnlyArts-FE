import http from './http.js'
import getInforAccount from './header.js'
const checkSigned = async()=>{
    const data =  await getInforAccount();
    // console.log(data)
    if(!data){
        window.location="../page/index.html"
        return
    }
    return data

}
const userData = checkSigned()

// const initTag = ()=>{
//     const profileTagList = document.querySelectorAll('.menu-item__side-bar')
//     profileTagList.forEach(_item =>{
//         _item.classList.remove('actived')
//     })
//     const tag = window.location.pathname.split('/')[2].split('.')[0]
//     document.querySelector(`#${tag}`).classList.add('actived')
// }
// initTag()