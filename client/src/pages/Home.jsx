import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState(null);
  const [activePlan, setActivePlan] = useState("pro");

  const features = [
    {
      icon: "🎨",
      title: "AI-Powered Design",
      description: "Generate stunning thumbnails with advanced AI models trained on viral content."
    },
    {
      icon: "⚡",
      title: "Instant Generation",
      description: "Get professional thumbnails in seconds, not hours. No design skills needed."
    },
    {
      icon: "🎯",
      title: "Click-Optimized",
      description: "AI analyzes top-performing thumbnails to maximize your click-through rate."
    },
    {
      icon: "🔄",
      title: "Recreate & Refine",
      description: "Upload existing thumbnails and let AI recreate them with improvements."
    }
  ];

  const testimonials = [
    {
      name: "Alex Rivera",
      role: "Tech YouTuber • 500K subs",
      content: "Thumblify doubled my CTR overnight. The AI understands what makes people click.",
      avatar: "🧑‍💻",
      rating: 5
    },
    {
      name: "Sarah Chen",
      role: "Lifestyle Creator • 1.2M subs",
      content: "I used to spend hours on thumbnails. Now I generate 10 options in under a minute.",
      avatar: "👩‍🎨",
      rating: 5
    },
    {
      name: "Marcus Johnson",
      role: "Gaming Channel • 800K subs",
      content: "The gaming style thumbnails are insane. My viewers think I hired a designer.",
      avatar: "🎮",
      rating: 5
    }
  ];

  const plans = [
    {
      name: "Starter",
      price: "Free",
      credits: 15,
      features: ["15 free credits", "All styles", "Standard quality", "Community access"],
      id: "starter"
    },
    {
      name: "Pro",
      price: "$9",
      credits: 100,
      features: ["100 credits/mo", "Priority generation", "HD quality", "Recreate mode", "No watermark"],
      id: "pro",
      popular: true
    },
    {
      name: "Unlimited",
      price: "$29",
      credits: "∞",
      features: ["Unlimited credits", "Fastest generation", "4K quality", "API access", "Priority support"],
      id: "unlimited"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-purple-950 to-gray-950 text-white overflow-hidden">

      {/* Hero Section */}
      <section className="relative px-6 py-20 sm:px-8 lg:px-16">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-brand-pink/20 blur-[120px]"></div>
          <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-brand-purple/20 blur-[120px]"></div>
        </div>
        <div className="mx-auto max-w-7xl relative">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
            <div className="space-y-6">
              <span className="inline-flex items-center gap-2 rounded-full bg-brand-purple/10 px-4 py-1.5 text-sm font-medium text-brand-purple ring-1 ring-brand-purple/20">
                ✨ AI-Powered Thumbnail Generator
              </span>
              <h1 className="text-5xl font-extrabold leading-tight sm:text-6xl lg:text-7xl">
                <span className="gradient-text">Thumbnails</span> that
                <br />get <span className="gradient-text">clicks</span>
              </h1>
              <p className="max-w-lg text-lg text-slate-400">
                Create scroll-stopping YouTube thumbnails in seconds using AI. 
                No design skills required — just describe your vision.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => navigate("/generate")}
                  className="group rounded-2xl bg-gradient-to-r from-brand-pink to-brand-purple px-8 py-4 text-lg font-bold text-white shadow-glow transition-all duration-300 hover:scale-105 hover:shadow-[0_0_60px_rgba(255,79,216,0.4)]"
                >
                  Generate Now →
                </button>
                <button
                  onClick={() => navigate("/community")}
                  className="rounded-2xl border border-white/10 bg-white/5 px-8 py-4 text-lg font-semibold text-slate-300 backdrop-blur transition hover:bg-white/10 hover:text-white"
                >
                  View Creations
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="relative mx-auto w-full max-w-md">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-brand-pink/30 to-brand-purple/30 blur-2xl"></div>
                <div className="glass-card relative rounded-3xl p-6">
                  <div className="aspect-video rounded-2xl bg-gradient-to-br from-brand-pink/20 via-brand-purple/20 to-brand-cyan/20 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl mb-3">🎬</div>
                      <p className="text-sm text-slate-400">AI-generated preview</p>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <span className="rounded-full bg-brand-pink/20 px-3 py-1 text-xs text-brand-pink">Cinematic</span>
                    <span className="rounded-full bg-brand-purple/20 px-3 py-1 text-xs text-brand-purple">16:9</span>
                    <span className="rounded-full bg-brand-cyan/20 px-3 py-1 text-xs text-brand-cyan">AI Enhanced</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative px-6 py-20 sm:px-8 lg:px-16 bg-black/30">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Why creators <span className="gradient-text">love</span> Thumblify
            </h2>
            <p className="mt-3 text-slate-400">Everything you need to create thumbnails that convert</p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`glass-card rounded-3xl p-6 transition-all duration-300 cursor-pointer ${
                  hoveredCard === index
                    ? "scale-105 border-brand-purple/40 shadow-[0_0_40px_rgba(139,92,246,0.15)]"
                    : "hover:scale-[1.02]"
                }`}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="mb-4 text-4xl">{feature.icon}</div>
                <h3 className="mb-2 text-lg font-bold text-white">{feature.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative px-6 py-20 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Loved by <span className="gradient-text">creators</span>
            </h2>
            <p className="mt-3 text-slate-400">Join thousands of YouTubers using Thumblify</p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="glass-card rounded-3xl p-6">
                <div className="mb-4 flex gap-1">
                  {Array.from({ length: testimonial.rating }, (_, i) => (
                    <span key={i} className="text-yellow-400">★</span>
                  ))}
                </div>
                <p className="mb-6 text-slate-300 leading-relaxed">"{testimonial.content}"</p>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-purple/20 text-xl">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{testimonial.name}</p>
                    <p className="text-xs text-slate-400">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="relative px-6 py-20 sm:px-8 lg:px-16 bg-black/50">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Simple <span className="gradient-text">pricing</span>
            </h2>
            <p className="mt-3 text-slate-400">Start free, upgrade when you need more</p>
          </div>
          <div className="grid gap-8 md:grid-cols-3 lg:gap-6">
            {plans.map((plan) => (
              <div
                key={plan.id}
                onClick={() => setActivePlan(plan.id)}
                className={`glass-card relative cursor-pointer rounded-3xl p-8 transition-all duration-300 ${
                  activePlan === plan.id
                    ? "scale-105 border-brand-purple/40 shadow-[0_0_60px_rgba(139,92,246,0.2)]"
                    : "hover:scale-[1.02]"
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-brand-pink to-brand-purple px-4 py-1 text-xs font-bold text-white">
                    Most Popular
                  </span>
                )}
                <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold gradient-text">{plan.price}</span>
                  {plan.price !== "Free" && <span className="text-slate-400">/mo</span>}
                </div>
                <p className="mt-2 text-sm text-slate-400">{plan.credits} credits</p>
                <button
                  onClick={() => navigate("/signup")}
                  className={`mt-6 w-full rounded-xl py-3 text-sm font-bold transition ${
                    activePlan === plan.id
                      ? "bg-gradient-to-r from-brand-pink to-brand-purple text-white hover:opacity-90"
                      : "bg-white/5 text-slate-300 hover:bg-white/10"
                  }`}
                >
                  Get Started
                </button>
                <ul className="mt-6 space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-slate-300">
                      <span className="text-brand-purple">✓</span> {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative px-6 py-20 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-4xl">
          <div className="glass-card relative overflow-hidden rounded-3xl p-12 text-center">
            <div className="absolute inset-0 bg-gradient-to-r from-brand-pink/10 to-brand-purple/10"></div>
            <div className="relative">
              <h2 className="text-3xl font-bold sm:text-4xl">
                Ready to create <span className="gradient-text">stunning</span> thumbnails?
              </h2>
              <p className="mt-4 text-lg text-slate-400">
                Join thousands of creators using AI to grow their channel
              </p>
              <button
                onClick={() => navigate("/generate")}
                className="mt-8 rounded-2xl bg-gradient-to-r from-brand-pink to-brand-purple px-10 py-4 text-lg font-bold text-white shadow-glow transition-all duration-300 hover:scale-105 hover:shadow-[0_0_60px_rgba(255,79,216,0.4)]"
              >
                Generate Your First Thumbnail →
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}