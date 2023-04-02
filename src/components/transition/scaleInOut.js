import {nextFrame} from 'utils/dom'
import {animateDuration} from 'utils/dict'

export function scaleIn(el ,cbf){
    // 如果当前的scale为1的话，直接退出
    if (el.style.opacity == '1'){
        cbf()
        return false
    }
    var oriCssText = el.style.cssText
    el.style.cssText = oriCssText + `;transform-origin:left top;transform:scale(0);opacity:0;
                        transition:transform var(--xmv-transition-duration) ,opacity var(--xmv-transition-duration)`

    nextFrame(()=>{
        el.style.opacity = 1
        el.style.transform = 'scale(1)'
    })

    return setTimeout(()=>{
        el.style.cssText = oriCssText + `;transform:scale(1);opacity:1;`
        cbf()
    },animateDuration)
}

export function scaleOut(el ,cbf){
    var oriCssText = el.style.cssText

    el.style.cssText = oriCssText + `;transform-origin:left top;transform:scale(0);opacity:1;
                    transition:transform var(--xmv-transition-duration) ,opacity var(--xmv-transition-duration)`

    nextFrame(()=>{
        el.style.transform = 'scale(0)'
        el.style.opacity = 0
    })

    return setTimeout(()=>{
        el.style.cssText = oriCssText + `;transform:scale(0);opacity:0`
        cbf()

    },animateDuration)
}