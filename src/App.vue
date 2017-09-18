<template lang="pug">
#app
  link(
    href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css",
    rel="stylesheet",
    integrity="sha384-/Y6pD6FV/Vv2HJnA6t+vslU6fwYXjCFtcEpHbNJ0lyAFsXTsjBbfaDjzALeQsN6M",
    crossorigin="anonymous"
  )

  carousel(
    navigationClickTargetSize=48,
    navigationEnabled=true
  )
    slide(v-for="card in deck",:style="{ backgroundColor: card.bgColor }")
      p {{ card.name }}

</template>

<script>

import { Carousel, Slide } from 'vue-carousel'

let HEROES = [
  { name: '勇者ブルー', bgColor: '#69f', key: 'blue' },
  { name: '勇者レッド', bgColor: '#f99', key: 'red' },
  { name: '勇者グリーン', bgColor: '#9f9', key: 'green' },
  { name: '勇者イエロー', bgColor: '#ff9', key: 'yellow' },
  { name: '勇者ホワイト', bgColor: '#bbb', key: 'white' },
  { name: '勇者ブラック', bgColor: '#222', key: 'black' }
]

let KING = [
  { name: '王様', bgColor: '#c6f', key: 'king1' },
  { name: '王様', bgColor: '#c6f', key: 'king2' }
]

let MONSTER = [
  { name: 'モンスター', bgColor: '#000', key: 'monster1' },
  { name: 'モンスター', bgColor: '#000', key: 'monster2' }
]

export default {
  name: 'app',
  components: {
    Carousel,
    Slide
  },
  data () {
    var cards = this._.concat(HEROES, KING, MONSTER)
    var deck = []

    for (var i = 1; i < 20; i++) {
      deck.push({ name: '第' + i + 'ラウンド', bgColor: '#fff' })
      deck = this._.concat(deck, this._.shuffle(cards))
    }

    return {
      count: 0,
      deck: deck,
      styleObject: {
        backgroundColor: '#fff'
      }
    }
  },
  methods: {
    inc () {
      this.count += 1
      this.styleObject.backgroundColor = this.deck[this.count].bgColor
    }
  }
}
</script>

<style lang="stylus">

#app
  font-family "游ゴシック", YuGothic, "ヒラギノ角ゴ Pro", "Hiragino Kaku Gothic Pro", "メイリオ", "Meiryo", sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale

p
  font-size 4rem
  margin-bottom 4px
  font-weight bold
  color white
  text-shadow:
    black 1px 0px 0px,
    black 0px 1px 0px,
    black -1px 0px 0px,
    black 0px -1px 0px;

.box
  width 400px
  height 400px

.slide-leave-active
  transition all 5s ease

.slide-enter-active
  transition all 5s ease

.slide-enter
  opacity 0
  transform scaleX(0,1)

.slide-leave-to
  transform scaleX(0,1)
  opacity 0

.VueCarousel-slide
  position relative
  background #42b983
  color #000
  font-family Arial
  font-size 24px
  text-align center
  min-height 400px

</style>
