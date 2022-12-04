let query = window.location.search
let queryparser = new URLSearchParams(query)

window.alert(queryparser.get('text'))
