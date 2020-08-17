// Constants 

let m: number = 100000,
    a: number = 110,
    cc: number = 12345,
    mh: number = 255,
    xh: number = 0;

function getState(): number {
    let state: number = Math.round(Math.random() * (m - 1));
    state = (a * state + cc) % m;
    state /= m - 1;

    return state;
}
 
function generate(
    h: number,
    d: number
): Array < Array <number> > {
    let s: number = d,
        r: number = h + 1,
        g: Array < Array <number> > = [];
    function getHeight(z0: number, z1: number, dl: number): number {
        let fc: number = dl * getState() - dl / 2;
        // console.log(n())
        let e: number = (z0 + z1) / 2 + fc;
        if (mh > e) mh = e;
        if (xh < e) xh = e;
        // console.log(z0, z1, dl)
        return e;
    }
    
    function subdivide(x0: number, y0: number, x1: number, y1: number) {
        let xn: number = Math.round((x0 + x1) / 2), 
            yn = Math.round((y0 + y1) / 2);

        g[xn][y0] = getHeight(g[x0][y0], g[x1][y0], x1 - x0);
        g[x0][yn] = getHeight(g[x0][y0], g[x0][y1], y1 - y0);
        g[x1][yn] = getHeight(g[x1][y0], g[x1][y1], y1 - y0);
        g[xn][y1] = getHeight(g[x0][y1], g[x1][y1], x1 - x0);

        g[xn][yn] = getHeight(g[x0][yn], g[x1][yn], x1 - x0);

    }
    
    while (r--) {
        g.push([]);
        for (let i: number = 0; i < d; i++) 
            g[g.length- 1].push(0);
    }

    while (s > 1) {
        for (let x = 0; x + s < h; x += s) 
            for (let y = 0; y + s < d; y += s)  
                subdivide(x, y, x + s, y + s); 
    }

    return []
}