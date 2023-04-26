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
                
                <button 
                className="see"
                onClick={event =>  window.location.href='/TakeOrder'}>see</button>
            </div>
            </div>
        </div>
        
        
  )
}

export default CustomerData;