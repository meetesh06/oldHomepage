import Head from "next/head"
import StaticCardPage from "../components/StaticCardPage"

import { DESCRIPTION_HOME, TITLE_HOME } from "@/config"

export default function(props) {

  return (
    <div>
      <Head>
        <title>{TITLE_HOME}</title>
        <meta
        name="description"
        content={DESCRIPTION_HOME}
        />
      </Head>
      <StaticCardPage />
    </div>
  )
}

