// import { generate } from './algorithm/algo'
// import getNodeColor1 from './middleware/getNodeColor'
var canvasContainer = document.querySelector('#canvas-container');
var canvas = document.querySelector('#canv');
var sizeHandlers = document.querySelectorAll('.size-handler');
var formHandlers = document.querySelectorAll('.form-handler');
var visualiseBtn = document.querySelector('#btn-run');
var downloadBtn = document.querySelector('#download');
var width = 400;
var height = 400;
canvas.width = width;
canvas.height = height;
var leftHandlerOffset = 0;
var rightHandlerOffset = 0;
var bottomHandlerOffset = 0;
var isMouseDown = false;
var resizeHandlerType = '';
sizeHandlers.forEach(function (handler) {
    var isSide = handler.classList.contains('side');
    if (isSide) {
        var isLeft = handler.classList.contains('left');
        console.log(isLeft);
        if (isLeft) {
            leftHandlerOffset = Math.round(handler.getBoundingClientRect().left);
            handler.addEventListener('mousedown', function (e) {
                isMouseDown = true;
                resizeHandlerType = 'left';
                document.addEventListener('mousemove', function (event) {
                    if (!isMouseDown || resizeHandlerType !== 'left')
                        return;
                    leftHandlerOffset = event.pageX;
                    rightHandlerOffset = window.innerWidth - event.pageX;
                    width = Math.abs(rightHandlerOffset - leftHandlerOffset);
                    canvasContainer.style.width = width + "px";
                    console.log('ooooo');
                    canvas.width = width;
                });
                document.addEventListener('mouseup', function (event) {
                    isMouseDown = false;
                    console.log('object');
                    document.addEventListener('mousemove', function () { return true; });
                });
            });
        }
        else {
            rightHandlerOffset = Math.round(handler.getBoundingClientRect().left);
            handler.addEventListener('mousedown', function (e) {
                isMouseDown = true;
                resizeHandlerType = 'right';
                document.addEventListener('mousemove', function (event) {
                    if (!isMouseDown || resizeHandlerType !== 'right')
                        return;
                    rightHandlerOffset = event.pageX;
                    leftHandlerOffset = window.innerWidth - event.pageX;
                    width = Math.abs(rightHandlerOffset - leftHandlerOffset);
                    console.log('width');
                    canvasContainer.style.width = width + "px";
                    canvas.width = width;
                });
                document.addEventListener('mouseup', function (event) {
                    isMouseDown = false;
                    console.log('object');
                    document.addEventListener('mousemove', function () { return true; });
                });
            });
        }
    }
    else {
        bottomHandlerOffset = Math.round(handler.getBoundingClientRect().top);
        handler.addEventListener('mousedown', function (e) {
            isMouseDown = true;
            resizeHandlerType = 'bottom';
            document.addEventListener('mousemove', function (event) {
                if (!isMouseDown || resizeHandlerType !== 'bottom')
                    return;
                bottomHandlerOffset = event.pageY;
                var elementTopOffset = Math.round(canvasContainer.getBoundingClientRect().top);
                height = Math.abs(bottomHandlerOffset - elementTopOffset);
                canvasContainer.style.height = height + "px";
                canvas.height = height;
            });
            document.addEventListener('mouseup', function (event) {
                isMouseDown = false;
                console.log('object');
                document.addEventListener('mousemove', function () { return true; });
            });
        });
    }
});
formHandlers.forEach(function (handler) {
    handler.value = '400';
    handler.min = '200';
    console.log(handler.value);
    if (handler.name === 'width') {
        handler.max = Math.round(window.innerWidth).toString();
    }
    else {
        handler.max = '900';
    }
    handler.addEventListener('change', function (e) {
        var val = +handler.value;
        console.log(val);
        if (handler.name === 'width') {
            width = val;
            canvasContainer.style.width = val.toString() + 'px';
        }
        else {
            height = val;
            canvasContainer.style.height = val.toString() + 'px';
        }
    });
});
// ---------------
function getNodeColor(num) {
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
var m = 100000, a = 110, cc = 12345, mh = 255, xh = 0;
function getState() {
    var state = Math.round(Math.random() * (m - 1));
    state = (a * state + cc) % m;
    state /= m - 1;
    return state;
}
function generate(h, d) {
    var s = Math.max(d, h) + 1, r = h + 1, g = [];
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
        var ss = 1;
        while (ss * 2 < s)
            ss *= 2;
        s = ss;
        console.log(s);
    }
    return g;
}
// ------------
visualiseBtn.addEventListener('click', function () {
    visualize();
    console.log('object');
});
downloadBtn.addEventListener('click', function () {
    var link = document.createElement('a');
    var imgData = canvas.toDataURL();
    link.download = 'Generated terrain.png';
    link.href = imgData;
    link.click();
});
// visualise 
function visualize() {
    var grid = generate(height, width);
    console.log(grid);
    var ctx = canvas.getContext('2d');
    console.log(width);
    var img = ctx.createImageData(width, height);
    var pxs = img.data;
    var row = height;
    while (row--) {
        var col = width;
        while (col--) {
            var e = Math.round((grid[row][col] - mh) * 1);
            var color = getNodeColor(e);
            var inx = 4;
            while (inx--) {
                pxs[col * 4 + (row * width) * 4 + inx] = inx > 2 ? 255 : color[inx] * 16;
            }
            // console.log(e)
        }
    }
    ctx.putImageData(img, 0, 0);
}
