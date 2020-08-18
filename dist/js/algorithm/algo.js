// Constants 
var m = 100000, a = 110, cc = 12345, mh = 255, xh = 0;
function getState() {
    var state = Math.round(Math.random() * (m - 1));
    state = (a * state + cc) % m;
    state /= m - 1;
    return state;
}
function generate(h, d) {
    var s = d, r = h + 1, g = [];
    function getHeight(z0, z1, dl) {
        var fc = dl * getState() - dl / 2;
        // console.log(n())
        var e = (z0 + z1) / 2 + fc;
        if (mh > e)
            mh = e;
        if (xh < e)
            xh = e;
        // console.log(z0, z1, dl)
        return e;
    }
    function subdivide(x0, y0, x1, y1) {
        var xn = Math.round((x0 + x1) / 2), yn = Math.round((y0 + y1) / 2);
        g[xn][y0] = getHeight(g[x0][y0], g[x1][y0], x1 - x0);
        g[x0][yn] = getHeight(g[x0][y0], g[x0][y1], y1 - y0);
        g[x1][yn] = getHeight(g[x1][y0], g[x1][y1], y1 - y0);
        g[xn][y1] = getHeight(g[x0][y1], g[x1][y1], x1 - x0);
        g[xn][yn] = getHeight(g[x0][yn], g[x1][yn], x1 - x0);
    }
    while (r--) {
        g.push([]);
        for (var i = 0; i < d; i++)
            g[g.length - 1].push(0);
    }
    while (s > 1) {
        for (var x = 0; x + s < h; x += s)
            for (var y = 0; y + s < d; y += s)
                subdivide(x, y, x + s, y + s);
    }
    return g;
}
export { generate };
