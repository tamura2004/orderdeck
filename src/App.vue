<template lang="pug">
v-app(light)
  v-toolbar(fixed)
    v-toolbar-title {{deck.length === 0 ? "DungeonGO!" : "ラウンド" + count}}
    v-toolbar-items
      v-btn(flat @click="clear") リセット

  main
    v-container(v-if="deck.length === 0")

      h6 勇者を選択して下さい
      v-form
        v-switch.py-1(
          v-for="hero in heroes"
          :key="hero.name"
          color="primary"
          :label="hero.name"
          v-model="hero.selected"
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
            @click="inc(i)"
          )
            p.text-xs-center.py-5 {{card.name}}

</template>

<script lang="coffee">
import { mapGetters } from 'vuex'

export default
  data: ->
    king:
      name: '王様'
      color: 'purple'
    monster:
      name: 'モンスター'
      color: 'black'
    deck: []

  computed:
    mapGetters(['heroes', 'count'])

  methods:
    init: ->
      card = (hero for hero in @heroes when hero.selected)
      num = if card.length >= 4 then 2 else 1
      for i in [1..num]
        card.push(@king)
        card.push(@monster)

      deck = []
      key = 0
      for i in [1..40]
        deck.push({ name: '第' + i + 'ラウンド', color: 'orange' })
        deck = deck.concat(_.shuffle(card))
      deck.push({ name: 'タイムオーバー', bgColor: '#000' })
      @deck = deck

    clear: -> @deck = []

    inc: (i) ->
      if i is @count
        if @count > 0
          @$store.commit('inc')
        else
          alert("これより前のカードはありません")
      else
        @$store.commit('dec')

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
