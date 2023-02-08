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

// 获取一个隐藏元素的实际高度
export function getHiddenDomHeight(el){

    let oriCssText = el.style.cssText
    el.style.cssText = oriCssText + `;display:block;position:absolute;z-index:-1000`

    let domWidth = el.scrollWidth
    let domHeight = el.scrollHeight

    el.style.cssText = oriCssText

    return {domWidth ,domHeight}
}