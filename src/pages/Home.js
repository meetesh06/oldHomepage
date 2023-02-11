import { Masonry } from "@mui/lab";
import TextCard from "../components/TextCard";

import { NEWSITEMS, RESEARCHINTERESTS, LOOKINGFORTEXT, ABOUTME, SKILLSTEXT, SKILLSITEMS, QUOTE, INTERESTS, EDUCATION } from "../config";

import {AnimatePresence, motion} from 'framer-motion';
import { useEffect } from "react";


let firstLoad = false

function Home(props) {
  const staticContentVariants = {
    initial: {opacity: 0, scale: 0.90 },
    show: {
      opacity: 1,
      scale: 1
    },
    out: {
      opacity: 0,
      scale: 0.90
    }
  }

  const { preloadList } = props;
  useEffect(() => {
    preloadList.forEach(e => {
      e.preload()
    })
  }, []);
  let firstLoadCheck = () => {
    if (!firstLoad) { firstLoad = true; return false; }
    return true
  }
  return (
    // <AnimatePresence initial={firstLoadCheck()}>
      <Masonry 
        component={motion.div}
        initial="initial"
        animate="show"
        exit="out"
        variants={staticContentVariants}
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
    // </AnimatePresence>
  )
}

export default Home