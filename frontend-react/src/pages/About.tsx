export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20 space-y-10">
      {/* Title */}
      <header className="space-y-3">
        <h1 className="text-3xl font-bold text-slate-900">
          About SoilSense
        </h1>
        <p className="text-slate-500">
          An intelligent soil health analysis platform by CivoraX
        </p>
      </header>

      {/* Overview */}
      <section className="space-y-4">
        <p className="text-slate-700 leading-relaxed">
          SoilSense is an AI-powered soil health analysis system designed to
          help farmers, agronomists, and agricultural decision-makers
          understand the true condition of their soil using data-driven
          insights. The platform focuses on transforming raw soil parameters
          into meaningful, actionable guidance.
        </p>

        <p className="text-slate-700 leading-relaxed">
          By combining soil nutrient analysis with intelligent scoring,
          confidence evaluation, and trend detection, SoilSense goes beyond
          basic soil reports to deliver transparent and explainable
          recommendations.
        </p>
      </section>

      {/* Why SoilSense */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-900">
          Why SoilSense?
        </h2>

        <ul className="list-disc list-inside space-y-2 text-slate-700">
          <li>
            Simplifies complex soil data into clear health indicators
          </li>
          <li>
            Provides explainable AI insights rather than black-box scores
          </li>
          <li>
            Highlights trends, stability, and confidence over time
          </li>
          <li>
            Helps users take informed and timely soil management decisions
          </li>
        </ul>
      </section>

      {/* Intelligence & Explainability */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-900">
          Explainable Intelligence
        </h2>

        <p className="text-slate-700 leading-relaxed">
          A key focus of SoilSense is explainability. Every soil health score
          is supported by confidence metrics derived from data stability,
          consistency, and historical sample volume. Users can clearly see
          why a recommendation was made and how reliable it is.
        </p>

        <p className="text-slate-700 leading-relaxed">
          This approach builds trust in AI-driven systems and ensures that
          insights remain transparent, interpretable, and actionable.
        </p>
      </section>

      {/* Vision */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-900">
          Vision
        </h2>

        <p className="text-slate-700 leading-relaxed">
          SoilSense aligns with CivoraX’s mission to promote sustainable and
          intelligent agricultural solutions. The long-term vision includes
          predictive soil insights, adaptive recommendations, and deeper
          integration of machine learning to support smarter farming
          practices.
        </p>
      </section>
    </div>
  );
}