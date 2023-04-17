<template>
    <div class="xmv-select__tags" ref="tagsRef">
        <span class="xmv-select-tags-wrapper has-prefix">
            <xmv-tag v-for="tmp in selectMode.rctData.sData">
                {{tmp.label}}
            </xmv-tag>
        </span>
    </div>
</template>

<script>
import {defineComponent ,inject ,ref} from 'vue'
export default defineComponent({
    name:"",
    setup(props ,context) {
        const tagsRef = ref(null)
        const selectMode = inject('SelectMode')
        selectMode.tagsRef = tagsRef
        return {selectMode ,tagsRef}
    }
})
</script>

<style lang="" scoped></style>
