const { chromium } = require('playwright')

;(async () => {
  const browser = await chromium.launch()
  const page = await browser.newPage()
  await page.goto('https://danube-web.shop/')
  const url = await page.$eval('a', (el) => el.href)
  console.log(url)
  await browser.close()
})()
