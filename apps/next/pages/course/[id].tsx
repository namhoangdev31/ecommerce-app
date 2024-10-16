import CourseDetailScreen from 'app/features/web/course/detail-screen'
import { GetStaticPaths, GetStaticProps } from 'next'

// Thêm hàm getStaticPaths
export const getStaticPaths: GetStaticPaths = async () => {
  // Giả sử bạn có một danh sách các ID khóa học
  const paths = [
    { params: { id: '1' } },
    { params: { id: '2' } },
    // Thêm các ID khác nếu cần
  ]
  return { paths, fallback: false }
}

// Thêm hàm getStaticProps
export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params?.id || typeof params.id !== 'string') {
    return {
      notFound: true,
    }
  }

  const id = params.id
  // Tạo dữ liệu giả lập cho khóa học
  const course = {
    id,
    title: `Khóa học ${id}`,
    description: `Mô tả cho khóa học ${id}`,
    // Thêm các trường dữ liệu khác nếu cần
  }

  return {
    props: {
      course,
    },
  }
}

export default CourseDetailScreen
