import MultiStepProgressBar from '../../../Components/MultiStepProgressBar/MultiStepProgressBar';
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import Order from "../../../Components/Order/Order";

/**
 * 
 * don't forget to add id later!!!!
 */

export default function Tracking() {
  const [orderData, setOrderData] = useState([]);
  const [order, setOrder] = useState({});
  const { id } = useParams()

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://api.dishdrop.pp.ua/api/order');
        const data = await response.json();
        setOrderData(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (orderData.length > 0) {
      setOrder(orderData.find(item => item.id === id))
    }
  }, [orderData, id])

  return (
    <>
      <div className="App">
        <MultiStepProgressBar page={1} onPageNumberClick={() => { }} />
      </div>
      {console.log(order?.id) || order?.id ? (
      <>
        <Order key={uuidv4()} {...order} />
      </>
      ) : <p>   </p>}
    </>
  );
}