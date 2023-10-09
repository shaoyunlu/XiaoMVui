import {addStyle} from 'utils/dom'

export default {
    mounted(el, binding){
        const container = document.createElement('div')
        container.className = 'xmv-loading-mask'
        const bgcolor = el.getAttribute('xmv-loading-background')
        if (bgcolor){
            addStyle(container,'background-color' ,bgcolor)
        }

        const spinner = document.createElement('div')
        spinner.className = 'xmv-loading-spinner'
        container.appendChild(spinner)

        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('class' ,'circular')
        if (el.getAttribute('xmv-loading-svg-view-box')){
            svg.setAttribute('viewBox' ,el.getAttribute('xmv-loading-svg-view-box'))
        }else{
            svg.setAttribute('viewBox' ,'0 0 50 50')
        }
        

        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('class', 'path');
        circle.setAttribute('cx', '25');
        circle.setAttribute('cy', '25');
        circle.setAttribute('r', '20');
        circle.setAttribute('fill', 'none');

        const svgContent = el.getAttribute('xmv-loading-svg')
        if (svgContent){
            svg.innerHTML = svgContent
        }else{
            svg.appendChild(circle)
        }
        spinner.appendChild(svg)

        let loadingText = el.getAttribute('xmv-loading-text')
        if (loadingText){
            const loadingTextEl = document.createElement('p')
            loadingTextEl.className = 'xmv-loading-text'
            loadingTextEl.innerHTML = loadingText
            spinner.appendChild(loadingTextEl)
        }

        el.appendChild(container)

        el._loadingContainer = container

        if (binding.value){
            el._loadingContainer.style.display = 'block'
        }else{
            el._loadingContainer.style.display = 'none'
        }
    },
    updated(el, binding) {
        if (binding.value){
            el._loadingContainer.style.display = 'block'
        }else{
            el._loadingContainer.style.display = 'none'
        }
    },
    unmounted(el) {
    }
}