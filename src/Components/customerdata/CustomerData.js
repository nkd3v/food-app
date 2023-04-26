import './CustomerData.css'

function CustomerData() {

    return (
        
        <div class="container">
            <div class="row">
            <div class="col-sm-2 col-md-2 col-lg-2 border">
                <p>001</p>   
            </div>
            <div class="col-sm-4 col-md-4 col-lg-4 border">
                <p>McDonalds burger</p>   
            </div>
            <div class="col-sm-4 col-md-4 col-lg-4 border">
                <p>my house</p> 
            </div>
            <div class="col-sm-2 col-md-2 col-lg-2 border">
                <button className='see'>
                <p>see</p> 
                </button>
            </div>
            </div>
        </div>
        
        
  )
}

export default CustomerData;