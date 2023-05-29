let loadingInstance = null

class XmvLoading{
    constructor(options){
        const container = document.createElement('div')
        this.container = container

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
        document.body.appendChild(container)
        container.style.display = 'block'
    }

    loadingOptions(options){

    }

    loading(){
        this.container.style.display = 'block'
    }

    close(){
        this.container.style.display = 'none'
    }
}

XmvLoading.service = (options)=>{
    if (loadingInstance){
        loadingInstance.loadingOptions(options)
    }
    else{
        loadingInstance = new XmvLoading(options)
    }
    loadingInstance.loading()
    return loadingInstance
}

export default XmvLoading