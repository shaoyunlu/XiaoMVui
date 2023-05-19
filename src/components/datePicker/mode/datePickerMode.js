import { reactive ,ref} from "vue"
import dayjs from 'dayjs'

class DatePickerMode{
    constructor(props){
        this.dateObj = dayjs()
        this.rctData = reactive({
            dayList : [],
            year : '',
            month : '',
            dateObj : dayjs()
        })
        this.weekHeader = ['一','二','三','四','五','六','日']

        this.pos = 'left'

        this.todayObj = dayjs()
        this.type = ref(props.type)
        this.popoverRef = ref(null)

        this.initDayMode()
    }

    setDayMode(dateStr){
        this.dateObj = dayjs(dateStr)
        this.initDayMode()
    }

    initDayMode(){
        let dateObj = this.dateObj
        this.rctData.year = dateObj.format('YYYY')
        this.rctData.month = dateObj.format('MM') + '月'
        this.rctData.dayList = []
        // 游标
        let cursor = 0
        // 这个月有多少天
        let totalDays = dateObj.daysInMonth()
        // 本月一号是礼拜几
        let firstDay = dateObj.startOf('month').day()
        firstDay = firstDay == 0 ? 7 : firstDay
        cursor = 8-firstDay
        // 有fistDay-1天是上个月的
        let lastMonthDays = firstDay - 1
        let dayList_1 = []
        let lastMonthLastDay = dateObj.subtract(1, 'month').endOf('month')
        let currentMonthLastDay = dateObj.endOf('month')
        for(let i=lastMonthDays-1;i>=0;i--){
            let __dataObj = lastMonthLastDay.subtract(i ,'day')
            let dayStr = __dataObj.format('DD')
            dayList_1.push({value:dayStr ,prevMonth:true ,pos:this.pos})
        }
        for(let i=1;i<=(cursor);i++){
            dayList_1.push({value:i ,available:true ,pos:this.pos})
        }
        this.rctData.dayList.push(dayList_1)

        let dayList_2 = []
        for(let i=1;i<=7;i++){
            cursor++
            dayList_2.push({value:cursor,available:true ,pos:this.pos})
        }
        this.rctData.dayList.push(dayList_2)

        let dayList_3 = []
        for(let i=1;i<=7;i++){
            cursor++
            dayList_3.push({value:cursor,available:true ,pos:this.pos})
        }
        this.rctData.dayList.push(dayList_3)

        let dayList_4 = []
        for(let i=1;i<=7;i++){
            cursor++
            dayList_4.push({value:cursor,available:true ,pos:this.pos})
        }
        this.rctData.dayList.push(dayList_4)

        let dayList_5 = []
        for (let i=1;i<=7;i++){
            cursor++
            if (cursor <= totalDays){
                dayList_5.push({
                    value:cursor,
                    available:true ,
                    pos:this.pos})
            }else{
                dayList_5.push({
                    value:currentMonthLastDay.add(cursor-totalDays ,'day').format('D'),
                    nextMonth:true,
                    pos:this.pos
                })
            }
        }
        this.rctData.dayList.push(dayList_5)

        let dayList_6 = []
        for (let i=1;i<=7;i++){
            cursor++
            if (cursor <= totalDays){
                dayList_6.push({
                    value:cursor,
                    available:true,
                    pos:this.pos})
            }else{
                dayList_6.push({
                    value:currentMonthLastDay.add(cursor-totalDays ,'day').format('D'),
                    nextMonth:true,
                    pos:this.pos
                })
            }
        }
        this.rctData.dayList.push(dayList_6)
    }
    
    initMonthMode(){

    }

    initYearMode(){

    }

}

export default DatePickerMode