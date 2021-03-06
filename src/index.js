/*
 * LightningChartJS example that showcases a simulation of daily temperature variations.
 */
// Import LightningChartJS
const lcjs = require('@arction/lcjs')

// Extract required parts from LightningChartJS.
const {
    lightningChart,
    AxisTickStrategies,
    SolidFill,
    SolidLine,
    ColorRGBA,
    ColorHEX,
    LegendBoxBuilders,
    UIOrigins,
    emptyLine,
    Themes,
    LinearGradientFill
} = lcjs

// Decide on an origin for DateTime axis.
const dateOrigin = new Date(2019, 3, 1)

// Create a XY Chart.
const chart = lightningChart().ChartXY({
    // theme: Themes.dark
})
chart.getDefaultAxisX().setTickStrategy(AxisTickStrategies.DateTime, (tickStrategy) => tickStrategy.setDateOrigin(dateOrigin))
chart.setTitle('Daily temperature range, April 2019')

const axisX = chart.getDefaultAxisX()
const axisY = chart.getDefaultAxisY()
    .setTitle('Temperature (°C)')
    .setScrollStrategy(undefined)

// Daily temperature records
const recordRange = chart.addAreaRangeSeries()
// Current month daily temperature variations
const currentRange = chart.addAreaRangeSeries()
// ----- Series stylings
// Temperature records fill style, gradient Red - Blue scale. 
const recordRangeFillStyle = new LinearGradientFill(
    {
        angle: 0,
        stops:[
             {color: ColorHEX('#0000FF9F'), offset:0},
             {color: ColorHEX('#FF00009F'), offset:1}
         ]
    }
)
// Record range stroke fill style, high line
const recordRangeStrokeFillStyleHigh = new SolidLine().setFillStyle(new SolidFill({ color: ColorRGBA(250, 91, 70) }))
// Record range stroke fill style, low line
const recordRangeStrokeFillStyleLow = new SolidLine().setFillStyle(new SolidFill({ color: ColorRGBA(63, 138, 250) }))
// Current month temperature fill style
const currentRangeFillStyle = new SolidFill({ color: ColorRGBA(255, 174, 0, 200) })
// Current range stroke fill style
const currentRangeStrokeFillStyle = new SolidLine().setFillStyle(new SolidFill({ color: ColorRGBA(250, 226, 105) }))
// ----- Applying stylings
// Record range
recordRange
    .setName('Temperature records range')
    .setHighFillStyle(recordRangeFillStyle)
    // Same fill style for the highlighted series
    .setHighFillStyleHighlight(recordRangeFillStyle)
    .setHighStrokeStyle(recordRangeStrokeFillStyleHigh)
    .setHighStrokeStyleHighlight(recordRangeStrokeFillStyleHigh)
    .setLowStrokeStyle(recordRangeStrokeFillStyleLow)
    .setLowStrokeStyleHighlight(recordRangeStrokeFillStyleLow)
// Current range
currentRange
    .setName('2019 temperatures')
    .setHighFillStyle(currentRangeFillStyle)
    .setHighStrokeStyle(currentRangeStrokeFillStyle)
    .setLowStrokeStyle(currentRangeStrokeFillStyle)

// ----- Result tables settings
// Record range
recordRange.setResultTableFormatter((builder, series, figure, yMax, yMin) => {
    return builder
        .addRow('Temperature records range')
        .addRow('Date: ' + axisX.formatValue(figure))
        .addRow('Highest: ' + yMax.toFixed(2) + ' °C')
        .addRow('Lowest: ' + yMin.toFixed(2) + ' °C')
})
// Current range
currentRange.setResultTableFormatter((builder, series, figure, yMax, yMin) => {
    return builder
        .addRow('2019 temperatures')
        .addRow('Date: ' + axisX.formatValue(figure))
        .addRow('Highest: ' + yMax.toFixed(2) + ' °C')
        .addRow('Lowest: ' + yMin.toFixed(2) + ' °C')
})
// ----- Generating data
const randomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min
}
const currentRangeData = []
const recordRangeData = []
// Current range
for (let i = 0; i < 31; i++) {
    const randomPoint = () => {
        const x = i
        let yMax
        if (i > 0) {
            const previousYMax = currentRangeData[i - 1].yMax
            yMax = randomInt(previousYMax - 5, previousYMax + 5)
        } else {
            yMax = randomInt(-5, 25)
        }
        const yMin = randomInt(yMax - 5, yMax) - 5
        return {
            x,
            yMax,
            yMin
        }
    }
    currentRangeData.push(randomPoint())
}

let recordYMax = currentRangeData[0].yMax
let recordYMin = currentRangeData[0].yMin
for (let i = 1; i < currentRangeData.length; i++) {
    if (currentRangeData[i].yMin < recordYMin) recordYMin = currentRangeData[i].yMin
    if (currentRangeData[i].yMax > recordYMax) recordYMax = currentRangeData[i].yMax
}
// Set series interval
axisY.setInterval(recordYMin - 5, recordYMax + 5)
// ----- Generate record temperatures
for (let i = 0; i < 31; i++) {
    const randomPoint = () => {
        const x = i
        const yMax = randomInt(recordYMax - 2, recordYMax + 2)
        const yMin = randomInt(recordYMin - 1, recordYMin)
        return {
            x,
            yMax,
            yMin
        }
    }
    recordRangeData.push(randomPoint())
}
// ----- Adding data points
recordRangeData.forEach((point, i) => {
    recordRange.add({ position: (point.x * 24 * 60 * 60 * 1000), high: point.yMax, low: point.yMin })
})

currentRangeData.forEach((point, i) => {
    currentRange.add({ position: (point.x * 24 * 60 * 60 * 1000), high: point.yMax, low: point.yMin })
})
// ----- Add legend box
const legendBox = chart.addLegendBox(LegendBoxBuilders.HorizontalLegendBox, {
    x: axisX.scale,
    y: axisY.scale
})
    .setPosition({ x: currentRange.getXMax() / 2, y: axisY.scale.getInnerStart() })
    .setOrigin(UIOrigins.CenterBottom)
    .setMargin(3)

const entries = legendBox.add(chart)
entries[0]
    .setButtonOnFillStyle(recordRangeFillStyle)
    .setButtonOnStrokeStyle(emptyLine)
entries[1]
    .setButtonOnFillStyle(currentRangeFillStyle)
    .setButtonOnStrokeStyle(emptyLine)
