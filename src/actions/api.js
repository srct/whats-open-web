import { CALL_API } from './action-types'

export const  apiTest = () =>{
    return (dispatch) =>{

        return fetch('/api/facilities',{'method':'get'}).then((res)=>{
        return res.json()
    },(error)=>{console.log(error)}).then(json =>{
        console.log(json[0])
    })
    }
}
