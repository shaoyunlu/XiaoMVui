export default {
    mounted(el, binding){
        const container = document.createElement('div')
        container.className = 'xmv-loading-mask'

        const spinner = document.createElement('div')
        spinner.className = 'xmv-loading-spinner'
        container.appendChild(spinner)

        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('class' ,'circular')
        svg.setAttribute('viewBox' ,'0 0 50 50')

        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('class', 'path');
        circle.setAttribute('cx', '25');
        circle.setAttribute('cy', '25');
        circle.setAttribute('r', '20');
        circle.setAttribute('fill', 'none');
        svg.appendChild(circle)
        spinner.appendChild(svg)
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
        console.log('unmounted')
    }
}