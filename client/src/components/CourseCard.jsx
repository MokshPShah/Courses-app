// components/CourseCard.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface CourseCardProps {
  title: string
  description: string
  image: string
}

const CourseCard: React.FC<CourseCardProps> = ({ title, description, image }) => {
  return (
    <Card className="w-full max-w-md shadow-sm border-muted bg-white">
      <CardHeader>
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover rounded-md"
        />
      </CardHeader>
      <CardTitle className="text-xl font-semibold px-4">{title}</CardTitle>
      <CardContent className="text-sm text-muted-foreground px-4 pb-4">
        {description}
      </CardContent>
    </Card>
  )
}

export default CourseCard
