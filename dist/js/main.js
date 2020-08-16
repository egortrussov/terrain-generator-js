var canvasContainer = document.querySelector('#canvas-container');
var sizeHandlers = document.querySelectorAll('.size-handler');
var width = canvasContainer.width;
var height = canvasContainer.height;
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
    }
});
