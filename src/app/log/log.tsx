import { useState } from "react"

interface logs{
    log:String
}

function Log({log}:logs){
    const [appair,setAppair] = useState('')
    return (
            <div className={`alert alert-success log ${appair}`}>{log}
                <button type="button" className="close" aria-label="Close" onClick={()=>{setAppair("d-none")}}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
    )
}

export default Log