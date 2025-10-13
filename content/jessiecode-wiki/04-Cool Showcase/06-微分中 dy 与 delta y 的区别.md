---
created_at: 2025-10-13T13:33:37
updated_at: 2025-10-13T18:41:27
---

不断缩小 $dx$ 滑块，并按住 `shift` 用鼠标滚轮放大，观察 $\Delta y$ 与 $\Delta x$ 的比例，以及 $\Delta y - dy$ 与 $\Delta x$ 的比例。

```jessiecode
---
boundingBox: [0,1,1,0]
---
F = function(x){return x**2;};
f = functiongraph(F)<<strokeWidth:2>>;
P = glider(0.4,0.16,f);
tanL = tangent(P);

dx = slider([0.1,0.9],[0.3,0.9], [0,0.2,0.5]);

ppx = function() {return P.X()+dx.Value();};
ppy = function() {return F(ppx());};
invisible = <<visible: false>>;
xisdx = line(
	function(){return [ppx(), 0];}, 
	function(){return [ppx(), ppy()];}
)invisible;
yisy = line(
	function(){return [P.X(), P.Y()];},
	function(){return [ppx(), P.Y()];}
)invisible;

largeFont = <<fontSize:18>>;
deltaP = point(ppx,ppy)<<name:'$\\Delta y$', label:largeFont>>;
dyP = intersection(xisdx, tanL) <<name:'$dy$', label:largeFont>>;
dxP = point(ppx, P.Y())<<withLabel:false>>;

dxL = segment(dxP, P)<<name:'$dx = \\Delta x$', withLabel: true, label: largeFont>>;
delyL = segment(dxP, deltaP)<<color: 'blue'>>;
dyL = segment(dxP, dyP)<<dash:3, color: 'cyan'>>;
text(0.1,0.8,function(){return "$\\frac{\\Delta y - dy}{\\Delta x} = $"+((delyL.L()-dyL.L())/(dxL.L())).toFixed(2);})largeFont;
```


可以观察到，无论怎么缩小，  $dy$ 与 $dx$ 的比例都保持不变。而 $\Delta y$ 与 $dy$ 会相对变得越来越接近。 $\Delta y$ 与 $\Delta x$ 会越来越接近 $dy$ 与 $dx$ 的比例。