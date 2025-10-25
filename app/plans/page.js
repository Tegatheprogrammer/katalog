import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, X, ArrowLeft, Star } from "lucide-react"

export default function PlansPage() {
  const plans = [
    {
      name: "Free",
      price: "₦0",
      period: "forever",
      description: "Perfect for getting started",
      popular: false,
      features: [
        { name: "Basic Dashboard", included: true },
        { name: "Inventory Management (up to 50 products)", included: true },
        { name: "Basic Reporting", included: true },
        { name: "Email Support", included: true },
        { name: "Logistics Management", included: false },
        { name: "Advanced Accounting", included: false },
        { name: "Analytics Dashboard", included: false },
        { name: "Custom Domain", included: false },
        { name: "Priority Support", included: false },
        { name: "API Access", included: false },
      ],
    },
    {
      name: "Starter",
      price: "₦500",
      period: "per month",
      description: "Great for small businesses",
      popular: true,
      features: [
        { name: "Everything in Free", included: true },
        { name: "Inventory Management (up to 500 products)", included: true },
        { name: "Logistics Management", included: true },
        { name: "Basic Accounting", included: true },
        { name: "Advanced Reporting", included: true },
        { name: "Phone Support", included: true },
        { name: "Analytics Dashboard", included: false },
        { name: "Custom Domain", included: false },
        { name: "Priority Support", included: false },
        { name: "API Access", included: false },
      ],
    },
    {
      name: "Professional",
      price: "₦1,000",
      period: "per month",
      description: "Perfect for growing businesses",
      popular: false,
      features: [
        { name: "Everything in Starter", included: true },
        { name: "Unlimited Products", included: true },
        { name: "Advanced Accounting", included: true },
        { name: "Analytics Dashboard", included: true },
        { name: "Custom Domain", included: true },
        { name: "Priority Support", included: true },
        { name: "Basic API Access", included: true },
        { name: "Multi-user Access (up to 5)", included: true },
        { name: "Advanced Integrations", included: false },
        { name: "White-label Solution", included: false },
      ],
    },
    {
      name: "Enterprise",
      price: "₦5,000",
      period: "per month",
      description: "For large-scale operations",
      popular: false,
      features: [
        { name: "Everything in Professional", included: true },
        { name: "Unlimited Users", included: true },
        { name: "Advanced Integrations", included: true },
        { name: "White-label Solution", included: true },
        { name: "Dedicated Account Manager", included: true },
        { name: "Custom Features", included: true },
        { name: "Full API Access", included: true },
        { name: "99.9% SLA Guarantee", included: true },
        { name: "On-premise Deployment", included: true },
        { name: "Advanced Security Features", included: true },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="glass-strong fixed top-0 w-full z-50 border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">M</span>
            </div>
            <span className="text-xl font-bold">MyKatalog</span>
          </Link>

          <div className="flex items-center space-x-4">
            <Link href="/auth">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/auth">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto">
          {/* Back to Home */}
          <Link
            href="/"
            className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>

          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Choose Your Plan</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Start free and upgrade as your business grows. All plans include our core features with no setup fees.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {plans.map((plan, index) => (
              <Card key={index} className={`glass border-0 relative ${plan.popular ? "ring-2 ring-primary" : ""}`}>
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground">
                    <Star className="h-3 w-3 mr-1" />
                    Most Popular
                  </Badge>
                )}

                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">/{plan.period}</span>
                  </div>
                  <CardDescription className="mt-2">{plan.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  <Link href="/auth">
                    <Button
                      className={`w-full ${plan.popular ? "bg-primary text-primary-foreground" : ""}`}
                      variant={plan.popular ? "default" : "outline"}
                    >
                      {plan.name === "Free" ? "Get Started" : "Start Free Trial"}
                    </Button>
                  </Link>

                  <div className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-3">
                        {feature.included ? (
                          <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                        ) : (
                          <X className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                        )}
                        <span className={`text-sm ${feature.included ? "text-foreground" : "text-muted-foreground"}`}>
                          {feature.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* FAQ Section */}
          <div className="mt-24 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold mb-2">Can I change plans anytime?</h3>
                <p className="text-muted-foreground">
                  Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll
                  prorate any billing differences.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Is there a free trial?</h3>
                <p className="text-muted-foreground">
                  All paid plans come with a 14-day free trial. No credit card required to start. You can also use our
                  Free plan indefinitely.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">What payment methods do you accept?</h3>
                <p className="text-muted-foreground">
                  We accept all major credit cards, bank transfers, and mobile money payments including MTN Mobile Money
                  and Airtel Money.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Do you offer refunds?</h3>
                <p className="text-muted-foreground">
                  Yes, we offer a 30-day money-back guarantee on all paid plans. If you're not satisfied, we'll refund
                  your payment in full.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-24 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of Nigerian businesses already using MyKatalog
            </p>
            <Link href="/auth">
              <Button size="lg">Start Your Free Trial</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
