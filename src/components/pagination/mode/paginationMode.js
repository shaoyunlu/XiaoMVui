import {ref} from 'vue'

class PaginationMode{
    constructor(props){
        this.quickprevShow = ref(false)
        this.maxPageCount = ref(1)
        this.currentPage = ref(1)
        this.quicknextShow = ref(false)
        this.list = ref([])
        this.props = props
    }

    set(){
        let totalPage
        let prevCriticalValue
        let nextCriticalValue

        totalPage = Math.ceil(this.props.total/this.props.pageSize)
        this.maxPageCount.value = totalPage
        prevCriticalValue = (3 + (this.props.pageCount))/2
        this.quickprevShow.value = (this.currentPage.value >= prevCriticalValue)
        
        nextCriticalValue = Math.ceil((this.props.pageCount - 2)/2)
        this.quicknextShow.value = ((totalPage - this.currentPage.value) > nextCriticalValue)

        if (totalPage <= this.props.pageCount){
            this.quicknextShow.value = false
        }

        for(let i=2;i<totalPage;i++){
            this.list.value.push(i)
        }

        this.generateArray(this.currentPage.value,Math.ceil((this.props.pageCount-4)/2),totalPage)
    }

    generateArray(m ,n ,max){
        let left = []
        let right = []
        let result = []

        for (let i = m-n;i<m;i++){
            if (i>=2){
                left.push(i)
            }
        }

        for (let i = m + 1; i <= m + n; i++) {
            if (i <= max - 1){
                right.push(i);
            }
        }

        if (left.length < n){
            let diff = n - left.length
            if (m == 1){
                diff = diff + 1
            }
            for (let i = 0;i < diff; i++){
                if (right.length >= 2 && right[right.length-1] < max - 1){
                    right.push(right[right.length-1] + 1)
                }
            }
        }

        if (right.length < n){
            let diff = n-right.length
            if (m == max){
                diff = diff + 1
            }
            for (let i =0;i < diff;i++){
                if (left.length > 0 && left[0] > 2){
                    left.unshift(left[0] - 1)
                }
            }
        }

        if (m != 1 && m != max){
            left.push(m)
        }

        result = left.concat(right);
        this.list.value = result

        return result;
    }
}



export default PaginationMode