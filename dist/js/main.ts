let canvasContainer: HTMLCanvasElement = document.querySelector('#canvas-container');
let sizeHandlers: NodeList = document.querySelectorAll('.size-handler');
let formHandlers: NodeList = document.querySelectorAll('.form-handler');

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
