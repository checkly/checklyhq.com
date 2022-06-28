const { chromium } = require('playwright')

;(async () => {
  const browser = await chromium.launch()
  const page = await browser.newPage()
  await page.goto('https://danube-webshop.herokuapp.com')

  const paintTimingJson = await page.evaluate(() =>
    JSON.stringify(window.performance.getEntriesByType('paint'))
  )
  const paintTiming = JSON.parse(paintTimingJson)

  console.log(paintTiming)

  await browser.close()
})()
