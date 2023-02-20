import {nextFrame} from 'utils/dom'
import {animateDuration} from 'utils/dict'

export function scaleIn(el ,cbf){
    var oriCssText = el.style.cssText
    el.style.cssText = oriCssText + `;transform-origin:left top;transform:scale(0);
                        transition:transform var(--xmv-transition-duration)`

    nextFrame(()=>{
        el.style.transform = 'scale(1)'
    })

    return setTimeout(()=>{
        el.style.cssText = oriCssText + `;transform:scale(1);`
        cbf()
    },animateDuration)
}

export function scaleOut(el ,cbf){
    var oriCssText = el.style.cssText

    el.style.cssText = oriCssText + `;transform-origin:left top;transform:scale(0);
                        transition:transform var(--xmv-transition-duration)`

    nextFrame(()=>{
        el.style.transform = 'scale(0)'
    })

    return setTimeout(()=>{
        el.style.cssText = oriCssText + `;transform:scale(0)`
        cbf()

    },animateDuration)
}