import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Check } from "lucide-react"

interface PricingCardProps {
  title: string
  price: string
  period: string
  description: string
  features: string[]
  popular?: boolean
}

export default function PricingCard({
  title,
  price,
  period,
  description,
  features,
  popular = false,
}: PricingCardProps) {
  return (
    <Card
      className={`border-0 transition-all duration-300 ${
        popular
          ? "shadow-xl scale-105 relative z-10 bg-gradient-to-br from-blue-50 to-cyan-50"
          : "shadow-lg hover:shadow-xl"
      }`}
    >
      {popular && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
          แนะนำ
        </div>
      )}

      <CardHeader className="pt-8 pb-4">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600 mb-4">{description}</p>
          <div className="flex items-end justify-center">
            <span className="text-4xl font-bold text-gray-900">{price}</span>
            <span className="text-gray-600 ml-1">{period}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pb-4">
        <ul className="space-y-3">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
              <span className="text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter className="pb-8">
        <Button
          className={`w-full py-6 text-base ${
            popular
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50"
          }`}
        >
          {popular ? "เริ่มต้นใช้งานทันที" : "เลือกแพ็คเกจนี้"}
        </Button>
      </CardFooter>
    </Card>
  )
}
