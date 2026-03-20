import { Teacher, Course, Announcement, ScheduleItem, ConsultationRequest } from './types';

export const TEACHERS: Teacher[] = [
  {
    id: '1',
    name: 'Nguyễn Thắng Lợi',
    role: 'Chuyên gia Giao tiếp',
    bio: 'Chuyên gia tiếng Anh giao tiếp với phương pháp thực hành phản xạ tự nhiên, giúp học viên tự tin làm chủ ngôn ngữ trong mọi tình huống.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBypY0TplMgzgTyIABbVOMR4MjDXYtZ55G5sXvQsOJBHkdsvn0Y8B_GEQZI9RhBARNQyXtQT6rdOdBRGublrxH7VbilYU_PyP6FdlMivD3m-j41dvR9yTXZqsFgPbchzIS6j6mkpIIix9n6rabivVtL9_LbYEmR_8sjKtLiZ9RXkVbW9x19Brp4QMUXNgFUltP7lTW406DwrPMb2rWRdYSVR7P1nElTZcChZuP8ou0HZB_Y_g_gKwxEO2OXgsE1yV7vKQ73dwz5opY',
    tags: ['GIAO TIẾP', '> 4 NĂM KINH NGHIỆM'],
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
  },
  {
    id: '4',
    name: 'Hải Yến',
    role: 'Chuyên gia Ngữ pháp',
    bio: 'Giúp học viên nắm vững nền tảng ngữ pháp từ cơ bản đến nâng cao một cách dễ hiểu và logic nhất.',
    image: 'https://picsum.photos/seed/yen/800/1000',
    tags: ['NGỮ PHÁP', 'TẬN TÂM'],
    quote: 'Ngữ pháp là bộ khung vững chắc giúp bạn xây dựng ngôi nhà ngôn ngữ của riêng mình.'
  },
  {
    id: '5',
    name: 'Trần Quốc Đạt',
    role: 'Tiếng Anh Thương mại',
    bio: 'Đào tạo kỹ năng tiếng Anh chuyên nghiệp cho môi trường công sở, đàm phán và thuyết trình.',
    image: 'https://picsum.photos/seed/dat/800/1000',
    tags: ['THƯƠNG MẠI', 'CHUYÊN NGHIỆP'],
    quote: 'Thành công trong kinh doanh bắt đầu từ sự tự tin trong giao tiếp.'
  },
  {
    id: '6',
    name: 'Đặng Huỳnh Kỳ',
    role: 'Chuyên gia Luyện thi',
    bio: 'Nhiều năm kinh nghiệm luyện thi các chứng chỉ quốc tế với lộ trình cá nhân hóa hiệu quả.',
    image: 'https://picsum.photos/seed/ky/800/1000',
    tags: ['LUYỆN THI', 'CHIẾN LƯỢC'],
    quote: 'Không có giới hạn nào cho những người luôn nỗ lực vươn lên.'
  },
  {
    id: '7',
    name: 'Lê Đặng Thị Mơ',
    role: 'Giáo viên Giao tiếp',
    bio: 'Phương pháp giảng dạy năng động, chú trọng vào việc sửa lỗi phát âm và phản xạ nhanh.',
    image: 'https://picsum.photos/seed/mo/800/1000',
    tags: ['GIAO TIẾP', 'PHÁT ÂM'],
    quote: 'Hãy nói tiếng Anh một cách tự nhiên như ngôn ngữ mẹ đẻ của bạn.'
  },
  {
    id: '8',
    name: 'Trần Tú Uyên',
    role: 'Tiếng Anh Tổng quát',
    bio: 'Xây dựng nền tảng tiếng Anh toàn diện cho người mất gốc, giúp lấy lại sự tự tin.',
    image: 'https://picsum.photos/seed/uyen/800/1000',
    tags: ['TỔNG QUÁT', 'MẤT GỐC'],
    quote: 'Mọi hành trình vạn dặm đều bắt đầu từ một bước chân nhỏ bé.'
  },
  {
    id: '9',
    name: 'Hà Thanh Thảo',
    role: 'Tiếng Anh Thiếu niên',
    bio: 'Đồng hành cùng các bạn học sinh cấp 2, cấp 3 trong việc chinh phục các kỳ thi học thuật.',
    image: 'https://picsum.photos/seed/thao/800/1000',
    tags: ['THIẾU NIÊN', 'HỌC THUẬT'],
    quote: 'Học tập là hạt giống của kiến thức, kiến thức là hạt giống của hạnh phúc.'
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
