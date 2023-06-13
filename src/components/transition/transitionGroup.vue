<template>

</template>

<script>
import {defineComponent, h, nextTick, onMounted ,ref} from 'vue'
import {removeClass} from 'utils/dom'
export default defineComponent({
    name:"xmvTransitionGroup",
    props:{
        tag : {type:String ,default:'ul'}
    },
    setup({tag} ,{slots}) {

        const elRef = ref(null)

        const getHeight = (element)=>{
            const style = getComputedStyle(element);
            const height = element.offsetHeight + parseInt(style.marginTop) + parseInt(style.marginBottom);
            return height
        }

        const inAnimation = (el)=>{
            if (!el)
                return false
            nextTick(()=>{
                el.classList.add('xmv-list-enter-active' ,'xmv-list-enter-from')
                setTimeout(()=>{
                    removeClass(el ,'xmv-list-enter-active')
                    removeClass(el ,'xmv-list-enter-from')
                } ,10)
            })
        }

        onMounted(()=>{
            let observer = new MutationObserver((record)=>{

                let item = record[0]

                if (item.target.localName == tag){
                    let lastChild = item.target.children[item.target.children.length-1]
                    inAnimation(lastChild)
                }

                if (item.attributeName == 'style' && item.target.style.display == 'none' 
                    && item.target.localName != tag && item.type == 'attributes'){

                    item.target.style.display = ''
                    item.target.classList.add('xmv-list-leave-active' ,'xmv-list-leave-to');

                    let currentNode = item.target
                    let translateY = getHeight(currentNode)

                    while(currentNode.nextElementSibling ){    
                        currentNode.nextElementSibling.removeAttribute('style')          
                        currentNode.nextElementSibling.style.transform = `translateY(-${translateY}px)`
                        currentNode = currentNode.nextElementSibling
                    }

                    let siblingList = []

                    setTimeout(()=>{
                        let currentNode = item.target
                        while(currentNode.nextElementSibling ){
                            siblingList.push(currentNode.nextElementSibling)
                            currentNode.nextElementSibling.style.transition = 'none'       
                            currentNode.nextElementSibling.style.transform = 'none'
                            currentNode = currentNode.nextElementSibling
                        }
                        item.target.remove()
                    } ,1000)
                }
            })
            observer.observe(elRef.value ,{subtree : true,childList : true ,attributes : true})

            // 进场动画
            const children = elRef.value.children
            for (let i=0;i<children.length;i++){
                children[i].classList.add('xmv-list-enter-active' ,'xmv-list-enter-from')
            }

            nextTick(()=>{
                for (let i=0;i<children.length;i++){
                    removeClass(children[i] ,'xmv-list-enter-active')
                    removeClass(children[i] ,'xmv-list-enter-from')
                }
            })
        })

        return ()=>{
            let renderSlot = []
            let defaultSlot = slots.default ? slots.default() : null;
            
            if (defaultSlot)
            {
                if (defaultSlot && defaultSlot.length > 0)
                {
                    defaultSlot.forEach((__slot) => {
                        renderSlot.push(h(__slot ,{

                        }));
                    });
                }
            }

            return h(tag ,{ref:elRef} ,renderSlot)
        }
    }
})
</script>

<style lang="" scoped></style>
