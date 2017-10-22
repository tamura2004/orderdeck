<template lang="pug">
v-app(light)
  v-toolbar(fixed absolute=true)
    v-toolbar-title DungeonGO!
      v-btn(flat v-if="round > 0") Round {{round}}
    v-toolbar-items
      v-btn(flat @click="clear") リセット

  main
    v-container(v-if="deck === null || deck.length === 0")

      h4 カードを選択して下さい
      v-form
        v-layout(row wrap)
          v-flex(xs6 v-for="col in [0,-1]")
            v-switch.py-0(
              v-for="card in cards"
              v-if="card.name.indexOf('勇者') === col"
              :key="card.name"
              color="primary"
              :label="card.name"
              v-model="card.selected"
            )
        v-btn.primary(@click="makeDeck") ゲーム開始

    v-container(v-else,fluid)
      transition-group(tag="v-layout",name="flip-list",row,wrap,appear)
        v-flex.list-item(
          xs6
          v-for="(card,i) in deck"
          v-if="count <= i && i <= count + 1"
          :key="i"
        )
          v-card.darken-1(
            :class="card.color"
            @click="handleClick(i)"
          )
            p.text-xs-center.py-5 {{card.name}}

</template>

<script lang="coffee">
import { mapState } from 'vuex'
import cards from 'components/cards.coffee'

card.selected = true for card in cards

export default
  data: ->
    cards: cards

  computed:
    mapState(['count','deck','round'])

  methods:
    makeDeck: ->
      @$store.dispatch('setDeck', @newDeck())
      @$store.dispatch('setCount', 0)
      @$store.dispatch('setRound', @round + 1)

    newDeck: ->
      deck = (card for card in @cards when card.selected)
      deck = _.shuffle(deck)
      deck.unshift
        name: "開始"
        color: 'indigo'
      deck.unshift
        name: "第#{@round + 1}ラウンド"
        color: 'indigo'
      deck.push
        name: "第#{@round + 1}ラウンド"
        color: 'indigo'
      deck.push
        name: "終了"
        color: 'indigo'
      deck

    clear: ->
      @$store.dispatch("setCount", 0)
      @$store.dispatch("setRound", 0)
      @$store.dispatch("setDeck", null)

    handleClick: (i) ->
      if i is @count
        if @count > 0
          @$store.dispatch('setCount', @count - 1)
        else
          alert("これより前のカードはありません")
      else
        if i is @deck.length - 1
          @makeDeck()
        else
          @$store.dispatch('setCount', @count + 1)

</script>

<style lang="stylus">

#container
  padding 0 60px

#app
  font-family "游ゴシック" YuGothic "ヒラギノ角ゴ Pro" "Hiragino Kaku Gothic Pro" "メイリオ" "Meiryo" sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale

p
  user-select none
  font-size 2rem
  margin-bottom 4px
  font-weight bold
  color white
  text-shadow:
    black 1px 0px 0px,
    black 0px 1px 0px,
    black -1px 0px 0px,
    black 0px -1px 0px;

.list-item
  transition all 1s
  display inline-block
  margin-right 10px

.flip-list-enter, .flip-list-leave-to
  opacity 0

.flip-list-leave-active
  position absolute

.flip-list-move
  transition transform 0.5s
</style>
