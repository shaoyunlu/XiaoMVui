import {isEmpty} from 'utils/data'
const validateMapping = {
    'required' : {vMethod : validateRequired ,message:'不能为空'}
}

export function validate(val ,ruleList){
    let errorInfo = ''
    if (isEmpty(ruleList)){
        return errorInfo
    }
    ruleList.forEach(rule =>{
        if (errorInfo == ''){
            errorInfo = validateRule(val ,rule)
        }
    })

    return errorInfo
}

function validateRule(val ,rule){
    let errorInfo = ''
    let validateFlag = true
    let keyList = Object.keys(rule)

    for (let i=0;i<keyList.length;i++){
        let key = keyList[i]
        let validateItem = validateMapping[key]
        if (validateItem){
            validateFlag = validateItem.vMethod(val)
            if (!validateFlag){
                errorInfo = rule.message || validateItem.message
                break
            }
        }
    }
    return errorInfo
}

function validateRequired(val){
    return !isEmpty(val)
}