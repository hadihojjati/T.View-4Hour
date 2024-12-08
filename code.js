//@version=5
indicator("4-Hour Breakout Detector (Closed Candle)", overlay=true)

// Input Resistance Level
resistanceLevel = input.float(0.6761, title="Resistance Level", step=10)

// Check for Timeframe and Close Price (Only on Closed Candles)
closeAboveResistance = close > resistanceLevel and barstate.isconfirmed

// Track Consecutive Candles Above Resistance
var int breakoutCount = 0
if closeAboveResistance
    breakoutCount += 1
else
    breakoutCount := 0

// Breakout Condition: Two Consecutive Closed Candles
breakoutConfirmed = breakoutCount >= 2

// Plot Resistance Level
hline(resistanceLevel, "Resistance", color=color.red, linestyle=hline.style_dotted)

// Trigger Alert After Candle Closes
if breakoutConfirmed
    alert("Breakout Confirmed: Price has closed above resistance level for 2 consecutive 4-hour candles.", alert.freq_once_per_bar)
