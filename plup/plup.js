var foo = window.location.search
var foo = new URLSearchParams(foo)
var title = foo.get('title')
document.title = title
var t = document.createElement('h1')
t.innerText = title
document.body.appendChild(t)
var p = document.createElement('p')
p.innerText = foo.get('text')
document.body.appendChild(p)
var s = document.createElement('style')
s.innerHTML = `
    body{
        font-family: sans-serif;
        padding: 30px 15%;
        margin: 0;
        text-align: center
    }
`
document.body.appendChild(s)