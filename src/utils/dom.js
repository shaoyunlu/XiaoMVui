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
export function getPagePosition(el ,type ,faceEl){
    let boundCr = el.getBoundingClientRect()
    let docScrollLeft = document.documentElement.scrollLeft
    let docScrollTop = document.documentElement.scrollTop
    let gutter = 5
    let offsetTop = boundCr.top + docScrollTop
    let offsetLeft = boundCr.left + docScrollLeft

    let elWidth = el.offsetWidth
    let elHeight = el.offsetHeight

    let faceElWidth = faceEl.offsetWidth
    let faceElHeight = faceEl.offsetHeight

    let screenWidth = document.documentElement.offsetWidth
    let screenHeight = document.documentElement.offsetHeight

    if (type == 'top' && boundCr.top < faceElHeight){
        type = 'bottom'
    }else if (type == 'bottom' && (screenHeight - boundCr.bottom) < faceElHeight){
        type = 'top'
    }else if (type == 'left' && boundCr.left < faceElWidth){
        type = 'right'
    }else if (type == 'right' && (screenWidth - boundCr.right) < faceElWidth){
        type = 'left'
    }

    switch (type) {

        case 'left':
            return {left : offsetLeft - gutter - faceElWidth ,top : offsetTop}

        case 'right':
            return {left : offsetLeft  + gutter +  elWidth ,top : offsetTop}

        case 'top':
            return {left : offsetLeft ,top : offsetTop - gutter - faceElHeight}

        case 'bottom':
            return {left : offsetLeft ,top : offsetTop + gutter + elHeight}

        case 'center':
            return {left : offsetLeft ,top:offsetTop}
    
        default:
            return {left : offsetLeft ,top : offsetTop}
    }
}

// 元素一，元素二居中对齐
export function getAlignPosition(el1 ,el2){
    let el1osw = el1.offsetWidth
    let el1osh = el1.offsetHeight

    let el2osw = el2.offsetWidth
    let el2osh = el2.offsetHeight

    return {offsetLeft : (el1osw - el2osw)/2,
            offsetTop :(el1osh - el2osh)/2}
}

export function nextFrame (fn) {
    requestAnimationFrame(function () {
        requestAnimationFrame(fn);
  });
}

// 获取dom矩阵
export function getDomMartix(el){
    let transform = el.style.transform
    if (!transform){
        return [1,0,0,1,0,0]
    }
    let martixStr = transform.substring(7 ,transform.length-1)
    return martixStr.split(",")
}

export function setDomMartix(el ,martix){
    el.style.transform = `matrix(${martix[0]}, ${martix[1]}, ${martix[2]}, ${martix[3]}, ${martix[4]}, ${martix[5]})`
}