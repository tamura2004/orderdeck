<template lang="pug">
v-app(light)
  v-toolbar(fixed)
    v-toolbar-title {{deck.length === 0 ? "DungeonGO!" : "ラウンド" + round}}
    v-toolbar-items
      v-btn(flat @click="clear") リセット

  main
    v-container(v-if="deck.length === 0")

      h6 勇者を選択して下さい
      v-form
        v-switch.py-1(
          v-for="card in cards"
          :key="card.name"
          color="primary"
          :label="card.name"
          v-model="card.selected"
        )
        v-btn.primary(@click="init") ゲーム開始

    v-container(v-else,fluid)
      transition-group(tag="v-layout",name="flip-list",row,wrap,appear)
        v-flex.list-item(
          xs6
          v-for="(card,i) in deck"
          v-if="count <= i && i <= count + 1"
          :key="i"
        )
          v-card.darken-4(
            :class="card.color"
            @click="handleClick(i)"
          )
            p.text-xs-center.py-5 {{card.name}}

</template>

<script lang="coffee">
import { mapState } from 'vuex'
import cards from 'components/cards.coffee'

card.selected = false for card in cards

export default
  data: ->
    cards: cards

  created: ->
    @$store.dispatch('initDeck')
    @$store.dispatch('initRound')
    @$store.dispatch('initCount')

  computed:
    mapState(['deck', 'round', 'count'])

  methods:
    init: ->
      @$store.dispatch('setDeck', @newDeck())

    newDeck: ->
      @$store.dispatch('incRound')
      deck = (card for card in @cards when card.selected)
      deck = _.shuffle(deck)
      deck.unshift(@roundCard())
      deck

    clear: ->
      @$store.dispatch('initDeck')
      @$store.dispatch('initRound')
      @$store.dispatch('initCount')

    roundCard: ->
      name: "第#{@round}ラウンド"
      color: 'orange'

    handleClick: (i) ->
      if i is @count
        if @count > 0
          @$store.dispatch('decCount')
        else
          alert("これより前のカードはありません")
      else
        if i is @deck.length - 1
          @$store.dispatch('concatDeck', @newDeck())
          @$store.dispatch('incCount')
        else
          @$store.dispatch('incCount')

</script>

<style lang="stylus">

#container
  padding 0 60px

#app
  font-family "游ゴシック" YuGothic "ヒラギノ角ゴ Pro" "Hiragino Kaku Gothic Pro" "メイリオ" "Meiryo" sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale

p
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
