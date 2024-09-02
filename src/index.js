import * as PIXI from 'pixi.js'

import { showGameScreen } from './game-screen'

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
        { alias: 'blitzy', src: 'assets/default_screen/blitzy.png' },
        { alias: 'hint', src: 'assets/default_screen/hint.png' },
        { alias: 'hand', src: 'assets/default_screen/hand.png' },
        { alias: 'hand2', src: 'assets/default_screen/hand_2.png' },
      ],
    },
    {
      name: 'final-screen',
      assets: [
        {
          alias: 'background',
          src: 'assets/final_screen/final_screen_bg.png',
        },
        {
          alias: 'logo',
          src: 'assets/final_screen/BingoBlitzLogoBig.png',
        },
        {
          alias: 'blitzy',
          src: 'assets/final_screen/Blitzy.png',
        },
        {
          alias: 'button',
          src: 'assets/final_screen/button.png',
        },
        {
          alias: 'candice',
          src: 'assets/final_screen/Candice.png',
        },
        {
          alias: 'restart',
          src: 'assets/final_screen/restart.png',
        },
        {
          alias: 'table',
          src: 'assets/final_screen/table.png',
        },
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

  showGameScreen(app)
}

startApp()
