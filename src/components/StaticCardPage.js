import { Masonry } from "@mui/lab";
import DisplayCard from "./DisplayCard";

import { NEWSITEMS, RESEARCHINTERESTS, LOOKINGFORTEXT, ABOUTME, SKILLSTEXT, SKILLSITEMS, QUOTE, INTERESTS, EDUCATION, HIGHLIGHTSTEXT, HIGHLIGHTSLINKS } from "../config";

import {motion} from 'framer-motion';


function Home(props) {
  const staticContentVariants = {
    hidden: {opacity: 0, scale: 0.90 },
    show: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3
      }
    },
    out: {
      opacity: 0,
      scale: 0.90,
      transition: {
        duration: 0.3
      }
    }
  }
  return (
    <Masonry 
      component={motion.div}
      initial="hidden"
      animate="show"
      exit="out"
      variants={staticContentVariants}
      columns={{ xs: 1, sm: 1, md: 3, lg: 3 }}
      spacing={0}
      >
      <DisplayCard key={`home-${1}`} title="News" 
              textList={NEWSITEMS}/>
      <DisplayCard key={`home-${2}`} title="Research Interests" text={RESEARCHINTERESTS} />

      <DisplayCard key={`home-${3}`} title="Looking For" text={LOOKINGFORTEXT} />
      <DisplayCard key={`home-${4}`} title="Something About Me" text={ABOUTME} />
      <DisplayCard
              key={`home-${5}`}
              title="Skills"
              text={SKILLSTEXT}
              textList={SKILLSITEMS}
              />
      <DisplayCard key={`home-${6}`} text={QUOTE} />
      <DisplayCard
        key={`home-${7}`}
        title="Interests"
        text={INTERESTS}
      />
      <DisplayCard key={`home-${8}`} title="Education" textList={EDUCATION}/>
      <DisplayCard key={`home-${9}`} title="Highlights" text={HIGHLIGHTSTEXT} links={HIGHLIGHTSLINKS}/>

    </Masonry>
  )
}

export default Home