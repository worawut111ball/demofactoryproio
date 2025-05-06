import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, DollarSign, BarChart } from "lucide-react"

interface StatsCardProps {
  title: string
  value: string
  description: string
  icon: "chart" | "dollar" | "trending-up"
}

export default function StatsCard({ title, value, description, icon }: StatsCardProps) {
  const getIcon = () => {
    switch (icon) {
      case "chart":
        return <BarChart className="h-10 w-10 text-blue-500" />
      case "dollar":
        return <DollarSign className="h-10 w-10 text-blue-600" />
      case "trending-up":
        return <TrendingUp className="h-10 w-10 text-blue-700" />
      default:
        return <BarChart className="h-10 w-10 text-blue-500" />
    }
  }

  return (
    <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-start">
          <div className="mr-4">
            <div className="p-3 bg-gray-100 rounded-lg">{getIcon()}</div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
            <p className="text-3xl font-bold text-gray-900 mb-2">{value}</p>
            <p className="text-gray-600">{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
