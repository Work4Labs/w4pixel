!function(r){function t(){var t;try{t=r.sessionStorage.getItem("work4_prefix_params")||"{}"}catch(r){t=w4tr.work4_prefix_params||"{}"}return JSON.parse(t)}function e(e){var o=t();for(key in e)o[key]=e[key];try{r.sessionStorage.setItem("work4_prefix_params",JSON.stringify(o))}catch(r){w4tr.work4_prefix_params=JSON.stringify(o)}}function o(r,o,n){n=n.toString(),e({url:location.toString().replace(location.search,"")}),params=t();var i={id:r,name:o,ref:n,params:params};fetch("//tracking-service.work4labs.com/event",{method:"POST",body:JSON.stringify(i),headers:{"Content-Type":"application/json"}}).then(r=>{console.log("Request complete! response:",JSON.stringify(i))}).catch(r=>{console.error("error posting event:",i)})}!function(r){if(!r.w4tr){r.w4tr={},w4tr.track=function(r,t,e){setTimeout(o(r,t,e),0)};var t=location.search.slice(1).split("&"),n={};t.forEach(function(r){""!=(r=r.split("="))&&(n[r[0]]=decodeURIComponent(r[1]||""))}),e(n)}}(r)}(window);