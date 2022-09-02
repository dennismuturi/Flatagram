// Flatagram


const title=document.getElementById("card-title");
const image=document.getElementById("card-image");
const likes=document.getElementById("like-count");
const commentList=document.getElementById("comments-list");
const likeButton=document.getElementById("like-button");
const likeCount=document.getElementById("like-count");
const commentForm = document.getElementById("comment-form");

const randomImage = () => {
    fetch("https://dog.ceo/api/breeds/image/random")
    .then(response => response.json())
    .then(randomLink => {
        console.log(image.src)
        image.src=randomLink.message;
    }).catch(() =>{
        alert("Error!!")
    })
}
const toggleImage = (toggleButton) => {
     toggleButton.addEventListener("click", (e) => {
        image.style.visibility ==="visible" ? image.style.visibility="hidden" :
        image.style.visibility="visible";
     })
}

function addComment(){
    commentForm.addEventListener("submit",(e) => {
        e.preventDefault();
        let theComment=e.target.comment.value;
        const li =document.createElement("li");
        li.innerText=theComment;
        commentList.appendChild(li);

        console.log(commentList)
    })
}



function addLike(theLikes){
    likeButton.addEventListener("click",(e) =>{
        likeCount.innerHTML="";
        theLikes++;
        likeCount.innerText = `${theLikes} likes`;
    })
}
function addContent(user){
    title.innerText=user.title;
    image.src=user.image;
    likes.innerText=`${user.likes} likes`;

     addLike(user.likes)

     image.addEventListener("click",(e) => {
        randomImage();
     });
    
    for(comment of user.comments){
        const li=document.createElement("li");
        li.innerText=comment.content
        commentList.appendChild(li);
    }

    addComment();
    
}

document.addEventListener("DOMContentLoaded", (e) => {
    commentList.innerHTML="";
    fetch("http://localhost:3000/images/1")
    .then(response => response.json())
    .then(object => {

        addContent(object);
        toggleImage(title);

        
       
    })
    .catch(() =>{
        alert("error!!")
    })
})
