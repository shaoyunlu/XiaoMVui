export function toggleAnimate(){

}

export function expand(el ,expandVal ,cbf){

    var oriCssText = el.style.cssText
    
    el.style.cssText = `display:'';height:0;overflow:hidden;
                        transition:height var(--xmv-transition-duration)`

    setTimeout(()=>{
        el.style.height = expandVal + 'px'
    },0)

    setTimeout(()=>{
        el.style.cssText = oriCssText
        el.style.display = ''
        cbf()
    },300)
}

export function close(el ,expandVal ,cbf){

    var oriCssText = el.style.cssText

    el.style.cssText = `height:${expandVal}px;overflow:hidden;transition:height var(--xmv-transition-duration)`

    setTimeout(()=>{
        el.style.height = '0'
    },0)

    setTimeout(()=>{
        el.style.cssText = oriCssText
        cbf()
    },300)
}