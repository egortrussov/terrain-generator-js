let canvasContainer: HTMLCanvasElement = document.querySelector('#canvas-container');
let sizeHandlers: NodeList = document.querySelectorAll('.size-handler');

let width: number = canvasContainer.width;
let height: number = canvasContainer.height;

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
    }
})