// function init() {
    let h = 1000, d = s = 600, c = document.querySelector('#canv');
    let t = c.getContext('2d')
    let g = [], r = Math.max(d, h) + 1, mh = 255, xh = 0;
    let m = 100000, a = 110, cc = 12345;

    s = Math.max(d, h) + 1;
    r = h + 1;

    function n(cj) {
        let state = Math.round(Math.random() * (m - 1));
        state = (a * state + cc) % m;
        // if (cj) console.log(state)
        

        state /= (m - 1);
        return state;
    }

    console.log(n(true))

    while (r--) {
        g.push([]);
        let sd = d + 1;
        while (sd--) {
            g[g.length - 1].push(0);
        }
    }

    while (s > 1) {
        for (let x = 0; x + s < h; x += s) 
            for (let y = 0; y + s < d; y += s)  
                subdivide(x, y, x + s, y + s);
        let ss = 1;
        while (ss * 2 < s) 
            ss *= 2;
        s = ss;
        console.log(s)
    }

    // console.log(g[700][900])

    let l = 255 / (xh - mh);

    function getHeight(z0, z1, dl) {
        let fc = dl * n() - dl / 2;
        // console.log(n())
        let e = (z0 + z1) / 2 + fc;
        if (mh > e) mh = e;
        if (xh < e) xh = e;
        // console.log(z0, z1, dl)
        return e;
    }

    function subdivide(x0, y0, x1, y1) {
        let xn = Math.round((x0 + x1) / 2), yn = Math.round((y0 + y1) / 2);
        // console.log(x1)
        g[xn][y0] = getHeight(g[x0][y0], g[x1][y0], x1 - x0);
        g[x0][yn] = getHeight(g[x0][y0], g[x0][y1], y1 - y0);
        g[x1][yn] = getHeight(g[x1][y0], g[x1][y1], y1 - y0);
        g[xn][y1] = getHeight(g[x0][y1], g[x1][y1], x1 - x0);
        // g[x0][yn] = getHeight(g[x0][y0], g[x1][y1], y1 - y0);

        g[xn][yn] = getHeight(g[x0][yn], g[x1][yn], x1 - x0);

    }

    c.width = d;
    c.height = h;

    let img = t.createImageData? t.createImageData(d, h) : t.createImageData(0, 0, d, w);

    let px = img.data;
    let x = h;

    console.log(g, mh)

    while (x--) {
        let y = d;
        while (y--) {
            let e = Math.round((g[x][y] - mh) * 1);
            let cl = e < 140 ? [0,0,12] : e < 150 ? [6, 6, 16] : e < 160 ? [12, 11, 9] : e < 190 ? [8, 14, 8] : e < 210 ? [6, 16, 6] : e < 230 ? [4, 14, 4] : e < 250 ? [9, 11, 6] : e < 290 ? [7, 10, 5] : e < 340 ? [5, 8, 3]  : e < 380 ? [4, 7, 2] : e < 410 ? [4, 5, 2] : [3, 4, 2];
            let i = 4;
            while (i--) {
                px[y * 4 + (x * d) * 4 + i] = i > 2 ? 255 : cl[i] * 16;
            }
        }
    }

    // img.data = px;

    t.putImageData(img, 0, 0)
// }

// init();