import React from 'react';
import { motion } from 'motion/react';
import { CONSULTATIONS } from '../constants';
import { Users, FileText, TrendingUp, Settings, CheckCircle, Clock, AlertCircle } from 'lucide-react';

export default function Admin() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pt-32 pb-24 max-w-7xl mx-auto px-6"
    >
      <header className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="font-headline text-4xl font-extrabold text-on-surface">Bảng Quản trị</h1>
          <p className="text-on-surface-variant font-light mt-1">Chào mừng trở lại, Quản trị viên. Đây là tổng quan hệ thống hôm nay.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-6 py-2.5 bg-white border border-outline/10 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-surface transition-colors">
            <FileText className="w-4 h-4" /> Xuất báo cáo
          </button>
          <button className="px-6 py-2.5 bg-primary text-white rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-primary-dim transition-colors shadow-sm">
            <Settings className="w-4 h-4" /> Cài đặt
          </button>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {[
          { label: 'Tổng học viên', value: '1,284', change: '+12%', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Đăng ký mới', value: '42', change: '+5%', icon: FileText, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Tỷ lệ chuyển đổi', value: '18.5%', change: '+2.4%', icon: TrendingUp, color: 'text-amber-600', bg: 'bg-amber-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-8 rounded-3xl border border-outline/5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <span className="text-emerald-600 text-xs font-bold bg-emerald-50 px-2 py-1 rounded-full">{stat.change}</span>
            </div>
            <h3 className="text-on-surface-variant text-xs font-bold uppercase tracking-widest">{stat.label}</h3>
            <p className="text-3xl font-headline font-extrabold mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Consultations Table */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-outline/5 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-surface-variant flex items-center justify-between">
            <h2 className="font-headline text-xl font-bold">Yêu cầu tư vấn mới</h2>
            <button className="text-primary text-xs font-bold uppercase tracking-widest hover:underline">Xem tất cả</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-surface text-[10px] font-bold text-outline uppercase tracking-widest">
                  <th className="px-8 py-4">Học viên</th>
                  <th className="px-8 py-4">Trình độ</th>
                  <th className="px-8 py-4">Ngày đăng ký</th>
                  <th className="px-8 py-4">Trạng thái</th>
                  <th className="px-8 py-4">Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-variant">
                {CONSULTATIONS.map((req) => (
                  <tr key={req.id} className="hover:bg-surface/50 transition-colors">
                    <td className="px-8 py-5">
                      <div className="font-bold text-sm">{req.name}</div>
                      <div className="text-xs text-on-surface-variant">{req.phone}</div>
                    </td>
                    <td className="px-8 py-5">
                      <span className="text-[10px] font-bold px-2 py-1 bg-surface-variant rounded-full">{req.level}</span>
                    </td>
                    <td className="px-8 py-5 text-xs text-on-surface-variant">{req.date}</td>
                    <td className="px-8 py-5">
                      {req.status === 'completed' && (
                        <span className="flex items-center gap-1 text-emerald-600 text-[10px] font-bold uppercase">
                          <CheckCircle className="w-3 h-3" /> Hoàn thành
                        </span>
                      )}
                      {req.status === 'pending' && (
                        <span className="flex items-center gap-1 text-amber-600 text-[10px] font-bold uppercase">
                          <Clock className="w-3 h-3" /> Chờ xử lý
                        </span>
                      )}
                      {req.status === 'processing' && (
                        <span className="flex items-center gap-1 text-blue-600 text-[10px] font-bold uppercase">
                          <AlertCircle className="w-3 h-3" /> Đang xử lý
                        </span>
                      )}
                    </td>
                    <td className="px-8 py-5">
                      <button className="text-primary font-bold text-xs hover:underline">Chi tiết</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Content Update Form */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-white p-8 rounded-3xl border border-outline/5 shadow-sm">
            <h2 className="font-headline text-xl font-bold mb-6">Cập nhật nội dung</h2>
            <form className="space-y-6">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-outline tracking-wider uppercase ml-1">Tiêu đề thông báo</label>
                <input className="w-full bg-surface-variant/30 border border-outline/10 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 outline-none" placeholder="Nhập tiêu đề..." type="text"/>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-outline tracking-wider uppercase ml-1">Nội dung</label>
                <textarea className="w-full bg-surface-variant/30 border border-outline/10 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 outline-none h-32" placeholder="Nhập nội dung thông báo mới..."></textarea>
              </div>
              <button className="w-full bg-on-surface text-white py-3 rounded-xl font-bold text-sm hover:opacity-90 transition-opacity">
                Đăng thông báo
              </button>
            </form>
          </div>

          <div className="bg-primary-container/30 p-8 rounded-3xl border border-primary/10">
            <h3 className="font-headline font-bold text-on-primary-container mb-2">Mẹo Quản trị</h3>
            <p className="text-xs text-on-primary-container/80 leading-relaxed">
              Hãy thường xuyên cập nhật lịch học và tài liệu mới để tăng tỷ lệ tương tác của học viên trên nền tảng.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
