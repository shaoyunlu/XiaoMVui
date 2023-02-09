const animateDuration = 300
var expandWidth = 0


export function collapseAnimate(el ,cbf){
    expandWidth = el.scrollWidth
    var oriCssText = el.style.cssText
    el.style.cssText =  oriCssText + `;display:block;width:${expandWidth}px;overflow:hidden;
                        transition:width var(--xmv-transition-duration);`

    setTimeout(()=>{
        el.style.width = 'calc(var(--xmv-menu-icon-width) + var(--xmv-menu-base-level-padding) * 2)'
    },0)

    setTimeout(()=>{
        el.style.cssText = oriCssText
        cbf()
    },animateDuration)
}

export function expandAnimate(el ,cbf){
    var oriCssText = el.style.cssText
    el.style.cssText =  oriCssText + `;display:block;
                        width:calc(var(--xmv-menu-icon-width) + var(--xmv-menu-base-level-padding) * 2);
                        overflow:hidden;
                        transition:width var(--xmv-transition-duration);`

    setTimeout(()=>{
        el.style.width = expandWidth + 'px'
    },0)

    setTimeout(()=>{
        el.style.cssText = oriCssText
        cbf()
    },animateDuration)
}