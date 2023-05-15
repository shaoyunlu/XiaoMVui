import 'style/app.less'
import {reactive} from 'vue'
import xmvLayout from 'comps/layout/layout.vue'
import xmvButton from 'comps/button/button.vue'
import xmvMenu from 'comps/menu/menu.vue'
import xmvMenuCore from 'comps/menu/menuCore.vue'
import xmvMenuCoreCollapse from 'comps/menu/menuCoreCollapse.vue'
import xmvMenuCoreHorizontal from 'comps/menu/menuCoreHorizontal.vue'
import xmvPopover from 'comps/popover/popover.vue'
import xmvTooltip from 'comps/tooltip/tooltip.vue'
import xmvScrollbar from 'comps/scrollbar/scrollbar.vue'
import xmvTable from 'comps/table/table.vue'
import xmvTableColumn from 'comps/table/tableColumn.vue'
import xmvIcon from 'comps/icon/icon.vue'
import xmvRow from 'comps/rowcol/row.vue'
import xmvCol from 'comps/rowcol/col.vue'
import xmvInput from 'comps/input/input.vue'
import xmvSelect from 'comps/select/select.vue'
import xmvOption from 'comps/select/option.vue'
import xmvSelectTags from 'comps/select/tags.vue'
import xmvTag from 'comps/tag/tag.vue'
import xmvRadioGroup from 'comps/radio/radioGroup.vue'
import xmvRadio from 'comps/radio/radio.vue'
import xmvRadioButton from 'comps/radio/radioButton.vue'
import xmvCheckbox from 'comps/checkbox/checkbox.vue'
import xmvCheckboxGroup from 'comps/checkbox/checkboxGroup.vue'
import xmvCheckboxButton from 'comps/checkbox/checkboxButton.vue'
import xmvDatePicker from 'comps/datePicker/datePicker.vue'
import xmvTimePicker from 'comps/timePicker/timePicker.vue'
import xmvTree from 'comps/tree/tree.vue'
import xmvTreeNode from 'comps/tree/treeNode.vue'
import xmvTreeSelect from 'comps/treeSelect/treeSelect.vue'
import xmvDialog from 'comps/dialog/dialog.vue'
import xmvForm from 'comps/form/form.vue'
import xmvFormItem from 'comps/form/formItem.vue'

import loadingDirective from 'comps/loading/directive'

import {createEventBus} from 'utils/event'

const register = (vue)=>{

    const {provide} = vue

    const eventBus = reactive({
        listeners : {}
    })

    const {$on ,$emit} = createEventBus(eventBus)

    // 创建一个xmv-popper-container
    const popperContainerDiv = document.createElement('div')
    popperContainerDiv.id = 'xmv-popper-container'
    document.body.appendChild(popperContainerDiv)

    provide('Xmv-Dom-PopperContainer' ,popperContainerDiv)
    provide('Xmv-Event-On' ,$on)

    // 分发各种事件
    window.addEventListener('mouseup' ,(e)=>{
        $emit('mouseup' ,e)
    })

    vue.component('xmvLayout', xmvLayout)
    vue.component('xmvButton', xmvButton)
    vue.component('xmvMenu', xmvMenu)
    vue.component('xmvMenuCore', xmvMenuCore)
    vue.component('xmvMenuCoreCollapse', xmvMenuCoreCollapse)
    vue.component('xmvMenuCoreHorizontal', xmvMenuCoreHorizontal)
    vue.component('xmvPopover', xmvPopover)
    vue.component('xmvTooltip', xmvTooltip)
    vue.component('xmvScrollbar', xmvScrollbar)
    vue.component('xmvTable', xmvTable)
    vue.component('xmvTableColumn', xmvTableColumn)
    vue.component('xmvIcon', xmvIcon)
    vue.component('xmvRow', xmvRow)
    vue.component('xmvCol', xmvCol)
    vue.component('xmvInput', xmvInput)
    vue.component('xmvSelect', xmvSelect)
    vue.component('xmvOption', xmvOption)
    vue.component('xmvSelectTags', xmvSelectTags)
    vue.component('xmvTag', xmvTag)
    vue.component('xmvRadioGroup', xmvRadioGroup)
    vue.component('xmvRadio', xmvRadio)
    vue.component('xmvRadioButton', xmvRadioButton)
    vue.component('xmvCheckbox', xmvCheckbox)
    vue.component('xmvCheckboxGroup', xmvCheckboxGroup)
    vue.component('xmvCheckboxButton', xmvCheckboxButton)
    vue.component('xmvDatePicker', xmvDatePicker)
    vue.component('xmvTimePicker', xmvTimePicker)
    vue.component('xmvTree', xmvTree)
    vue.component('xmvTreeNode', xmvTreeNode)
    vue.component('xmvTreeSelect', xmvTreeSelect)
    vue.component('xmvDialog', xmvDialog)
    vue.component('xmvForm', xmvForm)
    vue.component('xmvFormItem', xmvFormItem)

    vue.directive('loading', loadingDirective);
}

export default register