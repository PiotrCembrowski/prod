export function KnightCharacter({ level }: { level: number }) {
  // Determine knight tier based on level
  const tier =
    level < 5
      ? "squire"
      : level < 10
      ? "knight"
      : level < 20
      ? "elite"
      : "legendary";

  return (
    <div className="relative aspect-square w-full max-w-[280px] mx-auto">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-transparent rounded-xl blur-2xl" />
      <div className="relative h-full w-full flex items-center justify-center">
        <img
          src={`/pixel-art-.jpg?height=240&width=240&query=pixel+art+${tier}+knight+character+game+sprite+medieval+armor`}
          alt={`Level ${level} Knight`}
          className="object-contain drop-shadow-2xl"
        />
      </div>
      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-4 py-1 bg-card border border-border rounded-full">
        <span className="text-xs font-medium text-primary capitalize">
          {tier} Tier
        </span>
      </div>
    </div>
  );
}
