<template lang="pug">
html
  body
    v-app(light)
      v-toolbar(fixed)
        v-toolbar-title DungeonGO! 順番デッキ
        v-toolbar-items
          v-btn(flat,@click="clear") リセット
      main
        v-container(v-if="deck.length === 0")
          h6 勇者を選択して下さい
          v-form
            v-switch.py-1(
              color="primary"
              v-for="hero in heroes"
              :label="hero.name"
              v-model="hero.selected"
            )
            v-btn.primary(@click="init") ゲーム開始

        v-container(v-else)
          carousel(
            :paginationEnabled="false",
            :navigationEnabled="true",
            :navigationClickTargetSize="24"
          )
            slide(v-for="card in deck",:style="{ backgroundColor: card.bgColor }")
              p {{ card.name }}

</template>

<script>

// import { Carousel, Slide } from 'vue-carousel'

export default {
  data () {
    return {
      heroes: [
        { name: '勇者ブルー', bgColor: '#0074bf', key: 'blue', selected: true },
        { name: '勇者レッド', bgColor: '#c93a40', key: 'red', selected: true },
        { name: '勇者グリーン', bgColor: '#56a764', key: 'green', selected: true },
        { name: '勇者イエロー', bgColor: '#f2cf01', key: 'yellow', selected: true },
        { name: '勇者ホワイト', bgColor: '#fff', key: 'white', selected: true },
        { name: '勇者ブラック', bgColor: '#222', key: 'black', selected: true }
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
