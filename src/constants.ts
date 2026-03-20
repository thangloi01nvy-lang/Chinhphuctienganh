import { Teacher, Course, Announcement, ScheduleItem, ConsultationRequest } from './types';

export const TEACHERS: Teacher[] = [
  {
    id: '1',
    name: 'Nguyễn Thắng Lợi',
    role: 'Chuyên gia Giao tiếp',
    bio: 'Chuyên gia tiếng Anh giao tiếp với phương pháp thực hành phản xạ tự nhiên, giúp học viên tự tin làm chủ ngôn ngữ trong mọi tình huống.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBypY0TplMgzgTyIABbVOMR4MjDXYtZ55G5sXvQsOJBHkdsvn0Y8B_GEQZI9RhBARNQyXtQT6rdOdBRGublrxH7VbilYU_PyP6FdlMivD3m-j41dvR9yTXZqsFgPbchzIS6j6mkpIIix9n6rabivVtL9_LbYEmR_8sjKtLiZ9RXkVbW9x19Brp4QMUXNgFUltP7lTW406DwrPMb2rWRdYSVR7P1nElTZcChZuP8ou0HZB_Y_g_gKwxEO2OXgsE1yV7vKQ73dwz5opY',
    tags: ['GIAO TIẾP', '10+ NĂM KINH NGHIỆM'],
    quote: 'Sứ mệnh của chúng tôi là thu hẹp khoảng cách giữa nỗ lực và thành tựu thông qua đào tạo ngôn ngữ thực tiễn.'
  },
  {
    id: '2',
    name: 'Đặng Phước Hoàng Sang',
    role: 'Chuyên gia TOEIC',
    bio: 'Chuyên sâu về chiến lược TOEIC toàn diện cho người đi làm. Tập trung vào giao tiếp thực tế.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBypY0TplMgzgTyIABbVOMR4MjDXYtZ55G5sXvQsOJBHkdsvn0Y8B_GEQZI9RhBARNQyXtQT6rdOdBRGublrxH7VbilYU_PyP6FdlMivD3m-j41dvR9yTXZqsFgPbchzIS6j6mkpIIix9n6rabivVtL9_LbYEmR_8sjKtLiZ9RXkVbW9x19Brp4QMUXNgFUltP7lTW406DwrPMb2rWRdYSVR7P1nElTZcChZuP8ou0HZB_Y_g_gKwxEO2OXgsE1yV7vKQ73dwz5opY',
    tags: ['TOEIC 990', 'KINH DOANH'],
    quote: 'Chuyên gia đào tạo doanh nghiệp và tối ưu hóa TOEIC, tập trung vào việc tinh giản giao tiếp thực tế.'
  },
  {
    id: '3',
    name: 'Dương Thuý An',
    role: 'Tiếng Anh Thiếu nhi',
    bio: 'Tận tâm truyền cảm hứng cho học viên nhí thông qua các phương pháp tương tác và kể chuyện sáng tạo.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB8uGk-pP9EIHfx-JAViXopPuN_IGTYnGBfyDqqL996psoCtW5_VluxmJV_VtJVUf4mBBLXOmLMnbljxLwF-3m64LCSmoD_A_-0PW4y3diutgk-P3N3LsL2jceL51BuVpZMmlNnEroWeJZ_-dC7EzA6LfJGLD2B0RvZlYx_QHWwMDWT8hNYu17uhAMhan8kwXGJ2Rvpf16Oa-RbPKfGqcVJAHgTEQMn_8O3suM5m09uoQhPXvCYMbK6L9HGg5seJnLbidv8OD1VJtU',
    tags: ['THIẾU NHI', 'SÁNG TẠO'],
    quote: 'Tận tâm truyền cảm hứng cho học viên nhí thông qua các phương pháp tương tác và cách tiếp cận kể chuyện.'
  }
];

export const COURSES: Course[] = [
  {
    id: '1',
    title: 'Hệ thống học tập bài bản',
    description: 'Xây dựng dựa trên các cấu trúc logic mô phỏng môi trường chuyên nghiệp thực tế.',
    icon: 'architecture'
  },
  {
    id: '2',
    title: 'Trải nghiệm chọn lọc',
    description: 'Mọi bài học đều được chọn lọc kỹ lưỡng để đảm bảo tính ứng dụng tối đa.',
    icon: 'auto_awesome'
  },
  {
    id: '3',
    title: 'Quản lý tập trung',
    description: 'Bảng quản trị mang lại cái nhìn bao quát liền mạch về tiến độ học tập.',
    icon: 'dashboard_customize'
  }
];

export const ANNOUNCEMENTS: Announcement[] = [
  { id: '1', type: 'Cập nhật mới', time: '2 giờ trước', content: 'Lịch kiểm tra trình độ giao tiếp cho Lớp A2 đã được công bố.' },
  { id: '2', type: 'Sự kiện', time: '24 Th10', content: 'Bài giảng khách mời: Làm chủ kỹ năng Nói cùng GS. Miller.' },
  { id: '3', type: 'Ngày lễ', time: 'Thông báo', content: 'Trung tâm nghỉ Tết Nguyên Đán từ ngày 20 tháng 1.' }
];

export const SCHEDULE: ScheduleItem[] = [
  { id: '1', day: 'Thứ 2', date: '18', title: 'Giao tiếp Phản xạ', time: '08:00 AM - 10:00 AM', location: 'Phòng 302' },
  { id: '2', day: 'Thứ 4', date: '20', title: 'Làm chủ Ngữ pháp II', time: '02:00 PM - 04:00 PM', location: 'Zoom Online' }
];

export const CONSULTATIONS: ConsultationRequest[] = [
  { id: '1', name: 'Nguyễn Văn An', phone: '0901 234 567', level: 'MỚI BẮT ĐẦU', goal: 'Giao tiếp cơ bản', date: '24 tháng 10, 2023', status: 'pending' },
  { id: '2', name: 'Lê Thị Mai', phone: '0938 111 222', level: 'TRUNG CẤP', goal: 'Giao tiếp công việc', date: '23 tháng 10, 2023', status: 'completed' },
  { id: '3', name: 'Trần Minh Quân', phone: '0977 444 888', level: 'CAO CẤP', goal: 'Đàm phán kinh doanh', date: '22 tháng 10, 2023', status: 'processing' }
];
