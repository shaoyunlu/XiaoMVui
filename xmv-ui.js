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

const register = (vue)=>{
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
}

export default register