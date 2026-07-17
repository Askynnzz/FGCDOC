import { motion } from 'framer-motion'
import OptionSelectModule from '../components/modules/OptionSelect/OptionSelectModule'

export default function OptionSelectPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-8"
    >
      <OptionSelectModule />
    </motion.div>
  )
}
