import {createVNode ,reactive ,render} from 'vue'
import MessageConstructor from "./message.vue"

const instances = reactive([])

function XmvMessage({message}){
    let vm
    let container = document.createElement('div')
    document.body.appendChild(container)
    let vnode = createVNode(MessageConstructor ,{
        instances : instances,
        message : message,
        onLeave : ()=>{
            //instances.delete(vm)
            render(null ,container)
            container.remove()
        }
    })
    render(vnode, container)
    vm = vnode.component.proxy
    instances.push(vm)
}

export default XmvMessage