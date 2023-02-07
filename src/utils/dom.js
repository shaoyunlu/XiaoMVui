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
    let oriDispaly = el.style.display
    let oriPosition = el.style.position
    let oriZIndex = el.style['z-index']

    el.style.display = 'block'
    el.style.position = 'absolute'
    el.style['z-index'] = '-1000'

    let domHeight = el.scrollHeight

    el.style.display = oriDispaly
    el.style.position = oriPosition
    el.style['z-index'] = oriZIndex

    return domHeight
}