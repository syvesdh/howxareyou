import { Metadata } from "next";
import { notFound } from "next/navigation";
import QuizEngine from "@/components/QuizEngine";
import { loadQuizConfig } from "@/lib/quiz-loader";

interface QuizPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({
  params,
}: QuizPageProps): Promise<Metadata> {
  const { id } = await params;
  const config = loadQuizConfig(id);

  if (!config) {
    return {
      title: "Quiz Not Found",
    };
  }

  return {
    title: `${config.meta.title} | Viral Quiz Engine`,
    description: config.meta.description,
    openGraph: {
      title: config.meta.title,
      description: config.meta.description,
      type: "website",
    },
  };
}

export default async function QuizPage({ params }: QuizPageProps) {
  const { id } = await params;
  const config = loadQuizConfig(id);

  if (!config) {
    notFound();
  }

  return (
    <main
      className="min-h-screen"
      style={{
        background: `linear-gradient(to bottom, ${config.meta.theme.background}dd, ${config.meta.theme.background})`,
      }}
    >
      <QuizEngine config={config} />
    </main>
  );
}
