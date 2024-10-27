import { FaUser, FaShoppingCart, FaBox } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { RiOrderPlayFill } from "react-icons/ri";
import ProfileTab from "./ProfileTab";
import UserCart from "./UserCart";
import ProductOrdredList from "./ProductOrdredList";

const ProfilePage = ({ data, load, setLoad, activeTab, setActiveTab }) => {
  const TabButton = ({ label, icon, isActive, onClick }) => (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`flex justify-center items-center px-6 py-3 rounded-full transition duration-300 ${
        isActive
          ? "bg-black text-white shadow-lg"
          : "bg-white text-gray-600 hover:bg-gray-100 border border-black"
      }`}
      onClick={onClick}
    >
      {icon}
      <span className="ml-2 font-semibold">{label}</span>
    </motion.button>
  );

  return (
    <div className="max-w-7xl mx-auto p-6  min-h-screen">
      <div className=" grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-4 md:gap-3 mt-3 md:mt-6 lg:mt-10">
        <TabButton
          label="Profile"
          icon={<FaUser className="text-xl" />}
          isActive={activeTab === "profile"}
          onClick={() => setActiveTab("profile")}
        />
        <TabButton
          label="Cart"
          icon={<FaShoppingCart className="text-xl" />}
          isActive={activeTab === "cart"}
          onClick={() => setActiveTab("cart")}
        />

        <TabButton
          label="Orders"
          icon={<FaBox className="text-xl" />}
          isActive={activeTab === "orders"}
          onClick={() => setActiveTab("orders")}
        />
        <TabButton
          label="Buyed Items"
          icon={<FaBox className="text-xl" />}
          isActive={activeTab === "buyItems"}
          onClick={() => setActiveTab("buyItems")}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === "profile" && load == false && (
            <ProfileTab data={data} setLoad={setLoad} load={load} />
          )}
          {activeTab === "cart" && <UserCart data={data} setLoad={setLoad} />}

          {activeTab === "orders" && (
            <>
              <ProductOrdredList />
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ProfilePage;
