window.addEventListener('DOMContentLoaded', () => {
    const cookie = document.cookie
    const consentPropertytype = 'site_consent';
    const modalContent = document.querySelector('.list')
    const modal = document.querySelector('.modal')
    const closeModal = document.querySelector('.close')
    const openModal = document.querySelector('.cookies-guard')
    let date = new Date(Date.now() + 86400e3);
   
    const cookieStorage ={
        
        getItem: (key) => {
            const cookies = document.cookie
                                .split(';')
                                .map(cookie => cookie.split('='))
                                .reduce((acc, [key, value]) => ({...acc, 
                                                    [key.trim()] : value}), {});

            return cookies[key];
        },
        setItem: (key, value) => {
            document.cookie = key +'='+ value +'; Path=/;';
        },
        deleteItem: (name) => {
            document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        }
    }
    
    function getAllCookie(arrayCookie){
       return arrayCookie.split(';').map(item => item.split('=')).reduce((acc, [key, value]) => (
        {...acc, [key.trim()] : value}
       ),{})
    }

    // function delete_cookie(name) {
    //     document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    //   }
  

    function render(){
        modalContent.innerHTML = '';
        for(let key in getAllCookie(cookie)){
           if(key){
            modalContent.innerHTML += `
           <tr>
                            <th>${key}</th>
                            <th>${getAllCookie(cookie)[key] || 0}</th>
                            <th><button data-type=${key} class="btn-delete">Delete</button></th>
                        </tr>
           `
           }
           
        }
        

        const btn = document.querySelectorAll('.btn-delete')
        btn.forEach((item) => {
            item.addEventListener('click', (event) => {
                 cookieStorage.deleteItem(event.target.getAttribute('data-type'))
              
            })
        })
    }
    render()

    console.log(document.cookie)




    

    const storageType = cookieStorage;
    
    const hasConsented = () => storageType.getItem(consentPropertytype) === 'true'? true : false;
    const toggleStorage = (prop) => storageType.setItem(consentPropertytype, prop);
    const popup = document.querySelector('.popup')
    const btnConfirm = document.querySelector('[data-confirm]')
    const btnCancel = document.querySelector('[data-cancel]')
    
    
    if(hasConsented()){
        console.log('loading...')
    } else{
        popup.classList.add('popup_active');
        
    }

    openModal.addEventListener('click', () => {
        modal.style.display = 'block'
        console.log(1)
    })
    btnConfirm.addEventListener('click', () => {
        toggleStorage(true);
        popup.classList.remove('popup_active');
        console.log('loading')
    })
    btnCancel.addEventListener('click', () => {
        toggleStorage(false);
        popup.classList.remove('popup_active');
    })
    closeModal.addEventListener('click',()=>{
        console.log(1)
        modal.style.display = 'none'
    })
})