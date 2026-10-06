import type { Graph, Thing, WithContext } from "schema-dts";

type JsonLdProps = {
  data: Graph | WithContext<Thing>;
};

function serialize(data: JsonLdProps["data"]) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function JsonLd({ data }: JsonLdProps) {
  return <script type="application/ld+json">{serialize(data)}</script>;
}
