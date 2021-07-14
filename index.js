/* Lev1:
Erstellt euch mit all euren bisher erlangten Kenntnissen diese Website im Backend mit Hilfe von express/ejs.
Schaut euch das Mockup gut an und erkennt wiederholende Elemente. Für diese könnt ihr eure "partials" erstellen und diese nachher beliebig oft einsetzen.

Lev2:
Benutze "express route parameters" (req.params) um die Daten des ausgewählten Artikels abzugreifen und auf einer einzelnen article Seite näher darzustellen.
Benutze die POST-method um die Daten des Kontaktformulars im backend zuzugreifen.

Lev3:
Generiere mit push() neue articles
 */
const fs = require('fs')
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
app.use(express.static('public'))
const data = require('./public/data/website.json')
console.log(data)

app.set('view engine', "ejs")

app.get('/', (req, res) => {
    res.render('index', { title: "Home" })
})

app.get('/newarticle', (req, res) => {
    res.render('newarticle', { title: "New Article" })
})

app.get('/articledetails', (req, res) => {
    res.render('articledetails', { title: "Article Details" })
})


/* app.get('/users/:user', (req, res) => {
    console.log(req.params.user)
    
    let currentUser = data.filter(ele =>
        ele.id === Number(req.params.user))
    console.log(currentUser.length)
    if (currentUser.length !== 0) {
        res.render('userDetail', { title: "Details", user: currentUser[0] })
    } else {
        res.status(404).render('404', { title: 404 })
    }

}) */


let jsonData = []
console.log(fs.existsSync('./data.json'))
if (!fs.existsSync('./data.json')) {
    fs.writeFile('./data.json', "[]", 'utf8', (err) => {
        if (err) throw err
        console.log("Datei erstellt")
    })
} else {
    fs.readFile('./data.json', 'utf8', (err, data) => {
        if (err) throw err
        jsonData = JSON.parse(data)
        console.log(jsonData)
    })
}




app.post('/add', (req, res) => {
    // Die Daten tauchen nicht in der URL auf, sondern werden als Payload (Nutzlast / Nutzerdaten) übermittelt
    // Wenn wir die Middleware nicht gesetzt haben ist der body undefined
    console.log(req)
    console.log(req.body)
    // res.render('show', { data: req.body })

    jsonData.push({
        message: req.body.myText,
        tel: req.body.myNumber,
        rating: req.body.mySelect
    })
    // jsonData.push(req.body)

    fs.writeFile('./data.json', JSON.stringify(jsonData), 'utf8', (err) => {
        if (err) throw err
    })
    res.redirect('/')
})
// Wir können auch die get /post / ... Methoden auf die selbe URL legen

app.get('/all', (req, res) => {
    res.render('all', { jsonData })
})

app.use((req, res) => {
    res.status(404).render('404', { title: 404 })
})

app.listen(PORT, () => console.log(`http://localhost:${PORT}`))