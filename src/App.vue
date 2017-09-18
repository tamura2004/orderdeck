<template lang="pug">
#app
  link(
    href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css",
    rel="stylesheet",
    integrity="sha384-/Y6pD6FV/Vv2HJnA6t+vslU6fwYXjCFtcEpHbNJ0lyAFsXTsjBbfaDjzALeQsN6M",
    crossorigin="anonymous"
  )

  nav.navbar.navbar-expand-lg.navbar-light.bg-light
    a.text-dark.navbar-brand(href="#") DungeonGO! 順番デッキ
    ul.text-dark.navbar-nav.mr-auto
      li.nav-item
        a.nav-link.text-dark(href="#", @click="clear") リセット

  .container(v-if="deck.length === 0")
    h4 勇者を選択して下さい
    form(@submit.prevent="init")
      .form-check(v-for="hero in heroes")
        label.form-check-label
          input.form-check-input(type="checkbox",v-model="hero.selected")
          | {{ hero.name }}
      button.btn.btn-primary(type="submit") ゲーム開始

  #container(v-else)
    carousel(
      :paginationEnabled="false",
      :navigationEnabled="true",
      :navigationClickTargetSize="24"
    )
      slide(v-for="card in deck",:style="{ backgroundColor: card.bgColor }")
        p {{ card.name }}

</template>

<script>

import { Carousel, Slide } from 'vue-carousel'

export default {
  name: 'app',
  components: {
    Carousel,
    Slide
  },
  data () {
    return {
      heroes: [
        { name: '勇者ブルー', bgColor: '#0074bf', key: 'blue', selected: false },
        { name: '勇者レッド', bgColor: '#c93a40', key: 'red', selected: false },
        { name: '勇者グリーン', bgColor: '#56a764', key: 'green', selected: false },
        { name: '勇者イエロー', bgColor: '#f2cf01', key: 'yellow', selected: false },
        { name: '勇者ホワイト', bgColor: '#fff', key: 'white', selected: false },
        { name: '勇者ブラック', bgColor: '#222', key: 'black', selected: false }
      ],
      king: { name: '王様', bgColor: '#9460a0', key: 'king' },
      monster: { name: 'モンスター', bgColor: '#000', key: 'monster' },
      deck: []
    }
  },
  methods: {
    init () {
      let card = []

      for (let hero of this.heroes) {
        if (hero.selected) {
          card.push(hero)
        }
      }

      let numOfHeroes = card.length

      card.push(this.king)
      card.push(this.monster)

      if (numOfHeroes >= 4) {
        card.push(this.king)
        card.push(this.monster)
      }

      let deck = []

      for (var i = 1; i < 40; i++) {
        deck.push({ name: '第' + i + 'ラウンド', bgColor: '#d16b16' })
        deck = deck.concat(this._.shuffle(card))
      }
      deck.push({ name: 'タイムオーバー', bgColor: '#000' })

      this.deck = deck
    },
    clear () {
      this.deck = []
    }
  }
}
</script>

<style lang="stylus">

#container
  padding 0 60px

#app
  font-family "游ゴシック", YuGothic, "ヒラギノ角ゴ Pro", "Hiragino Kaku Gothic Pro", "メイリオ", "Meiryo", sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale

p
  font-size 3rem
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
  padding-top 2rem
  position relative
  background #42b983
  color #000
  font-family Arial
  font-size 24px
  text-align center
  min-height 300px

</style>
