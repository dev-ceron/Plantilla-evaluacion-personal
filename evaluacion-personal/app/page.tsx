import { EvaluationForm } from "@/components/ui/evaluation-form"

export default function Home() {
  return (
    <main className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold text-center mb-6">Evaluación de Personal</h1>
      <EvaluationForm />
    </main>
  )
}

