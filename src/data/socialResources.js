import { Users, Briefcase, BookOpen, Heart, DollarSign, Phone, MapPin } from 'lucide-react';

const socialResources = [
  {
    id: 1,
    name: '民生委員・児童委員',
    category: 'consultation',
    description: '生活や就労、健康、メンタルヘルスなど幅広い相談に対応',
    needsLocationSelection: true,
    getDetails: (municipality) => municipality 
      ? `${municipality}にお住まいの方の民生委員・児童委員については、${municipality}の役場にお問い合わせください。地域の身近な相談相手として、生活や子育てに関する幅広い相談に対応しています。`
      : '沖縄県内には約2,000人が配置されており、地域の身近な相談相手として活動しています。気軽に相談できる地域のサポーターです。'
    ,
    getContact: (municipality) => municipality ? `${municipality}役場` : '各市町村役場で紹介',
    icon: Users,
    color: 'bg-blue-500'
  },
  {
    id: 2,
    name: '社会福祉協議会',
    category: 'consultation',
    description: '生活困窮や就労支援、地域活動への参加など包括的な支援',
    needsLocationSelection: true,
    getDetails: (municipality) => municipality
      ? `${municipality}社会福祉協議会では、若年層も含めた総合的な支援を実施しています。一人ひとりに寄り添った支援を提供します。`
      : '各市町村に設置されており、若年層も含めた総合的な支援を実施。一人ひとりに寄り添った支援を提供します。'
    ,
    getContact: (municipality) => municipality ? `${municipality}社会福祉協議会` : '各市町村社会福祉協議会',
    icon: Heart,
    color: 'bg-blue-500'
  },
  {
    id: 3,
    name: 'ハローワーク',
    category: 'employment',
    description: '就職活動や職業訓練、キャリア相談などの就労支援',
    needsLocationSelection: false, // ハローワークは地域選択不要
    details: '求人情報の提供から面接対策、職業訓練まで幅広いサポート。あなたの就職活動を全面的にバックアップします。' ,
    contact: 'ハローワーク沖縄・那覇・名護・宮古・八重山',
    icon: Briefcase,
    color: 'bg-green-500'
  },
  {
    id: 4,
    name: '若者サポートステーション',
    category: 'employment',
    description: '働くことに関する支援や相談',
    needsLocationSelection: false, // サポステは地域選択不要
    details: '15歳～49歳の就労に困難を抱える若者への支援。働くことへの不安や悩みを一緒に解決していきます。',
    contact: 'おきなわ若者サポートステーション',
    icon: Users,
    color: 'bg-green-500'
  },
  {
    id: 5,
    name: '各種学習・資格取得支援',
    category: 'education',
    description: '進学やスキルアップを目指す若者向けの支援事業',
    needsLocationSelection: true,
    getDetails: (municipality) => municipality
      ? `${municipality}の自治体やNPOが実施する学習支援や資格取得のための支援。将来の目標に向けてスキルアップを応援します。`
      : '自治体やNPOが実施する学習支援や資格取得のための支援。将来の目標に向けてスキルアップを応援します。'
    ,
    getContact: (municipality) => municipality ? `${municipality}教育委員会・NPO団体` : '各市町村教育委員会・NPO団体',
    icon: BookOpen,
    color: 'bg-purple-500'
  },
  {
    id: 6,
    name: '沖縄県ボランティア・市民活動支援センター',
    category: 'volunteer',
    description: '地域のボランティア活動や市民活動への参加支援',
    needsLocationSelection: false, // 県の施設なので地域選択不要
    details: '仲間づくりや社会経験の場として活用可能。地域とのつながりを深めながら成長できる機会を提供します。',
    contact: '沖縄県ボランティア・市民活動支援センター',
    icon: Heart,
    color: 'bg-orange-500'
  },
  {
    id: 7,
    name: '地域のNPOや団体',
    category: 'volunteer',
    description: '環境保全、子ども支援、文化活動など多様な社会参加',
    needsLocationSelection: true,
    getDetails: (municipality) => municipality
      ? `${municipality}のNPOや団体では、関心に応じて様々な分野で活動できる機会を提供。自分の興味や関心を活かして社会貢献できます。`
      : '関心に応じて様々な分野で活動できる機会を提供。自分の興味や関心を活かして社会貢献できます。'
    ,
    getContact: (municipality) => municipality ? `${municipality}のNPO団体・地域団体` : '各NPO団体・地域団体',
    icon: Users,
    color: 'bg-orange-500'
  },
  {
    id: 8,
    name: '公民館・文化施設',
    category: 'community',
    description: '年齢制限なく利用できる施設で趣味や学び、交流の場',
    needsLocationSelection: true,
    getDetails: (municipality) => municipality
      ? `${municipality}の公民館・文化施設は、地域の文化活動や学習活動の拠点として活用できます。新しい趣味や興味を発見できる場所です。`
      : '地域の文化活動や学習活動の拠点として活用。新しい趣味や興味を発見できる場所です。'
    ,
    getContact: (municipality) => municipality ? `${municipality}公民館` : '各市町村公民館',
    icon: MapPin,
    color: 'bg-teal-500'
  },
  {
    id: 9,
    name: '地域サークル',
    category: 'community',
    description: '日舞や三線などの文化活動サークル',
    needsLocationSelection: true,
    getDetails: (municipality) => municipality
      ? `${municipality}の地域サークルでは、沖縄の伝統文化に触れながら仲間づくりができます。`
      : '那覇市の例：大学生や専門学生は無料で参加可能な場合もある。沖縄の伝統文化に触れながら仲間づくりができます。'
    ,
    getContact: (municipality) => municipality ? `${municipality}の文化センター・公民館` : '各文化センター・公民館',
    icon: Users,
    color: 'bg-teal-500'
  },
  {
    id: 10,
    name: '生活困窮者自立支援制度',
    category: 'financial',
    description: '生活に困難を抱える若者への就労支援や生活支援',
    needsLocationSelection: true,
    getDetails: (municipality) => municipality
      ? `${municipality}の生活困窮者自立支援窓口では、包括的な支援を通じて自立を促進。経済的な困難があっても、一人ひとりの状況に応じた支援を受けられます。`
      : '包括的な支援を通じて自立を促進。経済的な困難があっても、一人ひとりの状況に応じた支援を受けられます。'
    ,
    getContact: (municipality) => municipality ? `${municipality}生活困窮者自立支援窓口` : '各市町村生活困窮者自立支援窓口',
    icon: DollarSign,
    color: 'bg-red-500'
  }
];

export default socialResources;