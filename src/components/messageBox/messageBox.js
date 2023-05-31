import {render ,createVNode} from 'vue'
import MessageBoxConstructor from './messageBox.vue'

class XmvMessageBox{

}

const messageInstance = new Map()

function createComponent(msg,title){
    let vm
    let container = document.createElement('div')
    document.body.appendChild(container)
    let vnode = createVNode(MessageBoxConstructor ,{
        title : title,
        message : msg,
        onLeave : ()=>{
            messageInstance.delete(vm)
            render(null ,container)
            container.remove()
        }
    })
    render(vnode, container)
    vm = vnode.component.proxy
    messageInstance.set(vm ,vnode)
    return vm
}

XmvMessageBox.alert = (msg,title)=>{
    let vm = createComponent(msg,title)
    vm.setAlert()
    vm.show()
}

XmvMessageBox.confirm = (msg ,title)=>{
    let vm = createComponent(msg,title)
    let confirmPromise = new Promise((resolve ,reject)=>{
        vm.setConfirm(resolve ,reject)
        vm.show()
    })
    return confirmPromise
}

export default XmvMessageBox