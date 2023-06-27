import { nextTick, reactive } from "vue"
import {addStyle ,removeStyle ,addClass ,removeClass} from 'utils/dom'

class CarouselMode{

    constructor({wrapperRef}){
        this.rctData = reactive({
            itemList : [],
        })
        this.clientWidth
        this.itemLength
        this.indexArray
        this.wrapperRef = wrapperRef
        this.currentAnimateIndex = 0
        this.position = 'right'
    }

    reset(){
        this.startIndex = 0
        this.itemLength = this.rctData.itemList.length
        this.clientWidth = this.wrapperRef.value.clientWidth
        this.beforeAnimate()
        
    }

    beforeAnimate(){  
        let pom = (this.position == 'right' ? '' : '-')      
        this.indexArray = shiftArray(this.itemLength ,this.currentAnimateIndex ,this.position)
        this.rctData.itemList.forEach((instance ,i)=>{
            let itemEl = instance.proxy.itemRef
            addStyle(itemEl ,'transform' ,`translateX(${pom + this.clientWidth*this.indexArray.indexOf(i)}px)`)
        })
    }

    animate(){
        setInterval(()=>{
            this.position = 'right'
            this.run()
        } ,5000)
    }

    afterAnimate(){
        this.rctData.itemList.forEach((instance ,i) =>{
            let itemEl = instance.proxy.itemRef
            removeClass(itemEl ,'is-animating')
        })
        this.beforeAnimate()
    }

    animateOnce(){
        let pom = (this.position == 'right' ? '-' : '')
        this.rctData.itemList.forEach((instance ,i) =>{
            let itemEl = instance.proxy.itemRef
            if (i == this.indexArray[0] || i == this.indexArray[1]){
                addClass(itemEl ,'is-animating')
            }else{
                removeClass(itemEl ,'is-animating')
            }
        })

        this.rctData.itemList.forEach((instance ,i) =>{
            let itemEl = instance.proxy.itemRef
            if (i == this.indexArray[0]){
                addStyle(itemEl ,'transform' ,`translateX(${pom + this.clientWidth}px)`)
            }
            if (i == this.indexArray[1]){
                addStyle(itemEl ,'transform' ,`translateX(0px)`)
            }
        })
        if (this.position == 'right')
        {
            this.currentAnimateIndex ++
            if (this.currentAnimateIndex == this.itemLength)
                this.currentAnimateIndex = 0
        }
        else
        {
            this.currentAnimateIndex --
            if (this.currentAnimateIndex == -1)
                this.currentAnimateIndex = this.itemLength - 1
        }
    }

    run(){
        this.beforeAnimate()
        setTimeout(()=>{
            this.animateOnce()
        },10)
    }

    left(){
        this.position = 'left'
        this.run()
    }

    right(){
        this.position = 'right'
        this.run()
    }
}

function shiftArray(length, num ,position) {
    const arr = []
    for (let i=0;i<length;i++){
        arr.push(i)
    }
    
    if (position == 'right'){
        let shiftedArr = [...arr.slice(num), ...arr.slice(0, num)]
        return shiftedArr
    }else{
        let shiftedArr = [];
        for (let i=0;i<arr.length;i++){
            if (num >= 0){
                shiftedArr.push(arr[num])
            }else{
                shiftedArr.push(arr[arr.length + num])
            }
            num --
        }
        console.log(shiftedArr)
        return shiftedArr;
    }
}

export default CarouselMode