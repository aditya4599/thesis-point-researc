interface StatBlockProps {
  data: {
    value: string;
    label: string;
  };
}

export function StatBlock({ data }: StatBlockProps) {
  return (
    <div className="my-6 text-center">
      <div className="font-serif text-7xl tracking-tight text-neutral-950">
        {data.value}
      </div>

      <div className="mt-4 text-sm uppercase tracking-[0.18em] text-neutral-500">
        {data.label}
      </div>
    </div>
  );
}