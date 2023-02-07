export function toggle(domEl){
    if (domEl.style.display == 'none'){
        domEl.style.display = ''
    }else{
        domEl.style.display = 'none'
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