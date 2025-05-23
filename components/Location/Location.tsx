'use client';

import LocationIcon from '@/IconsSVG/LocationIcon';
import { useState } from 'react';
import MapWindow from '../MapWindow/MapWindow';
import { motion } from 'framer-motion';

const Location = ({ data }: { data?: string | null }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <motion.button
        aria-label="Otwórz mapę"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
        className="w-[25px] lg:w-[48px] h-[32px] lg:h-[64px]"
        onClick={() => setIsOpen(true)}
      >
        <LocationIcon width="100%" height="100%" />
      </motion.button>
      {isOpen && (
        <MapWindow isOpen={isOpen} data={data} setIsOpen={setIsOpen} />
      )}
    </>
  );
};

export default Location;
