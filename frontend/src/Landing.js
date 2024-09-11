import React from "react";
import { Link } from "react-router-dom";
import LandDelivery from './img/LandDelivery.svg';
import LandDoc from './img/LandDoc.svg';
import LandDocPrec from './img/LandDocPrec.svg';
import LandFam from './img/LandFam.svg';
import LandMother from './img/LandMother.svg';
import LandTeaching from './img/LandTeaching.svg';
import LandTreat from './img/LandTreat.svg';
import LandPuzzle from "./img/puzzlebg.png";
import "./Landing.css";
import Reveal from "./RevealRightToLeft";
import { motion, useScroll, useSpring, Variants, animate, useMotionValue, useTransform } from 'framer-motion';
import OfferCard from "./OfferCard.jsx";
import { useEffect, useState } from "react";
import useMeasure from "react-use-measure";

const charVariants = {
   hidden: { opacity: 0 },
   reveal: { opacity: 1 }
}

const fadeInUpAnimation = {
   hidden: {
      opacity: 0,
      y: 100,
   },
   show: {
      opacity: 1,
      y: 0,
      transition: {
         staggerChildren: 0.3,
         duration: 1.5,
      },
   },
};


const weOffers = [
   {
      image: LandMother,
      title: "Parent and Children",
      description: "Empowering parents to take control of their child’s care, Autism Compass provides easy access to book doctor appointments, explore therapy options, and track updates all in one place. With the ability to view details about doctors, therapy locations, and even purchase specialized products for home delivery, parents have everything they need to ensure their child’s well-being right at their fingertips."
   },
   {
      image: LandDoc,
      title: "Doctor",
      description: "Doctors can connect with families, offer tailored suggestions. By recommending therapies and providing timely feedback, doctors ensure each child’s unique needs are met, creating a streamlined experience for both medical professionals and parents working together."
   },
   {
      image: LandTreat,
      title: "Therapy",
      description: "Autism Compass offers a comprehensive list of therapies tailored to various needs, with detailed descriptions and locations to help parents and children find the right support. Easily browse therapy options, view where sessions are available, and book appointments directly through the platform. This seamless system ensures that finding and scheduling therapies is convenient and accessible."
   },
   {
      image: LandTeaching,
      title: "Teacher",
      description: "Teachers can offer specialized courses designed for children with autism, where parents and children can select classes, submit assignments, and interact with learning materials. Autism Compass fosters an accessible, supportive environment where education is tailored to individual learning styles and progress can be tracked with ease."
   },
   {
      image: LandDelivery,
      title: "Shops & Delivery",
      description: "Autism Compass offers a thoughtful selection of products, including toys and items designed to support children with autism. Users can easily browse, add products to their cart, and complete purchases smoothly. Track your delivery status directly on the platform and know exactly when your order will arrive. With convenient doorstep delivery, finding the right products for your child has never been more straightforward or stress-free."
   },
   {
      image: LandMother,
      title: "Parent and Children",
      description: "Empowering parents to take control of their child’s care, Autism Compass provides easy access to book doctor appointments, explore therapy options, and track updates all in one place. With the ability to view details about doctors, therapy locations, and even purchase specialized products for home delivery, parents have everything they need to ensure their child’s well-being right at their fingertips."
   },
   {
      image: LandDoc,
      title: "Doctor",
      description: "Doctors can connect with families, offer tailored suggestions. By recommending therapies and providing timely feedback, doctors ensure each child’s unique needs are met, creating a streamlined experience for both medical professionals and parents working together."
   },
   {
      image: LandTreat,
      title: "Therapy",
      description: "Autism Compass offers a comprehensive list of therapies tailored to various needs, with detailed descriptions and locations to help parents and children find the right support. Easily browse therapy options, view where sessions are available, and book appointments directly through the platform. This seamless system ensures that finding and scheduling therapies is convenient and accessible."
   },
   {
      image: LandTeaching,
      title: "Teacher",
      description: "Teachers can offer specialized courses designed for children with autism, where parents and children can select classes, submit assignments, and interact with learning materials. Autism Compass fosters an accessible, supportive environment where education is tailored to individual learning styles and progress can be tracked with ease."
   },
   {
      image: LandDelivery,
      title: "Shops & Delivery",
      description: "Autism Compass offers a thoughtful selection of products, including toys and items designed to support children with autism. Users can easily browse, add products to their cart, and complete purchases smoothly. Track your delivery status directly on the platform and know exactly when your order will arrive. With convenient doorstep delivery, finding the right products for your child has never been more straightforward or stress-free."
   }
]


