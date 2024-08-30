// @ts-ignore
import * as PIXI from 'pixi.js'

import './index.css'

const manifestExample = {
  bundles: [
    {
      name: 'game-screen',
      assets: [
        { alias: 'background', src: 'assets/default_screen/Kitchen.png' },
        { alias: 'banana', src: 'assets/default_screen/banana.png' },
        { alias: 'failStamp', src: 'assets/default_screen/failStamp.png' },
        { alias: 'winStamp', src: 'assets/default_screen/winStamp.png' },
        { alias: 'Logo', src: 'assets/default_screen/LOGO_BB.png' },
        { alias: 'maindish', src: 'assets/default_screen/maindish.png' },
        { alias: 'win1', src: 'assets/default_screen/win1.png' },
        { alias: 'win2', src: 'assets/default_screen/win2.png' },
        { alias: 'plate', src: 'assets/default_screen/plate.png' },
      ],
    },
  ],
}

const startApp = async () => {
  const app = new PIXI.Application()

  await app.init({
    resizeTo: window,
    backgroundColor: 0x1099bb,
  })

  document.body.appendChild(app.canvas)

  PIXI.Assets.init({ manifest: manifestExample })
  const assets = await PIXI.Assets.loadBundle('game-screen')

  const background = new PIXI.Sprite(assets.background)
  background.width = app.screen.width
  background.height = app.screen.height
  app.stage.addChild(background)

  const clochesPositions = [
    { x: app.screen.width * 0.25, y: app.screen.height * 0.4 },
    { x: app.screen.width * 0.5, y: app.screen.height * 0.55 },
    { x: app.screen.width * 0.75, y: app.screen.height * 0.4 },
  ]

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
    }
    return array
  }

  const prizes = [
    { sprite: assets.win1, isWin: true },
    { sprite: assets.win2, isWin: true, y: 20 },
    { sprite: assets.banana, isWin: false },
  ]

  const randomPrizes = shuffle(prizes)

  function onClocheClick(index) {
    const cloche = app.stage.children.find(
      (child) =>
        child.texture === assets.maindish &&
        child.x === clochesPositions[index].x &&
        child.y === clochesPositions[index].y
    )

    if (!cloche) return

    const clocheY = cloche.y
    const clocheLift = setInterval(() => {
      // Lift cloche to the top, than to the left

      cloche.y -= 2 // Lift up
      cloche.x -= 1.2 // Move to the left
      cloche.rotation -= 0.02 // Rotate to the left

      if (cloche.y <= clocheY - 70) {
        clearInterval(clocheLift)

        // Display win/fail
        setTimeout(() => {
          const result = randomPrizes[index].isWin ? 'winStamp' : 'failStamp'
          const stamp = new PIXI.Sprite(assets[result])
          stamp.x = app.screen.width * 0.5
          stamp.y = app.screen.height * 0.2
          stamp.anchor.set(0.5)
          stamp.scale.set(0.5)
          app.stage.addChild(stamp)
        }, 500)
      }
    }, 10)
  }

  clochesPositions.forEach((position, index) => {
    const plate = new PIXI.Sprite(assets.plate)
    plate.x = position.x
    plate.y = position.y + 30
    plate.anchor.set(0.5)
    plate.scale.set(0.5)
    app.stage.addChild(plate)

    const prize = new PIXI.Sprite(randomPrizes[index].sprite)
    prize.x = position.x
    prize.y = position.y + (randomPrizes[index].y || 0)
    prize.anchor.set(0.5)
    prize.scale.set(0.5)
    app.stage.addChild(prize)

    const cloche = new PIXI.Sprite(assets.maindish)
    cloche.x = position.x
    cloche.y = position.y
    cloche.anchor.set(0.5)
    cloche.scale.set(0.5)
    cloche.interactive = true
    cloche.buttonMode = true
    cloche.on('pointerdown', () => onClocheClick(index))
    app.stage.addChild(cloche)
  })
}

startApp()
