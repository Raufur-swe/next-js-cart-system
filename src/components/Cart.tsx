import React from 'react'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { useAppSelector } from '../hooks/useAppSelector';
import { selectCartItems, selectCartTotalPrice } from '../redux/features/cartSelector';
import Image from 'next/image';
import { decresqty, incresqty, removeCart } from '../redux/features/cartSlice';

const Cart = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const totalPrice = useAppSelector(selectCartTotalPrice);

  return (
    <div className="bg-white shadow-xl rounded-2xl flex flex-col max-h-[80vh]">

      {items.length === 0 ? (
        <p className="text-center text-gray-500 p-6">🛒 Cart is empty</p>
      ) : (
        <>
          {/* Header */}
          <div className="p-4 border-b">
            <h1 className="text-xl font-bold">My Cart</h1>
          </div>

          {/* Scrollable Items */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex gap-3 border p-2 rounded-lg"
              >
                {/* Image */}
                <div className="relative w-16 h-16">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover rounded"
                  />
                </div>

                {/* Info */}
                <div className="flex-1">
                  <h2 className="text-sm font-medium line-clamp-2">
                    {item.title}
                  </h2>

                  <p className="text-xs text-gray-500">
                    ${item.price} × {item.quantity}
                  </p>

                  {/* Quantity */}
                  <div className="flex items-center gap-2 mt-1">
                    <button
                      onClick={() => dispatch(decresqty(item.id))}
                      className="px-2 bg-gray-200 rounded"
                    >
                      -
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() => dispatch(incresqty(item.id))}
                      className="px-2 bg-gray-200 rounded"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Remove */}
                <button
                  onClick={() => dispatch(removeCart(item.id))}
                  className="text-red-500 text-xs"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          {/* Bottom Total (always visible) */}
          <div className="border-t p-4 bg-white">
            <div className="flex justify-between mb-2">
              <span className="font-semibold">Total</span>
              <span className="font-bold text-green-600">
                ${totalPrice.toFixed(2)}
              </span>
            </div>

            <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default Cart