// import { generate } from './algorithm/algo'
// import getNodeColor from './middleware/getNodeColor'

let canvasContainer: HTMLDivElement = document.querySelector('#canvas-container');
let canvas: HTMLCanvasElement = document.querySelector('#canv');
let sizeHandlers: NodeList = document.querySelectorAll('.size-handler');
let formHandlers: NodeList = document.querySelectorAll('.form-handler');
let visualiseBtn: HTMLButtonElement = document.querySelector('#btn-run');

let width: number = 400;
let height: number = 400;

canvas.width = width;
canvas.height = height;

let leftHandlerOffset: number = 0;
let rightHandlerOffset: number = 0;
let bottomHandlerOffset: number = 0;

let isMouseDown: boolean = false;
let resizeHandlerType: string = '';

sizeHandlers.forEach((handler: HTMLDivElement) => {
    let isSide: boolean = handler.classList.contains('side');

    if (isSide) {
        let isLeft: boolean = handler.classList.contains('left');
        console.log(isLeft)

        if (isLeft) {
            leftHandlerOffset = Math.round(handler.getBoundingClientRect().left);

            handler.addEventListener('mousedown', (e: Event) => {
                isMouseDown = true;
                resizeHandlerType = 'left';

                document.addEventListener('mousemove', (event: MouseEvent) => {
                    if (!isMouseDown || resizeHandlerType !== 'left') 
                        return;
                    leftHandlerOffset = event.pageX;
                    rightHandlerOffset = window.innerWidth - event.pageX;
                    width = Math.abs(rightHandlerOffset - leftHandlerOffset);
                    canvasContainer.style.width = `${ width }px`;
                    console.log('ooooo')
                    canvas.width = width;
                })

                document.addEventListener('mouseup', (event: Event) => {
                    isMouseDown = false;
                    console.log('object')
    
                    document.addEventListener('mousemove', () => true)
                }) 
            })
        } else {
            rightHandlerOffset = Math.round(handler.getBoundingClientRect().left);

            handler.addEventListener('mousedown', (e: Event) => {
                isMouseDown = true;
                resizeHandlerType = 'right';

                document.addEventListener('mousemove', (event: MouseEvent) => {
                    if (!isMouseDown  || resizeHandlerType !== 'right') 
                        return;
                    rightHandlerOffset = event.pageX;
                    leftHandlerOffset = window.innerWidth - event.pageX;
                    width = Math.abs(rightHandlerOffset - leftHandlerOffset);
                    console.log('width')
                    canvasContainer.style.width = `${ width }px`;
                    canvas.width = width;
                })
    
                document.addEventListener('mouseup', (event: Event) => {
                    isMouseDown = false;
                    console.log('object')
    
                    document.addEventListener('mousemove', () => true)
                }) 
            })
        }
    } else {
        bottomHandlerOffset = Math.round(handler.getBoundingClientRect().top);

        handler.addEventListener('mousedown', (e: Event) => {
            isMouseDown = true;
            resizeHandlerType = 'bottom';

            document.addEventListener('mousemove', (event: MouseEvent) => {
                if (!isMouseDown  || resizeHandlerType !== 'bottom') 
                    return;
                bottomHandlerOffset = event.pageY;
                let elementTopOffset = Math.round(canvasContainer.getBoundingClientRect().top);
                height = Math.abs(bottomHandlerOffset - elementTopOffset);
                canvasContainer.style.height = `${ height }px`;
                canvas.height = height;
            })

            document.addEventListener('mouseup', (event: Event) => {
                isMouseDown = false;
                console.log('object')

                document.addEventListener('mousemove', () => true)
            }) 
        })
    }
})

formHandlers.forEach((handler: HTMLInputElement) => {
    handler.value = '400';
    handler.min = '200';
    console.log(handler.value)
    if (handler.name === 'width') {
        handler.max = Math.round(window.innerWidth).toString();
    } else {
        handler.max = '900';
    }

    handler.addEventListener('change', (e: Event) => {
        let val: number = +handler.value;
        console.log(val)

        if (handler.name === 'width') {
            width = val;
            canvasContainer.style.width = val.toString() + 'px';
        } else {
            height = val;
            canvasContainer.style.height = val.toString() + 'px';
        }
    })
})

// ---------------
function getNodeColor(num: number): [number, number, number] {
    if (num < 140)
        return [0, 0, 12];
    if (num < 150)
        return [6, 6, 16];
    if (num < 160)
        return [12, 11, 9];
    if (num < 190)
        return [8, 14, 8];
    if (num < 210)
        return [6, 16, 6];
    if (num < 230)
        return [4, 14, 4];
    if (num < 250)
        return [9, 11, 6];
    if (num < 290)
        return [7, 10, 5];
    if (num < 340)
        return [5, 8, 3];
    if (num < 380)
        return [4, 7, 2];
    if (num < 410)
        return [4, 5, 2];
    
    return [3, 4, 2];
}
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
    let s: number = Math.max(d, h) + 1,
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
            yn: number = Math.round((y0 + y1) / 2);

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
        let ss: number = 1;
        while (ss * 2 < s) 
            ss *= 2;
        s = ss;
        console.log(s)
    }

    return g;
}
// ------------

visualiseBtn.addEventListener('click', (): void => {
    visualize();
    console.log('object')
});

// visualise 

function visualize(): void {
    let grid = generate(height, width);
    console.log(grid)
    let ctx = canvas.getContext('2d');
    console.log(width)

    let img: ImageData = ctx.createImageData(width, height);

    let pxs: Uint8ClampedArray = img.data;    
    let row: number = height;

    while (row--) {
        let col: number = width;
        while (col--) {
            let e: number = Math.round((grid[row][col] - mh) * 1);
            let color: [number, number, number] = getNodeColor(e);
            let inx: number = 4;
            while (inx--) {
                pxs[col * 4 + (row * width) * 4 + inx] = inx > 2 ? 255 : color[inx] * 16;
            }
            // console.log(e)
        }
    }

    ctx.putImageData(img, 0, 0);
}
