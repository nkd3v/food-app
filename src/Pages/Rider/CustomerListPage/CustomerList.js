import CustomerData from '../../../Components/customerdata/CustomerData'
import './CustomerList.css'

const CustomerList = () => {
    return(

        
        <div>
            <h1>Customer List</h1>
            
            <div className='list_container'>
            
            
            <div class="col-sm-2 col-md-2 col-lg-2 border">
                <h4>No.</h4>   
            </div>
            <div class="col-sm-4 col-md-4 col-lg-4 border">
                <h4>Restaurant</h4>   
            </div>
            <div class="col-sm-4 col-md-4 col-lg-4 border">
                <h4>Destination</h4> 
            </div>
            <div class="col-sm-2 col-md-2 col-lg-2 border">
                <h4>Description</h4> 
            </div>
            
                <CustomerData />
                <CustomerData />
                <CustomerData />
                <CustomerData />
                <CustomerData />    
                <CustomerData />
            </div>
        </div>
    ) 
  };
  
  export default CustomerList;