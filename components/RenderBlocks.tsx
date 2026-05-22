import Image from "next/image";

interface Block {
  type: string;
  data: any;
}

export function RenderBlocks({
  blocks,
}: {
  blocks: Block[];
}) {
  return (
    <div className="space-y-10">
      {blocks.map((block, index) => {
        switch (block.type) {

          case "heading":
            return (
              <h2
                key={index}
                className="font-serif text-4xl leading-tight text-midnight"
              >
                {block.data.text}
              </h2>
            );

          case "paragraph":
            return (
              <p
                key={index}
                className="text-lg leading-9 text-slate-700"
              >
                {block.data.content}
              </p>
            );

          case "quote":
            return (
              <div
                key={index}
                className="border-l-4 border-amber-500 pl-6 py-4"
              >
                <p className="font-serif text-3xl italic leading-relaxed text-slate-800">
                  &quot;{block.data.quote}&quot;
                </p>

                {block.data.author && (
                  <p className="mt-4 text-sm text-slate-500">
                    {block.data.author}
                  </p>
                )}
              </div>
            );

          case "key_takeaways":
            return (
              <div
                key={index}
                className="rounded-3xl bg-[#f5f1ea] p-10"
              >
                <h2 className="mb-8 font-serif text-4xl text-midnight">
                  Key takeaways
                </h2>

                <div className="space-y-5">
                  {block.data.items.map(
                    (item: string, i: number) => (
                      <div
                        key={i}
                        className="flex gap-4"
                      >
                        <span className="mt-3 h-2 w-2 rounded-full bg-amber-600" />

                        <p className="text-lg leading-8 text-slate-700">
                          {item}
                        </p>
                      </div>
                    )
                  )}
                </div>
              </div>
            );

          case "image":
            return (
              <div key={index}>
                <Image
                  src={block.data.url}
                  alt={
                    block.data.caption ||
                    "Article image"
                  }
                  width={1200}
                  height={700}
                  className="w-full rounded-3xl object-cover"
                />

                {block.data.caption && (
                  <p className="mt-3 text-sm text-slate-500">
                    {block.data.caption}
                  </p>
                )}
              </div>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}