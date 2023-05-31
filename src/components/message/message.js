import {createVNode ,reactive ,render} from 'vue'
import MessageConstructor from "./message.vue"

const instances = reactive([])

function XmvMessage({message ,type}){
    let vm
    let container = document.createElement('div')
    document.body.appendChild(container)
    let vnode = createVNode(MessageConstructor ,{
        top : 20 + instances.length * 64,
        instances : instances,
        message : message,
        type : type,
        onDestroy:()=>{
            let index = instances.findIndex(obj => obj === vm)
            instances.splice(index, 1)
            render(null ,container)
            container.remove()
        }
    })
    render(vnode, container)
    vm = vnode.component.proxy
    instances.push(vm)
}

export default XmvMessage