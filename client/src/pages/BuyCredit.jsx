import React, { useContext } from "react";
import { assets, plans } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const BuyCredit = () => {
  const { user, backendUrl, loadCreditsData, token, setShowLogin } =
    useContext(AppContext);
  const navigate = useNavigate();

  const initpay = async (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Credits Payment",
      description: "Credits Payment",
      order_id: order.id,
      handler: async (response) => {
        try {
          // verify payment on server
          const { data } = await axios.post(
            `${backendUrl}/api/user/verify-razor`,
            {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            },
            { headers: { Authorization: `Bearer ${token}` } }
          );

          if (data.success) {
            await loadCreditsData();
            toast.success("Credits Added");
            navigate("/");
          } else {
            toast.error(data.message || "Verification failed");
          }
        } catch (err) {
          console.error("verify error:", err?.response?.data || err.message);
          toast.error(err.response?.data?.message || err.message);
        }
      },
      prefill: {
        name: user?.name,
        email: user?.email,
      },
      theme: { color: "#0ea5a4" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const paymentRazorpay = async (planId) => {
    try {
      if (!user) {
        setShowLogin(true);
        return;
      }

      // DEBUG: make sure we have token and planId
      console.log("CLIENT -> purchase planId:", planId);
      console.log("CLIENT -> token:", token);
      console.log("CLIENT -> backendUrl:", backendUrl);

      const { data } = await axios.post(
        `${backendUrl}/api/user/pay-razor`,
        { planId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("CLIENT -> pay-razor response:", data);

      if (data.success && data.order) {
        initpay(data.order);
      } else {
        toast.error(data.message || "Failed to create order");
      }
    } catch (error) {
      console.error(
        "paymentRazorpay error:",
        error?.response?.data || error.message
      );
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="min-h-[80vh] text-center pt-14 mb-10"
    >
      <button className="border border-teal-600 px-10 py-2 rounded-full mb-6 text-teal-600 font-medium hover:bg-teal-600 hover:text-white transition cursor-default">
        Our Subscription
      </button>
      <h1 className="text-center text-3xl font-bold mb-6 sm:mb-10">
        Choose the Subscription Plan
      </h1>

      <div className="flex flex-wrap justify-center gap-8">
        {plans.map((item, index) => (
          <div
            key={index}
            className="relative bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl p-6 w-72 hover:scale-105 transition-all duration-500 shadow-lg hover:shadow-2xl flex flex-col"
          >
            <div className="flex items-center gap-3 mb-3">
              <img src={assets.logo_icon} alt="" width={40} />
              <p className="font-semibold text-lg italic text-white">
                {item.id}
              </p>
            </div>

            <p className="text-white/90 text-sm">{item.desc}</p>

            <p className="mt-6 text-white">
              <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-pink-500">
                ₹{item.price}
              </span>
              <span className="text-white/80 text-sm">
                {" "}
                / {item.credits} credits
              </span>
            </p>

            <motion.button
              onClick={() => paymentRazorpay(item.id)}
              whileHover={{
                scale: 1.03,
                boxShadow: "0px 8px 20px rgba(0,0,0,0.3)",
              }}
              transition={{ type: "spring", stiffness: 220, damping: 10 }}
              className="relative mt-6 w-full bg-gradient-to-r from-pink-500 to-teal-600 
             text-white py-3 rounded-full font-semibold overflow-hidden 
             group transition-all duration-300"
            >
              {/* Shimmer effect */}
              <span
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent 
               translate-x-[-100%] group-hover:translate-x-[100%] 
               transition-transform duration-1000 ease-in-out"
              ></span>

              {/* Text */}
              <span className="relative z-10">Purchase</span>
            </motion.button>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default BuyCredit;
