
import {opacityIn as opcIn ,opacityOut as opcOut} from 'comps/transition/opacityInOut'
import {collapse as wCollapse ,expand as wExpand} from 'comps/transition/widthCollapseExpand'
import {collapse as hCollapse ,expand as hExpand} from 'comps/transition/heightCollapseExpand'

class LinkNode{
    constructor(promise ,next){
        this.promise = promise
        this.next = next
    }
}

class XmvTransition{

    constructor(){
        this.el
        this.animateType
        this.delayRunTimeout
        this.animateTimeOutMap = {}
        this.isAnimating = false
    }

    setEl(el){
        this.el = el
    }

    opacityIn(beforeCbf){
        if (this.animateType == 'opacityIn'){
            return false
        }
        this.animateType = 'opacityIn'
        beforeCbf && beforeCbf()
        clearTimeout(this.animateTimeOutMap['opacityOut'])
        clearTimeout(this.delayRunTimeout)
        opcIn(this.el ,()=>{})
    }

    opacityOut(afterCbf){
        if (this.animateType == 'opacityOut'){
            return false
        }
        this.animateType = 'opacityOut'
        const wrapCbf = ()=>{
            afterCbf && afterCbf()
        }
        this.delayRunTimeout = setTimeout(()=>{
            this.animateTimeOutMap['opacityOut'] = opcOut(this.el ,wrapCbf)
        },100)
    }

    widthCollapse(el ,expandStr ,collapseStr ,cbf){
        if (this.isAnimating){
            return false
        }
        let wrapCbf = ()=>{
            this.isAnimating = false
            cbf && cbf()
        }
        this.isAnimating = true
        wCollapse(el ,expandStr ,collapseStr ,wrapCbf)
    }

    widthExpand(el ,expandStr ,collapseStr ,cbf){
        if (this.isAnimating){
            return false
        }
        let wrapCbf = ()=>{
            this.isAnimating = false
            cbf && cbf()
        }
        this.isAnimating = true
        wExpand(el ,expandStr ,collapseStr ,wrapCbf)
    }

    heightCollapse(el ,expandStr ,collapseStr ,cbf){
        if (this.isAnimating){
            return false
        }
        let wrapCbf = ()=>{
            this.isAnimating = false
            cbf && cbf()
        }
        this.isAnimating = true
        hCollapse(el ,expandStr ,collapseStr ,wrapCbf)
    }

    heightExpand(el ,expandStr ,collapseStr ,cbf){
        if (this.isAnimating){
            return false
        }
        let wrapCbf = ()=>{
            this.isAnimating = false
            cbf && cbf()
        }
        this.isAnimating = true
        hExpand(el ,expandStr ,collapseStr ,wrapCbf)
    }

    linkExcute(){

    }
}

export default XmvTransition