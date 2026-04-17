import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useDocuments } from '../hooks/useDocuments';
import { Book, Download, Search, Filter, ChevronRight } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { DOCUMENT_CATEGORIES } from '../constants';

export default function Documents() {
  const { documents } = useDocuments();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearchTerm = searchParams.get('q') || '';
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [selectedCategory, setSelectedCategory] = useState<string>('Tất cả');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('Tất cả');

  useEffect(() => {
    const q = searchParams.get('q');
    if (q !== null) {
      setSearchTerm(q);
    } else {
      setSearchTerm('');
    }
  }, [searchParams]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value) {
      setSearchParams({ q: value });
    } else {
      setSearchParams({});
    }
  };

  const categories = ['Tất cả', ...Object.keys(DOCUMENT_CATEGORIES)];
  const subCategories = selectedCategory !== 'Tất cả' && DOCUMENT_CATEGORIES[selectedCategory] 
    ? ['Tất cả', ...DOCUMENT_CATEGORIES[selectedCategory]] 
    : [];

  const filteredDocuments = documents.filter(doc => {
    const title = doc.title || '';
    const category = doc.category || '';
    const subCategory = doc.subCategory || '';
    const matchesSearch = title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Tất cả' || category === selectedCategory;
    const matchesSubCategory = selectedSubCategory === 'Tất cả' || subCategory === selectedSubCategory;
    return matchesSearch && matchesCategory && matchesSubCategory;
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

      <div className="flex flex-col gap-6 mb-12">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="relative flex-grow max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-outline-variant" />
            <input 
              type="text" 
              placeholder="Tìm kiếm tài liệu..." 
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full bg-white border border-outline/10 rounded-xl pl-12 pr-4 py-3.5 text-sm focus:ring-2 focus:ring-primary/20 outline-none shadow-sm"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setSelectedSubCategory('Tất cả');
                }}
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

        {subCategories.length > 0 && (
          <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar items-center">
            <Filter className="w-4 h-4 text-outline-variant mr-2 flex-shrink-0" />
            {subCategories.map(sub => (
              <button
                key={sub}
                onClick={() => setSelectedSubCategory(sub)}
                className={`px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest whitespace-nowrap transition-colors border ${
                  selectedSubCategory === sub 
                    ? 'bg-secondary/10 text-secondary border-secondary/20' 
                    : 'bg-transparent border-outline/10 text-on-surface-variant hover:bg-surface'
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
        )}
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
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest bg-surface-variant/30 px-2 py-1 rounded-md">
                  {doc.category}
                </span>
                {doc.subCategory && (
                  <span className="text-[10px] font-bold text-secondary uppercase tracking-widest bg-secondary/10 px-2 py-1 rounded-md">
                    {doc.subCategory}
                  </span>
                )}
              </div>
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
