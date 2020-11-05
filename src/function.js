import axios from 'axios'


export default function upload(formdata){
    return new Promise((resolve,error)=>{
        axios.post('/',formdata)
        .then(res=>{
            const data=res.data
            console.log(data)
            resolve(data)
        })
        .catch(err=>{
            error({'error':'Something went wrong'})
        })
    })
}