import * as PIXI from 'pixi.js'

import { showFinalScreen } from './final-screen'

export async function showGameScreen(app) {
  const game_assets = await PIXI.Assets.loadBundle('game-screen')

  const background = new PIXI.Sprite(game_assets.background)

  background.width = app.screen.width
  background.height = app.screen.height

  app.stage.addChild(background)

  const clochesPositions = [
    { x: app.screen.width * 0.25, y: app.screen.height * 0.4 },
    { x: app.screen.width * 0.75, y: app.screen.height * 0.4 },
    { x: app.screen.width * 0.5, y: app.screen.height * 0.55 },
  ]

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
    }
    return array
  }

  const prizes = [
    { sprite: game_assets.win1, isWin: true },
    { sprite: game_assets.win2, isWin: true, y: 20 },
    { sprite: game_assets.banana, isWin: false },
  ]

  const randomPrizes = shuffle(prizes)

  function onClocheClick(index) {
    const cloche = app.stage.children.find(
      (child) =>
        child.texture === game_assets.maindish &&
        child.x === clochesPositions[index].x &&
        child.y === clochesPositions[index].y
    )

    if (!cloche) return

    const clocheY = cloche.y
    const clocheLift = setInterval(() => {
      cloche.y -= 2
      cloche.x -= 1.2
      cloche.rotation -= 0.02

      if (cloche.y <= clocheY - 70) {
        clearInterval(clocheLift)

        setTimeout(() => {
          const result = randomPrizes[index].isWin ? 'winStamp' : 'failStamp'
          const stamp = new PIXI.Sprite(game_assets[result])
          stamp.x = app.screen.width * 0.5
          stamp.y = app.screen.height * 0.4
          stamp.anchor.set(0.5)
          stamp.scale.set(0.6)
          app.stage.addChild(stamp)

          setTimeout(() => {
            app.stage.removeChildren()
            showFinalScreen(app)
          }, 500)
        }, 500)
      }
    }, 10)
  }

  clochesPositions.forEach((position, index) => {
    const plate = new PIXI.Sprite(game_assets.plate)
    plate.x = position.x
    plate.y = position.y + 30
    plate.anchor.set(0.5)
    plate.scale.set(0.55)
    app.stage.addChild(plate)

    const prize = new PIXI.Sprite(randomPrizes[index].sprite)
    prize.x = position.x
    prize.y = position.y + (randomPrizes[index].y || 0)
    prize.anchor.set(0.5)
    prize.scale.set(0.55)
    app.stage.addChild(prize)

    const cloche = new PIXI.Sprite(game_assets.maindish)
    cloche.x = position.x
    cloche.y = position.y
    cloche.anchor.set(0.5)
    cloche.scale.set(0.55)
    cloche.interactive = true
    cloche.buttonMode = true
    cloche.on('pointerdown', () => onClocheClick(index))
    app.stage.addChild(cloche)
  })

  const logo = new PIXI.Sprite(game_assets.Logo)

  logo.x = app.screen.width * 0.5
  logo.y = app.screen.height * 0.1
  logo.anchor.set(0.5)
  logo.scale.set(0.8)

  app.stage.addChild(logo)

  const items = [
    { sprite: new PIXI.Sprite(game_assets.hand2), x: 60, y: 80 },
    { sprite: new PIXI.Sprite(game_assets.hand), x: 100, y: 90 },
    { sprite: new PIXI.Sprite(game_assets.hint), x: 25 },
    { sprite: new PIXI.Sprite(game_assets.blitzy), x: 150, y: 30 },
  ]

  const blitzyContainer = new PIXI.Container()

  items.forEach((item) => {
    item.sprite.x = item.x || 0
    item.sprite.y = item.y || 0
    item.sprite.anchor.set(0.5)
    item.sprite.scale.set(0.6)
    blitzyContainer.addChild(item.sprite)
  })

  blitzyContainer.x = app.screen.width * 0.4
  blitzyContainer.y = app.screen.height

  app.ticker.add(() => {
    if (blitzyContainer.y > app.screen.height - 130) {
      blitzyContainer.y -= 10
    }
  })

  app.stage.addChild(blitzyContainer)
}
