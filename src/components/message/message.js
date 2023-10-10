import {createVNode ,reactive ,render ,watch} from 'vue'
import MessageConstructor from "./message.vue"

const instances = reactive([])

function XmvMessage({message ,type ,showClose ,duration}){
    let vm
    let container = document.createElement('div')
    document.body.appendChild(container)
    let vnode = createVNode(MessageConstructor ,{
        top : 20 + instances.length * 64,
        instances : instances,
        message : message,
        type : type,
        duration : duration,
        showClose : showClose,
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

watch(instances ,(newVal)=>{
    instances.forEach((instance,i) =>{
        instance.setTop(20 + i * 64)
    })
} ,{deep : false})

export default XmvMessage