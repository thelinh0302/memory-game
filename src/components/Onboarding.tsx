import { motion } from "framer-motion";

interface IOnboardingProps {
  setShowOnboarding: (show: boolean) => void;
}
export const Onboarding = ({ setShowOnboarding }: IOnboardingProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      className="w-screen min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-100 to-pink-200"
    >
      <h1 className="text-4xl font-bold text-center mb-6 text-purple-700">
        🎉 Welcome to the Word Match Game!
      </h1>
      <p className="text-center text-lg mb-8 text-gray-700 max-w-xl">
        Drag and drop vocabulary pairs to test your memory. Click GO to begin!
      </p>
      <button
        onClick={() => setShowOnboarding(false)}
        className="px-6 py-3 bg-purple-600 text-white text-lg rounded shadow hover:bg-purple-700 transition"
      >
        GO
      </button>
    </motion.div>
  );
};