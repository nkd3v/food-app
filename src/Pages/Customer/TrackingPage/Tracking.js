import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import Order from "../../../Components/Order/Order";
import StepsProgressBar from "../../../Components/StepsProgressBar/StepsProgressBar";

/**
 * 
 * don't forget to add id later!!!!
 */

export default function Tracking() {
  const [order, setOrder] = useState({});
  const { id } = useParams()

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`https://api.dishdrop.pp.ua/api/order/${id}`);
        const data = await response.json();
        setOrder(data)
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, [id]);

  return (
    <>
      <div className="App">
        <StepsProgressBar step={order?.status} />
      </div>
      {console.log(order?.id) || order?.id ? (
      <>
        <Order key={uuidv4()} {...order} />
      </>
      ) : <p>Loading...</p>}
    </>
  );
}