// 元素隐藏或显示
export function toggle(el){
    if (el.style.display == 'none'){
        el.style.display = ''
    }else{
        el.style.display = 'none'
    }
}

// 是否含有某种样式
export function hasClass(el ,className){
    return el.className.indexOf(className) >= 0
}

// 添加class
export function addClass(el ,className){
    if (el.className.indexOf(className) < 0)
        el.className += (" " + className)
}

// 删除class
export function removeClass(el ,className){
    el.className = el.className.replace(className,"").trim()
}

// 获取一个隐藏元素的实际宽高
export function getHiddenDomWH(el){
    let oriCssText = el.style.cssText
    el.style.cssText = oriCssText + `;display:block;position:absolute;z-index:-1000`

    let domWidth = el.scrollWidth
    let domHeight = el.scrollHeight

    el.style.cssText = oriCssText

    return {domWidth ,domHeight}
}

// 获取元素位置
export function getPagePosition(el ,type){
    let boundCr = el.getBoundingClientRect()
    let docScrollLeft = document.documentElement.scrollLeft
    let docScrollTop = document.documentElement.scrollTop
    let gutter = 5
    let offsetWidth = el.offsetWidth
    let offsetHeight = el.offsetHeight
    let offsetTop = boundCr.top + docScrollTop
    let offsetLeft = boundCr.left + docScrollLeft

    switch (type) {

        case 'left':
            return {left : offsetLeft - offsetWidth - gutter ,top : offsetTop}
            break;

        case 'right':
            return {left : offsetLeft + offsetWidth + gutter ,top : offsetTop}
            break;

        case 'top':
            return {left : offsetLeft ,top : offsetTop - offsetHeight - gutter}
            break;

        case 'bottom':
            return {left : offsetLeft ,top : offsetTop + offsetHeight + gutter}
            break;
    
        default:
            return {left : offsetLeft ,top : offsetTop}
            break;
    }

    

}

export function nextFrame (fn) {
    requestAnimationFrame(function () {
        requestAnimationFrame(fn);
  });
}