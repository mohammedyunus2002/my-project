"use client"
import React from 'react';
import { checkoutBillState } from '../../store/recoilState';
import { useRecoilValue } from 'recoil';


export default function Checkout() {
  const totalAmount = useRecoilValue(checkoutBillState);

  return (
    <div>
      <h1>Checkout</h1>
      <p>Total: ₹{totalAmount}</p>

      {/* Checkout form here */}
      <form>
        <input type="text" placeholder="Name" />
        <input type="email" placeholder="Email" />
        <input type="number" placeholder="Card number" />
        <input type="number" placeholder="Expiry" />
        <input type="number" placeholder="CVV" />
        <button type="submit">Pay ${totalAmount}</button>
      </form>      
    </div>  
  )
}