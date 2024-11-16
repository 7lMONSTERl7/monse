interface logs{
    log:String
}

function Log({log}:logs){
    return (
            <div className="alert alert-success log">{log}
                <button type="button" className="close" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
    )
}

export default Log