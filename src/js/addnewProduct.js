import http from './http.js'
// const addnewProductForm = document.querySelector('#add-product__form')
// addnewProductForm.addEventListener('submit', async event =>{
//     event.preventDefault()
//     const productName = document.querySelector('#product-name__add-product').value
//     const productPrice = document.querySelector('#product-price__add-product').value
//     const productDesc = document.querySelector('#product-desc__add-product').value
//     const productType = document.querySelector('#product-type__add-product').value
//     const productImg = document.querySelector('#product-image__add-product').value
//     const newProduct = {productName, productPrice, productDesc, productType, productImg}
//     console.log(newProduct)
//     const uploadProImgResult = await http.send('POST', '/api/file' ,
//     {file: productImg})
//     // if(uploadProImgResult.status == 'ok'){
//     //     alert('uploadProImgResult is oke')
//     // }else{
//     //     alert(uploadProImgResult.error)
//     // }
//     // return resultChangePassword;
    
// })