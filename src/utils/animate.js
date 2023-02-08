
const animateDuration = 300

export function toggleAnimate(){

}

export function expand(el ,expandVal ,cbf){

    var oriCssText = el.style.cssText
    el.style.cssText =  oriCssText + `;display:block;height:0;overflow:hidden;
                        transition:height var(--xmv-transition-duration);`

    setTimeout(()=>{
        el.style.height = expandVal + 'px'
    },0)

    setTimeout(()=>{
        el.style.cssText = oriCssText
        el.style.display = ''
        cbf()
    },animateDuration)
}

export function close(el ,expandVal ,cbf){

    var oriCssText = el.style.cssText
    el.style.cssText = oriCssText + `;height:${expandVal}px;overflow:hidden;transition:height var(--xmv-transition-duration)`

    setTimeout(()=>{
        el.style.height = '0'
    },0)

    setTimeout(()=>{
        el.style.cssText = oriCssText
        cbf()
    },animateDuration)
}