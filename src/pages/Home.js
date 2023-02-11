import { Masonry } from "@mui/lab";
import TextCard from "../components/TextCard";

import { NEWSITEMS, RESEARCHINTERESTS, LOOKINGFORTEXT, ABOUTME, SKILLSTEXT, SKILLSITEMS, QUOTE, INTERESTS, EDUCATION } from "../config";

import {AnimatePresence, motion} from 'framer-motion';
import { useEffect } from "react";



function Home(props) {
  const staticContentVariants = {
    show: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6
      }
    },
    out: {
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 1
      }
    }
  }

  const { preloadList } = props;

  const doPreload = () => {
    preloadList.forEach(e => {
      e.preload()
    })
  }
  return (
      <Masonry 
        component={motion.div}
        initial="out"
        animate="show"
        // exit="out"
        variants={staticContentVariants}
        onAnimationComplete={doPreload}
        columns={{ xs: 1, sm: 1, md: 3, lg: 3 }}
        spacing={0}
        >
        <TextCard key={`home-${1}`} title="News" 
                textList={NEWSITEMS}/>
        <TextCard key={`home-${2}`} title="Research Interests" text={RESEARCHINTERESTS} />

        <TextCard key={`home-${3}`} title="Looking For" text={LOOKINGFORTEXT} />
        <TextCard key={`home-${4}`} title="Something About Me" text={ABOUTME} />
        <TextCard
                key={`home-${5}`}
                title="Skills"
                text={SKILLSTEXT}
                textList={SKILLSITEMS}
                />
        <TextCard key={`home-${6}`} text={QUOTE} />
        <TextCard
          key={`home-${7}`}
          title="Interests"
          text={INTERESTS}
        />
        <TextCard key={`home-${8}`} title="Education" textList={EDUCATION}/>

      </Masonry>
  )
}

export default Home