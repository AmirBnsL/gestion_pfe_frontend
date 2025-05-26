import { YearDetailPage } from "@/app/components/admin/project-distribution/year-detail-page"

interface PageProps {
  params: {
    year: string
  }
}

export default function YearDetail({ params }: PageProps) {
  return <YearDetailPage year={params.year} />
}
