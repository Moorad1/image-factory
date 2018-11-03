var btn = document.getElementById('searchBtn');
var input = document.getElementById('searchInput');
var URL = 'http://localhost:4000/search';
var links; 
btn.addEventListener('click', () => {
    fetch(URL, {
        method:'POST',
        body:JSON.stringify({value:input.value}),
        headers: {
            'content-type':'application/json'
        }
    }).then(res => res.json())
    .then(json => {
        links = json;
        ShowImage()
    });
});

function ShowImage() {
    mainContent = document.getElementsByClassName('main-content')[0]
    for (var i = 0;i < links.length;i++) {
        img = document.createElement('img')
        img.src = links[i]
        mainContent.appendChild(img)
    }
    links = ''; 
}