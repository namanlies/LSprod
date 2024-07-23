"use client";

import { addToCart, removeFromCart } from "@/redux/features/cartSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Domains({
  links,
  specToRender,
  setLinkListLength,
  setCartModalIsOpen,
}) {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cartReducer);

  const filteredLinks = links.filter(
    (link) => link.domain !== specToRender[0]?.domain
  );

  const handleOnClick = (link) => {
    if (cart.includes(link)) {
      dispatch(removeFromCart(link));
    } else {
      dispatch(addToCart(link));
    }
  };

  const getMoreURLs = () => {
    setLinkListLength((prev) => prev + 12);
  };

  const openCartModal = () => setCartModalIsOpen((prev) => !prev);

  const total = cart.length * 50;

  return (
    <div className="flex justify-center mt-4">
      {links.length ? (
        <div className="w-[500px] p-3 glass">
          <div className="max-h-[300px] overflow-x-auto">
            {specToRender.map((link, i) => (
              <div
                key={link.domainId}
                className={`flex justify-between px-3 py-2 gap-4 cursor-pointer hover:bg-[#616daa2c] rounded ${
                  specToRender.length - 1 !== i && "border-blue-500 border-b-2"
                } ${
                  cart.some((item) => link.domain === item.domain) &&
                  "bg-[#324cd160]"
                }`}
                onClick={() => handleOnClick(link)}
              >
                <div className="flex gap-2">
                  <input
                    type="radio"
                    className="w-4"
                    value={link.domain}
                    checked={cart.some((item) => link.domain === item.domain)}
                    onChange={() => handleOnClick(link)}
                  />
                  <div className="whitespace-normal max-w-[400px]">
                    <p className="break-words">{link.domain}</p>
                  </div>
                </div>
                <div>
                  <p>₹ 50</p>
                </div>
              </div>
            ))}
            {specToRender.length ? (
              <p className="ml-2 mt-2 underline">More suggestions :</p>
            ) : null}
            {filteredLinks.map((link, i) => (
              <div
                key={link.domainId}
                className={`flex justify-between px-3 py-2 gap-4 cursor-pointer hover:bg-[#616daa2c] rounded ${
                  links.length - 1 !== i && "border-blue-500 border-b-2"
                } ${
                  cart.some((item) => link.domain === item.domain) &&
                  "bg-[#324cd160]"
                }`}
                onClick={() => handleOnClick(link)}
              >
                <div className="flex gap-2">
                  <input
                    type="radio"
                    className="w-4"
                    value={link.domain}
                    checked={cart.some((item) => link.domain === item.domain)}
                    onChange={() => handleOnClick(link)}
                  />
                  <div className="whitespace-normal max-w-[400px]">
                    <p className="break-words">{link.domain}</p>
                  </div>
                </div>
                <div>
                  <p>₹ 50</p>
                </div>
              </div>
            ))}
            <div className="flex justify-end mr-4">
              <button onClick={getMoreURLs}>See more</button>
            </div>
          </div>

          <div className="flex justify-center mt-4 gap-5">
            <p>Total</p>
            <p>₹ {total}</p>
          </div>

          <div className="flex justify-center mt-4">
            <button
              className="border-2 px-4 py-2 rounded-lg hover:bg-white hover:text-black"
              onClick={openCartModal}
            >
              Make payment
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
