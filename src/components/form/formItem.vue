<template>
    <div class="xmv-form-item">
        <label class="xmv-form-item__label">
            {{label}}
        </label>
        <div class="xmv-form-item__content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import {defineComponent, inject, watch} from 'vue'
export default defineComponent({
    name:"xmvFormItem",
    props:{
        label : {type:String ,default:''},
        prop : String
    },
    setup({label ,prop} ,context) {

        const mode = inject('Mode')
        const rules = inject('Rules')

        const handleBlur = ()=>{
            console.log('blur')
        }

        if (prop != undefined){
            watch(mode,(newVal)=>{
                let val = newVal[prop]
                validate(val)
            })
        }

        const validate = (val)=>{
            let ruleList = rules[prop]
            console.log(ruleList)
        }

        return {handleBlur}
    }
})
</script>

<style lang="" scoped></style>
