export const motionTokens = {
  duration: {
    micro: 0.14,
    component: 0.24,
    reveal: 0.56,
    exit: 0.18,
  },
  easing: {
    enter: [0.22, 1, 0.36, 1] as const,
    standard: [0.4, 0, 0.2, 1] as const,
  },
  spring: {
    type: 'spring' as const,
    stiffness: 300,
    damping: 30,
  },
}

export const revealSection = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: motionTokens.duration.reveal, ease: motionTokens.easing.enter },
  },
}

export const revealItem = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
}

export const staggerReveal = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.04,
    },
  },
}
