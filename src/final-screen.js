import * as PIXI from 'pixi.js'

import { showGameScreen } from './game-screen'

export async function showFinalScreen(app) {
  const final_assets = await PIXI.Assets.loadBundle('final-screen')

  const finalScreenBg = new PIXI.Sprite(final_assets.background)
  finalScreenBg.width = app.screen.width
  finalScreenBg.height = app.screen.height
  app.stage.addChild(finalScreenBg)

  const logo = new PIXI.Sprite(final_assets.logo)

  logo.x = app.stage.width * 0.8
  logo.y = app.stage.height * 0.1 - 150
  logo.anchor.set(0.5)
  logo.scale.set(0.5)

  app.stage.addChild(logo)

  app.ticker.add(() => {
    if (logo.y < app.screen.height * 0.1) {
      logo.y += 10
    }
  })

  const candice = new PIXI.Sprite(final_assets.candice)

  candice.x = app.screen.width * 0.3
  candice.y = -300
  candice.anchor.set(0.5)
  candice.scale.set(0.6)

  app.stage.addChild(candice)

  app.ticker.add(() => {
    const timeout = setTimeout(() => {
      if (candice.y < app.screen.height * 0.6) {
        candice.y += 40
      }
    }, 500)

    if (candice.y >= app.screen.height * 0.6) {
      clearTimeout(timeout)
    }
  })

  const table = new PIXI.Sprite(final_assets.table)

  table.x = app.screen.width * 0.5
  table.y = app.screen.height * 0.9 + 150
  table.anchor.set(0.5)

  app.stage.addChild(table)

  app.ticker.add(() => {
    table.y -= 10

    if (table.y < app.screen.height - 55) {
      table.y = app.screen.height - 55
    }
  })

  const blitzy = new PIXI.Sprite(final_assets.blitzy)

  blitzy.x = app.screen.width * 0.7
  blitzy.y = -200
  blitzy.anchor.set(0.5)
  blitzy.scale.set(0.6)

  app.stage.addChild(blitzy)

  app.ticker.add(() => {
    const timeout = setTimeout(() => {
      if (blitzy.y < app.screen.height * 0.7) {
        blitzy.y += 40
      }
    }, 500)

    if (blitzy.y >= app.screen.height * 0.7) {
      clearTimeout(timeout)
    }
  })

  const button = new PIXI.Sprite(final_assets.button)

  button.x = app.screen.width * 0.5
  button.y = 1000
  button.anchor.set(0.5)

  app.stage.addChild(button)

  app.ticker.add(() => {
    const timeout = setTimeout(() => {
      if (button.y > app.screen.height * 0.75) {
        button.y -= 10
      }
    }, 800)

    if (button.y <= app.screen.height * 0.75) {
      clearTimeout(timeout)
    }
  })

  let scale = 0.7
  let targetScale = 0.7
  const scaleSpeed = 0.001

  app.ticker.add(() => {
    if (scale < targetScale) {
      scale += scaleSpeed
      if (scale > targetScale) {
        scale = targetScale
      }
    } else if (scale > targetScale) {
      scale -= scaleSpeed
      if (scale < targetScale) {
        scale = targetScale
      }
    }

    if (scale === targetScale) {
      targetScale = targetScale === 0.7 ? 0.6 : 0.7
    }

    button.scale.set(scale)
  })

  const restart = new PIXI.Sprite(final_assets.restart)

  restart.x = 600
  restart.y = app.screen.height * 0.9
  restart.anchor.set(0.5)
  restart.scale.set(0.8)
  restart.interactive = true
  restart.buttonMode = true
  restart.on('pointerdown', () => {
    app.stage.removeChildren()
    showGameScreen(app)
  })

  app.ticker.add(() => {
    const timeout = setTimeout(() => {
      if (restart.x > app.screen.width * 0.9) {
        restart.x -= 10
      }

      if (restart.x <= app.screen.width * 0.9) {
        clearTimeout(timeout)
      }
    }, 1000)
  })

  app.stage.addChild(restart)
}
