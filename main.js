$(document).ready(function () {
    for (let i = 0; i < 200; i++) {
        $('<div></div>').addClass('image').css({
            width: '100px',
            height: '60px',
            transform: `rotateY(${i * 20}deg) translateY(${i * (120 / 18)}px) translateZ(310px)`
        }).click(function () {
            originalPosition.y = -i * 120 / 18
            originalRotation.y = -i * 20
            $('#gallery').css({ transition: 'all .8s ease', transform: getGalleryPos() })
            $('#viewport').css('transform', getViewportPos())
        }).appendTo('#gallery')
    }
})

let isMouseDown = false;
let originalPosition = { x: 0, y: 0 };
let originalRotation = { x: 0, y: 0, z: 0 };
let originalScale = 1.0;

function getGalleryPos() {
    return `translateY(${originalPosition.y}px) rotateY(${originalRotation.y}deg)`
}

function getViewportPos() {
    return `rotateX(-10deg) translateY(-60px) scaleX(${originalScale}) scaleY(${originalScale})`
}

$(window).on({
    mousedown: function (e) {
        isMouseDown = true
        originalPosition.x = e.screenX
        e.preventDefault()
    },
    mouseup: function (e) {
        isMouseDown = false;
        e.preventDefault()
    },
    mousemove: function (e) {
        if (!isMouseDown) return
        const dist = e.screenX - originalPosition.x;
        const ratio = 3
        originalRotation.y += dist / ratio
        originalPosition.y += dist / ratio / 3

        $('#gallery').css({ transition: 'none', transform: getGalleryPos() })
        $('#viewport').css('transform', getViewportPos())
        originalPosition.x = e.screenX
        e.preventDefault()
    },
    mousewheel: function (e) {
        const newScale = originalScale + e.originalEvent.wheelDeltaY / 2000
        if (newScale <= .5) return
        originalScale = newScale
        $('#gallery').css({ transition: 'all .8s ease', transform: getGalleryPos() })
        $('#viewport').css('transform', getViewportPos())
        e.preventDefault()
    }
})