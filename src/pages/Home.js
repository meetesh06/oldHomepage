import { Masonry } from "@mui/lab";
import TextCard from "../components/TextCard";

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
      <TextCard key={`home-${9}`} title="Highlights" text={HIGHLIGHTSTEXT} links={HIGHLIGHTSLINKS}/>

    </Masonry>
  )
}

export default Home