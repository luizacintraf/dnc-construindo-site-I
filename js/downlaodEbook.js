import darkMode from './darkMode.js'

window.addEventListener('load',()=>{

        document.getElementById("darkModeBtn").addEventListener("click",()=>{

        darkMode()

    })


    document.getElementById("download").addEventListener("click",()=>{
        window.open('../public/ebook.pdf')
    })



})