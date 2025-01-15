import React, { useState } from "react";
import CartItem from "./CartItem";
import { ToastContainer, toast } from 'react-toastify';
import { useEffect } from "react";
// import { Tooltip } from 'react-tooltip';


function Cartpage({ cartProducts,showHomeFunc,subTotalPassToheader }) {
  let [totalPrice, setTotalPrice] = useState(0);
  let [discountWord, setDiscountWord] = useState('');
  let [freeDevivery, setFreedelivery] = useState(false);


  let deliveryCharges;
  cartProducts.length==0? deliveryCharges=0 :deliveryCharges = 12.0
  

  let checkoutPrice =freeDevivery?totalPrice :totalPrice + deliveryCharges;

  function countTotalPrice(price) {

    setTotalPrice((totalPrice) => totalPrice + price);
  }

  function applyDiscound(event){
    event.stopPropagation();
    if (discountWord.toLocaleLowerCase()==="freedelivery") {

      setFreedelivery(true)
      
      toast("Coupon Applied!!");
      
    }
    
  }

  useEffect(() => {
  
    subTotalPassToheader(checkoutPrice.toFixed())
  }, [checkoutPrice])
  

  
  return (
    <div className="flex flex-col md:flex-row gap-10 p-10 relative">
      <ToastContainer/>
  <button
          className="absolute top-4 left-4 tooltip  tooltip-right rounded-full p-2 bg-gray-200 hover:bg-gray-300"
          data-tip="home"

          onClick={showHomeFunc}
        >
          ←
        </button>

  
      <section className="cart p-5 md:p-10 w-full md:w-2/3 shadow-lg bg-white rounded-lg border-gray-100 border-2">
       
        <h2 className="text-2xl font-semibold text-black mb-4">Shopping Bag</h2>
        <p className="text-black mb-4">
          <span className="text-xl font-semibold text-black">{cartProducts.length} Items</span> in
          your bag.
        </p>
        <div className="all-cart-list">
          <ul className="flex justify-between border-b pb-2 mb-2">
            <li className="w-1/4">Product</li>
            <li className="w-1/4">Price</li>
            <li className="w-1/4">Quantity</li>
            <li className="w-1/4">Total Price</li>
          </ul>

          {cartProducts.map((item) => {
            const {
              id,
              title,
              price,
              shippingInformation,

              images,
              brand,
            } = item;
            return (
              <CartItem
                key={id}
                images={images}
                title={title}
                brand={brand}
                price={price}
                delivery={shippingInformation}
                pid={id}
                countTotalPrice={countTotalPrice}
              />
            );
          })}
        </div>
      </section>
      <section className="payment p-5 md:p-10 w-full md:w-1/4 shadow-lg bg-white rounded-lg border-gray-100 border-2">
        <div className="coupon-section mb-8">
          <h2 className="text-xl font-semibold mb-2">Coupon Code</h2>
          <p className="max-w-xs mb-4">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sapiente,
            amet?
          </p>
          <input
            type="text"
            className="border p-2 w-full mb-2 bg-white"
            placeholder="apply coupon"

            value={discountWord}

            onChange={(e)=>setDiscountWord(e.target.value)}


          />
          <button className="bg-teal-900 text-white px-4 py-2" onClick={applyDiscound}>
            {!freeDevivery ? "APPLY" : "COUPON APPLIED!"}
          </button>
          {freeDevivery && (
            <button className="bg-white text-white px-2 py-1 ml-2" onClick={() => {setFreedelivery(false),setDiscountWord("")}}>
              ❌
            </button>
          )}
        </div>
        <div className="price-section">
          <h2 className="text-xl font-semibold mb-2 text-gray-600">
            Cart Total
          </h2>
          <p className="flex justify-between mb-2">
            Cart subtotal <span>${totalPrice.toFixed(2)}</span>
          </p>
          <p className={`flex justify-between mb-2 ${freeDevivery?"line-through":"" }`}>
            Delivery charges <span>${deliveryCharges.toFixed(2)}</span>
          </p>

          <p className="flex justify-between mb-4 text-gray-600">
            Cart Total <span>${checkoutPrice.toFixed(2)}</span>
          </p>
          <button className="bg-teal-900 text-white px-4 py-2 w-full">
            Checkout
          </button>
        </div>
      </section>
    </div>
  );
}

export default Cartpage;
