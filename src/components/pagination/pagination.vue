<template>
    <div class="xmv-pagination" 
        :class="{
                    'is-background' : (background != undefined),
                    'xmv-pagination--small' : (small != undefined)
                }">
        <button type="button" class="btn-prev is-first" @click="handlePrevClick"
            :disabled="paginationMode.prevButtonDisabled.value">
            <xmv-icon name="arrowLeft"></xmv-icon>
        </button>
        <ul class="xmv-pager">

            <li class="number" @click="()=>handleNumClick(1)" 
                :class="{'is-active':paginationMode.currentPage.value == 1}"> 1 </li>

            <li class="more btn-quickprev xmv-icon" v-if="paginationMode.quickprevShow.value"
            @click="handleQuickPrevClick">
                <xmv-icon name="moreFilled"></xmv-icon>
            </li>

            <xmv-pagination-item v-for="(tmp,index) in paginationMode.list.value" 
            :data="tmp" :key="index" @changeNum="handleChangeNum"></xmv-pagination-item>

            <li class="more btn-quicknext xmv-icon" v-if="paginationMode.quicknextShow.value"
            @click="handleQuickNextClick">
                <xmv-icon name="moreFilled"></xmv-icon>
            </li>

            <li class="number"
                v-if="paginationMode.maxPageCount.value != 0 && paginationMode.maxPageCount.value != 1"
                @click="()=>handleNumClick(paginationMode.maxPageCount.value)"
                :class="{'is-active':paginationMode.currentPage.value == paginationMode.maxPageCount.value}"> {{paginationMode.maxPageCount}} </li>
        </ul>
        <button type="button" class="btn-next is-last" @click="handleNextClick"
            :disabled="paginationMode.nextButtonDisabled.value">
            <xmv-icon name="arrowRight"></xmv-icon>
        </button>
    </div>
</template>

<script>
import {defineComponent, nextTick, onMounted ,provide,reactive, watch} from 'vue'
import PaginationMode from './mode/paginationMode'
import xmvPaginationItem from './item.vue'
import {createEventBus} from 'utils/event'
export default defineComponent({
    name:"xmvPagination",
    components:{xmvPaginationItem},
    emits:['changeNumber'],
    props:{
        total : {type:Number ,default:0},
        pageSize : {type:Number ,default:10},
        pageCount : {type:Number ,default:7},
        background : String,
        small : String
    },
    setup(props ,context) {

        const eventBus = reactive({
            listeners : {}
        })

        const {$on ,$emit} = createEventBus(eventBus)

        const paginationMode = new PaginationMode(props)

        provide('PaginationMode' ,paginationMode)
        provide('EventBus' ,{$on ,$emit})

        const handleChangeNum = (num)=>{
            paginationMode.currentPage.value = num
            paginationMode.set()
            nextTick(()=>{
                emitChangeNumber()
            })
        }

        const handleNumClick = (num)=>{
            paginationMode.currentPage.value = num
            paginationMode.set()
            emitChangeNumber()
        }

        const handlePrevClick = ()=>{
            if (paginationMode.currentPage.value == 1 
                || paginationMode.maxPageCount.value == 0){
                return false
            }
            paginationMode.currentPage.value = paginationMode.currentPage.value - 1
            paginationMode.set()
            nextTick(()=>{
                emitChangeNumber()
            })
        }

        const handleNextClick = ()=>{
            if (paginationMode.currentPage.value == paginationMode.maxPageCount.value
                ||paginationMode.maxPageCount.value == 0){
                return false
            }
            paginationMode.currentPage.value = paginationMode.currentPage.value + 1
            paginationMode.set()
            nextTick(()=>{
                emitChangeNumber()
            })
        }

        const handleQuickPrevClick = ()=>{
            let tmp = paginationMode.currentPage.value - props.pageCount + 2
            if (tmp < 1){
                tmp = 1
            }
            paginationMode.currentPage.value = tmp
            paginationMode.set()
            nextTick(()=>{
                emitChangeNumber()
            })
        }

        const handleQuickNextClick = ()=>{
            let tmp = paginationMode.currentPage.value + props.pageCount - 2
            if (tmp > paginationMode.maxPageCount.value){
                tmp = paginationMode.maxPageCount.value
            }
            paginationMode.currentPage.value = tmp
            paginationMode.set()
            nextTick(()=>{
                emitChangeNumber()
            })
        }

        const emitChangeNumber = ()=>{
            $emit('changeNum' ,paginationMode.currentPage.value)
            context.emit('changeNumber')
        }

        const getPageInfo = ()=>{
            return {
                pageNum : paginationMode.currentPage.value,
                pageSize : props.pageSize
            }
        }

        const set = ()=>{
            paginationMode.set()
        }

        const reset = ()=>{
            paginationMode.currentPage.value = 1
            $emit('changeNum' ,1)
            set()
        }

        watch(()=>props.total ,(newVal)=>{
            set()
        })

        watch(()=>props.pageSize ,(newVal)=>{
            paginationMode.set()
        })

        onMounted(()=>{
            paginationMode.set()
        })

        return {paginationMode ,handleChangeNum ,handleNumClick ,handlePrevClick ,handleNextClick,
            handleQuickPrevClick ,handleQuickNextClick ,getPageInfo ,reset ,set}
    }
})
</script>

<style lang="" scoped></style>
