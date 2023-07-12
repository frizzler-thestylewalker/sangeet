console.log("welcome")


// initialize the variables

let songIndex = 0;
let audioElement = new Audio("audio/1.mp3")
let masterPlay = document.getElementById("masterPlay")
let myProgressBar = document.getElementById("myProgressBar")
let songInfo = document.getElementById("songInfo")
let songItem = Array.from(document.getElementsByClassName("song-name"))
let musicName =document.getElementsByClassName("musicName")
let coverImg = document.getElementById("cover-img")
 
let songs = [
    {songName: "Let me love you", filePath: "audio/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "What jhumka?", filePath: "audio/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "Obssesed", filePath: "audio/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Gul", filePath: "audio/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Phir aur kya chaiye", filePath: "audio/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Bana Sharabi", filePath: "audio/6.mp3", coverPath: "covers/6.jpg"}
]

songItem.forEach((element, i)=>{
    
    element.getElementsByTagName("img")[0].src = songs[i].coverPath
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName
    // element.getElementsByClassName("musicName")[0].innerText = songs[i].songName
    
})



// audioElement.play()

//handle play/pause
masterPlay.addEventListener("click", ()=>{
    if(audioElement.paused || audioElement.currentTime <= 0){
        audioElement.play()
        masterPlay.classList.remove("fa-play")
        masterPlay.classList.add("fa-pause")
        songInfo.style.opacity = 1
    }
    else{
        audioElement.pause()
        masterPlay.classList.remove("fa-pause")
        masterPlay.classList.add("fa-play")
        songInfo.style.opacity = 0
    }
})

//listen to events
audioElement.addEventListener('timeupdate', ()=>{

    //update seekbar
    progress = parseInt((audioElement.currentTime / audioElement.duration)*100)
    myProgressBar.value = progress

})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = ((myProgressBar.value * audioElement.duration) / 100)
})

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
        element.classList.add("fa-play")
        element.classList.remove("fa-pause")
    })
} 

Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
    element.addEventListener("click", (e)=>{
        makeAllPlays()
        let songIndex = parseInt(e.target.id)
        e.target.classList.remove("fa-play")
        e.target.classList.add("fa-pause")
        audioElement.src=`audio/${songIndex + 1}.mp3`
        songInfo.innerText = songs[songIndex].songName
        coverImg.src = songs[songIndex].coverPath
        audioElement.currentTime = 0
        audioElement.play()
        masterPlay.classList.remove("fa-play")
        masterPlay.classList.add("fa-pause")
       
    })
})

document.getElementById("next").addEventListener('click', ()=>{
    if(songIndex>=5){
        songIndex = 0
    }else{
        songIndex += 1
    }
    audioElement.src=`audio/${songIndex + 1}.mp3`
    songInfo.innerText = songs[songIndex].songName
    coverImg.src = songs[songIndex].coverPath
    audioElement.currentTime = 0
    audioElement.play()
    masterPlay.classList.remove("fa-play")
    masterPlay.classList.add("fa-pause")
})
document.getElementById("previous").addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }else{
        songIndex -= 1
    }
    audioElement.src=`audio/${songIndex + 1}.mp3`
    songInfo.innerText = songs[songIndex].songName
    coverImg.src = songs[songIndex].coverPath
    audioElement.currentTime = 0
    audioElement.play()
    masterPlay.classList.remove("fa-play")
    masterPlay.classList.add("fa-pause")
})
