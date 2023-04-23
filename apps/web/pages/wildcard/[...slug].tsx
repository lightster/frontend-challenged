import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import dynamic from "next/dynamic";
import { ParsedUrlQuery } from "querystring";
import React from "react";

interface Props {
  slug: keyof typeof paths;
}

interface Params extends ParsedUrlQuery {
  slug: string[];
}

const paths = {
  "hi/a": dynamic(() => import("../../components/A")),
  "hi/b": dynamic(() => import("../../components/B")),
};

const Catchall: NextPage<Props> = function ({ slug }) {
  const Renderer = paths[slug];

  return <Renderer />;
};

export const getStaticProps: GetStaticProps<Props, Params> = async function ({
  params: { slug } = { slug: [] },
}) {
  const combinedSlug = slug.join("/");
  if (!Object.hasOwn(paths, combinedSlug)) {
    return { notFound: true };
  }

  return { props: { slug: combinedSlug as keyof typeof paths } };
};

export const getStaticPaths: GetStaticPaths<Params> = async function () {
  return {
    paths: Object.keys(paths).map((path) => ({
      params: {
        slug: path.split("/"),
      },
    })),
    fallback: false,
  };
};

export default Catchall;