const Landing = () => {

   const FAST_DURATION = 45;
   const SLOW_DURATION = 100;

   const [duration, setDuration] = useState(FAST_DURATION);
   let [ref, { width }] = useMeasure();

   const xTranslation = useMotionValue(0);

   const [mustFinish, setMustFinish] = useState(false);
   const [rerender, setRerender] = useState(false);

   useEffect(() => {
      let controls;
      let finalPosition = -5 * width;

      if (mustFinish) {
         controls = animate(xTranslation, [xTranslation.get(), finalPosition], {
            ease: "linear",
            duration: duration * (1 - xTranslation.get() / finalPosition),
            onComplete: () => {
               setMustFinish(false);
               setRerender(!rerender);
            },
         });
      } else {
         controls = animate(xTranslation, [0, finalPosition], {
            ease: "linear",
            duration: duration,
            repeat: Infinity,
            repeatType: "loop",
            repeatDelay: 0,
         });
      }

      return controls?.stop;
   }, [rerender, xTranslation, duration, width]);


   const targetRef = React.useRef(null);
   const { scrollYProgress } = useScroll({ traget: targetRef });

   const x = useTransform(scrollYProgress, [0, 1], ['0%', '-55%']);

   return (
      <motion.div className="langingPage"
      >
         <ul class="puzzle-circles">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
         </ul>
         <Reveal>
            <div className="Nav">
               <Link to="/login" className="login">LOG IN</Link>
               <Link to="/signup" className="register">SIGN UP</Link>
            </div>
            <div className="page1">
               <div className="land-main">
                  <div className="land-main-img">
                     <img className="im3" src={LandPuzzle} alt="im2" width={300} height={300} />
                  </div>
                  <motion.div
                     className="land-main-info-text"
                     initial="hidden"
                     animate="show"
                     variants={fadeInUpAnimation}
                  >
                     <motion.h1
                        variants={fadeInUpAnimation}
                     >  Helping You Navigate, Together 💖
                     </motion.h1>
                     <motion.p
                        variants={fadeInUpAnimation}
                     >
                        <motion.strong
                           variants={fadeInUpAnimation}
                        >AUTISM COMPASS  </motion.strong>
                        is your dedicated partner in navigating the complexities of autism care. With expert guidance, tailored resources, and compassionate support, we help families find the right path for their loved ones, ensuring no journey is taken alone.
                     </motion.p>
                     <motion.button
                        className="view-more-button"
                        variants={fadeInUpAnimation}
                     >SIGN UP FOR FREE</motion.button>
                  </motion.div>
               </div>
               <div className="land-side-img">
                  <img src={LandFam} alt="course" />
               </div>
            </div>
         </Reveal>
         <Reveal>
            <div className="our-offers"
            >
               <motion.div
                  initial="hidden"
                  animate="show"
                  variants={fadeInUpAnimation}
               >
                  <motion.h1
                     variants={fadeInUpAnimation}
                  >Our Offers</motion.h1>
               </motion.div>
               <motion.div className="offer-card-container"
               >
                  {weOffers.map((offer, index) => (
                     <motion.div key={index}
                        className="absolute left-0 flex gap-4"
                        style={{ x: xTranslation }}
                        ref={ref}
                        onHoverStart={() => {
                           setMustFinish(true);
                           setDuration(SLOW_DURATION);
                        }}
                        onHoverEnd={() => {
                           setMustFinish(true);
                           setDuration(FAST_DURATION);
                        }}
                     >
                        <OfferCard image={offer.image} title={offer.title} description={offer.description} />
                     </motion.div>
                  ))}
               </motion.div>
            </div>
         </Reveal>
      </motion.div>
   );
};

export default Landing;
