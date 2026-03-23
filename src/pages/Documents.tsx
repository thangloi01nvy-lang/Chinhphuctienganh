import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useDocuments } from '../hooks/useDocuments';
import { Book, Download, Search, Filter } from 'lucide-react';

export default function Documents() {
  const { documents } = useDocuments();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Tất cả');

  const categories = ['Tất cả', 'IELTS', 'TOEIC', 'Ngữ pháp'];

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Tất cả' || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pt-32 pb-24 max-w-7xl mx-auto px-6 min-h-screen"
    >
      <header className="mb-16 border-l-4 border-primary pl-8">
        <div className="max-w-3xl">
          <span className="text-[10px] font-bold tracking-[0.3em] text-on-surface-variant uppercase mb-4 block">Thư viện</span>
          <h1 className="font-headline text-4xl md:text-5xl font-extrabold tracking-tight text-primary leading-[1.1] mb-6">
            Kho Tài Liệu Toàn Diện
          </h1>
          <p className="text-on-surface-variant max-w-xl text-sm leading-relaxed font-medium">
            Khám phá và tải xuống các tài liệu học tập, giáo trình, và bài tập được biên soạn kỹ lưỡng để hỗ trợ quá trình học của bạn.
          </p>
        </div>
      </header>

      <div className="flex flex-col md:flex-row gap-6 mb-12">
        <div className="relative flex-grow max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-outline-variant" />
          <input 
            type="text" 
            placeholder="Tìm kiếm tài liệu..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-outline/10 rounded-xl pl-12 pr-4 py-3.5 text-sm focus:ring-2 focus:ring-primary/20 outline-none shadow-sm"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-3.5 rounded-xl text-[11px] font-bold uppercase tracking-widest whitespace-nowrap transition-colors shadow-sm ${
                selectedCategory === cat 
                  ? 'bg-primary text-white' 
                  : 'bg-white border border-outline/10 text-on-surface-variant hover:bg-surface'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDocuments.length > 0 ? (
          filteredDocuments.map(doc => (
            <div key={doc.id} className="bg-white border border-outline/10 rounded-2xl p-6 flex flex-col group hover:border-primary/30 transition-colors shadow-sm">
              <div className="flex items-start justify-between gap-4 mb-6">
                <div className="w-12 h-12 bg-surface-variant/30 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Book className="w-6 h-6 text-primary" />
                </div>
                <span className="text-[9px] font-bold text-outline-variant uppercase tracking-widest border border-outline/10 px-2 py-1 rounded-md bg-surface">
                  {doc.type}
                </span>
              </div>
              <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">{doc.title}</h3>
              <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-6 block">
                Danh mục: {doc.category}
              </span>
              <a 
                href={doc.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="mt-auto flex items-center justify-center gap-2 w-full py-3 bg-surface-variant/50 hover:bg-primary hover:text-white rounded-xl text-xs font-bold uppercase tracking-widest transition-all"
              >
                <Download className="w-4 h-4" /> Tải xuống
              </a>
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center border-2 border-dashed border-outline/10 rounded-3xl">
            <Book className="w-12 h-12 text-outline-variant mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-bold text-on-surface-variant mb-2">Không tìm thấy tài liệu</h3>
            <p className="text-sm text-outline-variant">Thử thay đổi từ khóa tìm kiếm hoặc danh mục.</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
