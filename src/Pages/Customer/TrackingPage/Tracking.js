import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import Order from "../../../Components/Order/Order";
import StepsProgressBar from "../../../Components/StepsProgressBar/StepsProgressBar";
import { Button } from "react-bootstrap";

export default function Tracking() {
  const [order, setOrder] = useState({});
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const worker = new Worker('/pollstatus.js');
    worker.postMessage(`https://api.dishdrop.pp.ua/api/order/${id}`);
    worker.onmessage = (event) => {
      setOrder(event.data);
    };
    return () => {
      worker.terminate();
    };
  }, [id]);

  const handleCancel = async (event) => {
      event.preventDefault();
      await fetch(`https://api.dishdrop.pp.ua/api/order/${id}`, {
          method: 'DELETE',
          credentials: 'include',
      })
          .then((data) => console.log(data))
          .then(() => navigate('/'))
          .catch((error) => console.error(error));
  };

  return (
    <>
      <div className="App mt-5">
        {order?.status !== -1 && <StepsProgressBar step={order?.status} />}
      </div>
      {console.log(order?.id) || order?.id ? (
      <>
        <Order key={uuidv4()} {...order} />
        <Button className="mb-3 btn-danger" onClick={handleCancel} disabled={order.status === 100}>
          Cancel order
        </Button>
      </>
      ) : <p>Loading...</p>}
    </>
  );
}