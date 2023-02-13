(self.webpackChunk=self.webpackChunk||[]).push([[143],{138:(e,t,o)=>{const a=o(475),{lightningChart:r,AxisTickStrategies:s,SolidFill:l,SolidLine:i,ColorRGBA:n,ColorHEX:d,LegendBoxBuilders:y,LinearGradientFill:g,Themes:h}=a,w=new Date(2019,3,1),x=r().ChartXY({});x.getDefaultAxisX().setTickStrategy(s.DateTime,(e=>e.setDateOrigin(w))),x.setTitle("Daily temperature range, April 2019");const u=x.getDefaultAxisX(),c=x.getDefaultAxisY().setTitle("Temperature (°C)").setScrollStrategy(void 0),S=x.addAreaRangeSeries(),f=x.addAreaRangeSeries(),F=new g({angle:0,stops:[{color:d("#0000FF9F"),offset:0},{color:d("#FF00009F"),offset:1}]}),p=(new i).setFillStyle(new l({color:n(250,91,70)})),m=(new i).setFillStyle(new l({color:n(63,138,250)})),M=new l({color:n(255,174,0,200)}),C=(new i).setFillStyle(new l({color:n(250,226,105)}));S.setName("Temperature records range").setHighFillStyle(F).setHighStrokeStyle(p).setLowStrokeStyle(m),f.setName("2019 temperatures").setHighFillStyle(M).setHighStrokeStyle(C).setLowStrokeStyle(C),S.setCursorResultTableFormatter(((e,t,o,a,r)=>e.addRow("Temperature records range").addRow("Date: "+u.formatValue(o)).addRow("Highest: "+a.toFixed(2)+" °C").addRow("Lowest: "+r.toFixed(2)+" °C"))),f.setCursorResultTableFormatter(((e,t,o,a,r)=>e.addRow("2019 temperatures").addRow("Date: "+u.formatValue(o)).addRow("Highest: "+a.toFixed(2)+" °C").addRow("Lowest: "+r.toFixed(2)+" °C")));const R=(e,t)=>Math.floor(Math.random()*(t-e+1))+e,A=[],T=[];for(let e=0;e<31;e++){const t=()=>{const t=e;let o;if(e>0){const t=A[e-1].yMax;o=R(t-5,t+5)}else o=R(-5,25);return{x:t,yMax:o,yMin:R(o-5,o)-5}};A.push(t())}let k=A[0].yMax,D=A[0].yMin;for(let e=1;e<A.length;e++)A[e].yMin<D&&(D=A[e].yMin),A[e].yMax>k&&(k=A[e].yMax);c.setInterval({start:D-5,end:k+5,stopAxisAfter:!1});for(let e=0;e<31;e++){const t=()=>({x:e,yMax:R(k-2,k+2),yMin:R(D-1,D)});T.push(t())}T.forEach(((e,t)=>{S.add({position:24*e.x*60*60*1e3,high:e.yMax,low:e.yMin})})),A.forEach(((e,t)=>{f.add({position:24*e.x*60*60*1e3,high:e.yMax,low:e.yMin})})),x.addLegendBox(y.HorizontalLegendBox).setAutoDispose({type:"max-width",maxWidth:.8}).add(x)}},e=>{e.O(0,[736],(()=>(138,e(e.s=138)))),e.O()}]);