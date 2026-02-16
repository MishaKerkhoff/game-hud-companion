interface PlaceholderPageProps {
  title: string;
}

export default function PlaceholderPage({ title }: PlaceholderPageProps) {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="hud-panel px-10 py-8 text-center">
        <h2 className="font-game text-2xl text-primary game-outline mb-2">{title}</h2>
        <p className="font-game text-sm text-muted-foreground game-outline">Coming Soon</p>
      </div>
    </div>
  );
}
