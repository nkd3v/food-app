import CustomerData from '../../../Components/customerdata/CustomerData'
import './CustomerList.css'

const CustomerList = () => {
    return(
        <div>
            <h1>Customer List</h1>
            <div className='list_container'>
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