import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/navbar";

export default function Home() {
  const features = [
    {
      emoji: "🧠",
      title: "Spaced Repetition",
      description:
        "SM-2 algorithm schedules your reviews at optimal intervals for long-term retention.",
    },
    {
      emoji: "🍜",
      title: "Food Rewards",
      description:
        "Every study session earns authentic Vietnamese and Asian cuisine with real nutritional data.",
    },
    {
      emoji: "🔥",
      title: "Streak System",
      description:
        "Build daily habits with streak multipliers up to 3x for 100-day streaks.",
    },
    {
      emoji: "🏆",
      title: "Certifications",
      description:
        "Track progress for CCNA, Security+, AWS SAA, and more with structured learning paths.",
    },
    {
      emoji: "✍️",
      title: "Feynman Technique",
      description:
        "Deepen understanding by explaining concepts simply. Identify knowledge gaps.",
    },
    {
      emoji: "🍅",
      title: "Pomodoro Timer",
      description:
        "Stay focused with 25-minute work intervals and automatic session logging.",
    },
  ];

  const foods = [
    { emoji: "🍜", name: "Phở Bò" },
    { emoji: "🥖", name: "Bánh Mì" },
    { emoji: "🌮", name: "Fresh Rolls" },
    { emoji: "☕", name: "Cà Phê Sữa Đá" },
    { emoji: "🍱", name: "Cơm Tấm" },
    { emoji: "🫕", name: "Bún Bò Huế" },
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative py-24 px-4 text-center hero-gradient overflow-hidden">
          <div className="max-w-4xl mx-auto">
            {/* Vietnamese proverb */}
            <div className="mb-8">
              <h1 className="text-4xl md:text-6xl font-serif font-bold text-yellow-400 mb-4">
                Có Thực Mới Vực Được Đạo
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground italic">
                &ldquo;You need to eat to have strength to follow the path&rdquo;
              </p>
            </div>

            {/* Food emoji decoration */}
            <div
              className="flex justify-center gap-3 mb-8 text-4xl"
              aria-hidden="true"
            >
              {foods.map((f) => (
                <span
                  key={f.name}
                  title={f.name}
                  className="hover:scale-110 transition-transform cursor-default"
                >
                  {f.emoji}
                </span>
              ))}
            </div>

            <p className="text-xl md:text-2xl font-semibold mb-4">
              Earn your food through knowledge
            </p>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-10">
              Transform certification study (CCNA, Security+, AWS) into a
              delicious journey. Complete study sessions, labs, and quizzes to
              earn authentic Vietnamese cuisine with real calorie counts.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="bg-red-900 hover:bg-red-800 text-lg px-8 py-6"
              >
                <Link href="/dashboard">Start Your Journey 🚀</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="text-lg px-8 py-6"
              >
                <Link href="/collection">View Food Collection 🍜</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Stats Banner */}
        <section className="border-y border-border bg-card/50 py-8 px-4">
          <div className="max-w-4xl mx-auto grid grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-3xl font-bold text-yellow-400">30+</p>
              <p className="text-sm text-muted-foreground">Food Rewards</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-orange-400">6</p>
              <p className="text-sm text-muted-foreground">
                Certifications
              </p>
            </div>
            <div>
              <p className="text-3xl font-bold text-green-400">SM-2</p>
              <p className="text-sm text-muted-foreground">
                SRS Algorithm
              </p>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-serif font-bold text-center mb-4">
              Scientifically Proven Learning Methods
            </h2>
            <p className="text-muted-foreground text-center mb-12">
              Powered by research-backed techniques to maximize retention
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="rounded-xl border border-border bg-card/50 p-6 hover:border-yellow-700/50 transition-colors"
                >
                  <span
                    className="text-3xl mb-3 block"
                    aria-hidden="true"
                  >
                    {feature.emoji}
                  </span>
                  <h3 className="text-lg font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 text-center bg-red-950/20 border-t border-border">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-serif font-bold mb-4">
              Ready to earn your first meal?
            </h2>
            <p className="text-muted-foreground mb-8">
              Start a 25-minute Pomodoro session and earn your first bowl of
              Phở!
            </p>
            <Button
              asChild
              size="lg"
              className="bg-orange-700 hover:bg-orange-600"
            >
              <Link href="/study">Start Studying Now 🍅</Link>
            </Button>
          </div>
        </section>
      </div>
    </>
  );
}
