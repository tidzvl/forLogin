let i = 0

const bacsiProfile = document.querySelector('.hide-arrow')
bacsiProfile.addEventListener('click', () => {
    const myProfile = document.querySelector('.my-profile')
    if(myProfile.classList.contains('show')){
        myProfile.classList.remove('show')
        i -= 1
    }else{
        myProfile.classList.add('show')
        i += 1
    }    
})

if(i !== 0){
    window.onclick = () => {
        const myProfile = document.querySelector('.my-profile')
        if(myProfile.classList.contains('show')){
            myProfile.classList.remove('show')
        }   
    }
}