import {nextFrame} from 'utils/dom'

const animateDuration = 300

export function expand(el ,expandVal ,cbf){

    var oriCssText = el.style.cssText
    el.style.cssText =  oriCssText + `;display:block;height:0;overflow:hidden;
                        transition:height var(--xmv-transition-duration);`

    nextFrame(()=>{
        el.style.height = expandVal + 'px'
    })

    setTimeout(()=>{
        el.style.cssText = oriCssText
        el.style.display = ''
        cbf()
    },animateDuration)
}

export function close(el ,expandVal ,cbf){

    var oriCssText = el.style.cssText
    el.style.cssText = oriCssText + `;height:${expandVal}px;overflow:hidden;transition:height var(--xmv-transition-duration)`

    nextFrame(()=>{
        el.style.height = '0'
    })

    setTimeout(()=>{
        el.style.cssText = oriCssText
        cbf()
    },animateDuration)
}