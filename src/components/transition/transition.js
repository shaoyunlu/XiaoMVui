
import {opacityIn as opcIn ,opacityOut as opcOut} from 'comps/transition/opacityInOut'

class XmvTransition{

    constructor(){
        this.animateType
        this.animateTimeOutMap = {

        }
    }

    start(animateType ,el ,cbf ,...args){

        this.animateType = animateType

        if (animateType == 'opacityIn'){
            clearTimeout(this.animateTimeOutMap['opacityOut'])
        }

        const wrapCbf = ()=>{
            cbf && cbf()
        }
        this.animateTimeOutMap[animateType] = this[animateType](el ,wrapCbf ,...args)
    }

    opacityIn(el ,cbf ,...args){
        return opcIn(el ,cbf ,...args)
    }

    opacityOut(el ,cbf ,...args){
        return opcOut(el ,cbf ,...args)
    }

}

export default XmvTransition