(function (window) {

    function getParams() {
        var paramsStr
        try {
            paramsStr = window.sessionStorage.getItem("work4_prefix_params") || "{}";
        } catch (error) {
            paramsStr = w4tr.work4_prefix_params || "{}";
        }
        return JSON.parse(paramsStr)
    }
    function upsertParams(newParams) {
        var params = getParams();
        for (key in newParams) {
            params[key] = newParams[key];
        }
        try {
            window.sessionStorage.setItem("work4_prefix_params", JSON.stringify(params));
        } catch (error) {
            w4tr.work4_prefix_params = JSON.stringify(params);
        }
    }
    function do_track(eventId, eventName, ref) {
        ref = ref.toString();
        upsertParams({
            "url": location.toString().replace(location.search, ""),
        });
        params = getParams();

        var event = {
            'id': eventId,
            'name': eventName,
            'ref': ref,
            'params': params,
        }
        fetch("//tracking-service.work4labs.com/event", {
            method: "POST",
            body: JSON.stringify(event),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => {
            console.log("Request complete! response:", JSON.stringify(event));
        }).catch(err => {
            console.error("error posting event:", event);
        }
        );
    }
    function init(window) {
        if (window.w4tr) { return }
        window.w4tr = {}
        w4tr.track = function (eventName, ref, eventId="") {
            setTimeout(do_track(eventId, eventName, ref), 0)
        }
        var pairs = location.search.slice(1).split('&');

        var params = {}
        pairs.forEach(function (pair) {
            pair = pair.split('=');
            if (pair != "") {
                params[pair[0]] = decodeURIComponent(pair[1] || '');
            }
        });
        upsertParams(params);
    }

    init(window)
    return;
}(window));
