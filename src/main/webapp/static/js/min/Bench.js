var Bench=function(){var b={};return{instrumented:function(){return _.keys(b)},average:function(a){a=Bench.trail(a);return _.reduce(a,function(a,b){return a+b[1]},0)/a.length},trail:function(a){return b[a]},track:function(a,d){return function(){a in b||(b[a]=[]);var c=Date.now(),e=d();b[a].push([c,Date.now()-c]);return e}}}}();
