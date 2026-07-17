import { motion } from 'framer-motion'
import OkizemeModule from '../components/modules/Okizeme/OkizemeModule'

export default function OkizemePage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-8"
    >
      <OkizemeModule />
    </motion.div>
  )
}
