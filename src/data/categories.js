import { Phone, Briefcase, BookOpen, Heart, Users, DollarSign } from 'lucide-react';

const categories = [
  { id: 'consultation', name: '相談・支援', icon: Phone, color: 'bg-blue-500', description: '生活や就労の悩みを相談できる窓口' },
  { id: 'employment', name: '就労支援', icon: Briefcase, color: 'bg-green-500', description: '就職活動や職業訓練のサポート' },
  { id: 'education', name: '学習支援', icon: BookOpen, color: 'bg-purple-500', description: '進学やスキルアップの支援' },
  { id: 'volunteer', name: 'ボランティア', icon: Heart, color: 'bg-orange-500', description: '地域活動や社会参加の機会' },
  { id: 'community', name: '居場所・交流', icon: Users, color: 'bg-teal-500', description: '趣味や交流を楽しめる場所' },
  { id: 'financial', name: '経済支援', icon: DollarSign, color: 'bg-red-500', description: '生活困窮時の支援制度' }
];

export default categories;