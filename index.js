const fs = require('fs')
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3001
app.use(express.static('public'))
const data = require('./website.json')
//console.log(data)

app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.set('view engine', "ejs")

app.get('/', (req, res) => {
    res.render('index', { title: "Home", data: data })
})

app.get('/newarticle', (req, res) => {
    res.render('newarticle', { title: "New Article", data: data.slice(-6) })
})

app.get('/articledetails', (req, res) => {
    res.render('articledetails', { title: "Article Details", data: data})
})


app.get('/articledetails/:detail', (req, res) => {
    console.log(req.params.detail)
    
    let currentDetail = data.filter(ele =>
        ele.id === Number(req.params.detail))
    console.log(currentDetail.length)
    if (currentDetail.length !== 0) {
        res.render('articledetails', { title: "Details", detail: currentDetail[0] , data: data.slice(-6)})
    } else {
        res.status(404).render('404', { title: 404 })
    }
})

app.post('/newarticle', (req, res) => {
    //console.log(req)
    console.log(req.body)
    data.push({
        id: data.length,
        url: req.body.urlPic,
        title: req.body.title,
        body: req.body.article,
        published_at: "?",
        duration: 4,
        author: req.body.author,
        author_bild: req.body.authorPic,
    })

    fs.writeFile('./website.json', JSON.stringify(data), 'utf8', (err) => {
        if (err) throw err
    })
    res.redirect('/')
})


app.use((req, res) => {
    res.status(404).render('404', { title: 404 })
})

app.listen(PORT, () => console.log(`http://localhost:${PORT}`))