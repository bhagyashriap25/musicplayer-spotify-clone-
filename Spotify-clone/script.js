console.log("Welcom to Spotify");
//Initilize the variables
let songIndex=0;
let audioElement=new Audio('Songs/1.mp3');
let masterPlay=document.getElementById('masterPlay')
let myProgressBar=document.getElementById('myProgressBar')
let gif=document.getElementById('gif')
let masterSongName=document.getElementById('masterSongName')
let songItems=Array.from(document.getElementsByClassName('songItem'));

let songs=[
    { songName:"Agar Tum Sath-Hoo", filePath:"Songs/1.mp3",coverPath:"Covers/1.jpeg" },
    { songName:"Tere Hawale", filePath:"Songs/2.mp3",coverPath:"Covers/2.jpeg" },
    { songName:"Apna Bana Le", filePath:"Songs/3.mp3",coverPath:"Covers/3.jpeg" },
    { songName:"Sang Rahiyo", filePath:"Songs/4.mp3",coverPath:"Covers/4.jpeg" },
    { songName:"Afreen Afreen", filePath:"Songs/5.mp3",coverPath:"Covers/5.jpeg" },
    { songName:"Tere Hawale", filePath:"Songs/6.mp3",coverPath:"Covers/6.jpeg" },
    { songName:"Apna Bana Le", filePath:"Songs/7.mp3",coverPath:"Covers/7.jpeg" },
    { songName:"Sang Rahiyo", filePath:"Songs/8.mp3",coverPath:"Covers/8.jpeg" }
]
songItems.forEach ((element,i) => {
    element.getElementsByTagName("img")[0].src=songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText=songs[i].songName;
})

// audioElement.play();

//handle play/pause click
masterPlay.addEventListener('click',(()=>{
    if(audioElement.paused||audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity=1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');   
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity=0;
    }
}))
//listen to events
audioElement.addEventListener('timeupdate',()=>{
    //update seekbar
    progress=parseInt(audioElement.currentTime/audioElement.duration*100);
    myProgressBar.value=progress;
})

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime=myProgressBar.value*audioElement.duration/100;
})

const makeAllPlays=()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        makeAllPlays();
        masterSongName.innerText=songs[songIndex].songName; 
        songIndex=parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src=`Songs/${songIndex+1}.mp3`;
        audioElement.currentTime=0;
        audioElement.play();
        gif.style.opacity=1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=7){
        songIndex=1
    }
    else{
        songIndex+=1;
    }
    audioElement.src=`Songs/${songIndex+1}.mp3`;
    masterSongName.innerText=songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})
document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0){
        songIndex=1
    }
    else{
        songIndex-=1;
    }
    audioElement.src=`Songs/${songIndex+1}.mp3`;
    masterSongName.innerText=songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})