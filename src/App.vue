<template lang="pug">
v-app(light)
  v-toolbar(fixed)
    v-toolbar-title DungeonGO! 順番デッキ
    v-toolbar-items
      v-btn(flat @click="clear") リセット
  main
    v-btn(color="primary",@click="add") add
    v-btn(color="error",@click="remove") remove
    v-btn(color="error",@click="shuffle") shuffle

    transition-group(name="flip-list",tag="p")
      span(v-for="item in items",:key="item",class="list-item") {{item}}

    v-container(v-if="deck.length === 0")
      //- h6 {{ JSON.stringify(heroes)}}
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

    v-container(v-else)
      v-layout(row wrap)
        v-flex(xs6)
          v-card(
            :style="{backgroundColor: deck[count].bgColor}"
            @click="dec"
          )
            p {{deck[count].name}}

        v-flex(xs6)
          v-card(
            :style="{backgroundColor: deck[count+1].bgColor}"
            @click="inc"
          )
            p {{deck[count+1].name}}



</template>

<script lang="coffee">
export default
  data: ->
    items: [1,2]
    headNum: 1
    tailNum: 2
    nextNum: 10
    count: 0
    heroes: [
      name: '勇者ブルー'
      bgColor: '#0074bf'
      selected: true
    ,
      name: '勇者レッド'
      bgColor: '#c93a40'
      selected: true
    ,
      name: '勇者グリーン'
      bgColor: '#56a764'
      selected: true
    ,
      name: '勇者イエロー'
      bgColor: '#f2cf01'
      selected: true
    ,
      name: '勇者ホワイト'
      bgColor: '#fff'
      selected: true
    ,
      name: '勇者ブラック'
      bgColor: '#222'
      selected: true
    ]
    king:
      name: '王様'
      bgColor: '#9460a0'
    monster:
      name: 'モンスター'
      bgColor: '#000'
    deck: []

  methods:
    randomIndex: -> Math.floor(Math.random() * @items.length)

    add: ->
      @items.push(++@tailNum)
      @items.shift()

    remove: ->
      @items.unshift(--@headNum)
      @items.pop()

    shuffle: -> @items = _.shuffle(@items)
    init: ->
      card = (hero for hero in @heroes when hero.selected)
      num = if card.length >= 4 then 2 else 1
      for i in [1..num]
        card.push(@king)
        card.push(@monster)

      deck = []
      key = 0
      for i in [1..40]
        deck.push({ name: '第' + i + 'ラウンド', bgColor: '#d16b16' })
        deck = deck.concat(_.shuffle(card))
      deck.push({ name: 'タイムオーバー', bgColor: '#000' })
      @deck = deck

    clear: -> @deck = []
    inc: -> @count++
    dec: -> @count-- if @count > 0

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

.list-item
  transition all 1s
  display inline-block
  margin-right 10px

.flip-list-enter, .flip-list-leave-to
  opacity 0
  
.flip-list-leave-active
  position absolute

.flip-list-move
  transition transform 1s
</style>
