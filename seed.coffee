firebase = require "firebase"

config =
  apiKey: "AIzaSyArjuH0N-SAIwgd8DzZN7dvTxsrPIoiQVo"
  authDomain: "myfirstfirebase-230fb.firebaseapp.com"
  databaseURL: "https://myfirstfirebase-230fb.firebaseio.com"
  projectId: "myfirstfirebase-230fb"
  storageBucket: "myfirstfirebase-230fb.appspot.com"
  messagingSenderId: "147999552069"

firebase.initializeApp(config)

db = firebase.database()

heroesDB = db.ref("/heroes")

heroes = [
  name: '勇者ブルー'
  color: 'blue'
,
  name: '勇者レッド'
  color: 'red'
,
  name: '勇者グリーン'
  color: 'green'
,
  name: '勇者イエロー'
  color: 'yellow'
,
  name: '勇者ホワイト'
  color: 'white'
,
  name: '勇者ブラック'
  color: 'grey'
]

heroesDB.set null

for hero in heroes
  db.ref("heroes/#{hero.color}").set(hero)

heroesDB.once("value").then (snapshot) ->
  for hero in snapshot.val()
    console.log hero.color