import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  Plus, 
  Calendar, 
  List,
  BookOpen,
  Target,
  Video,
  Save,
  Eye,
  Edit,
  Trash2,
  Clock,
  CheckCircle
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Label } from '../ui/label';

// Define the Lesson type
interface Lesson {
  id: string;
  title: string;
  subject: string;
  grade: string;
  date: string;
  time: string;
  duration: number;
  objectives: string[];
  content: string;
  videoUrl: string;
  notes: string;
  status: 'published' | 'draft';
  studentsCount: number;
  createdAt: string;
  updatedAt: string;
}

const initialLessons: Lesson[] = [
  {
    id: 'LESSON001',
    title: 'حساب المثلثات - الدوال الأساسية',
    subject: 'رياضيات',
    grade: 'الصف الثالث الثانوي',
    date: '2024-01-21',
    time: '14:00',
    duration: 60,
    objectives: [
      'التعرف على الدوال المثلثية الأساسية',
      'حل مسائل على الجيب وجيب التمام',
      'تطبيق القوانين في مسائل عملية'
    ],
    content: `# الدوال المثلثية الأساسية...`,
    videoUrl: 'https://www.youtube.com/watch?v=example1',
    notes: 'تأكد من التركيز على الأمثلة العملية',
    status: 'published',
    studentsCount: 15,
    createdAt: '2024-01-20T10:00:00Z',
    updatedAt: '2024-01-20T15:30:00Z'
  },
  {
    id: 'LESSON002',
    title: 'الجبر الخطي - المصفوفات',
    subject: 'رياضيات',
    grade: 'الصف الثالث الثانوي',
    date: '2024-01-22',
    time: '16:00',
    duration: 45,
    objectives: [
      'فهم مفهوم المصفوفات',
      'العمليات على المصفوفات',
      'حل أنظمة المعادلات باستخدام المصفوفات'
    ],
    content: `# المصفوفات...`,
    videoUrl: '',
    notes: 'يحتاج إلى المزيد من الأمثلة',
    status: 'draft',
    studentsCount: 0,
    createdAt: '2024-01-19T14:00:00Z',
    updatedAt: '2024-01-19T14:00:00Z'
  },
];

const emptyLesson: Omit<Lesson, 'id' | 'createdAt' | 'updatedAt' | 'studentsCount'> = {
  title: '',
  subject: 'رياضيات',
  grade: 'الصف الثالث الثانوي',
  date: '',
  time: '',
  duration: 60,
  objectives: [''],
  content: '',
  videoUrl: '',
  notes: '',
  status: 'draft'
};


const LessonPreparation = () => {
  const [activeTab, setActiveTab] = useState('list');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [lessons, setLessons] = useState<Lesson[]>(initialLessons);
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);
  const [formData, setFormData] = useState(emptyLesson);

  const handleOpenForm = (lesson: Lesson | null) => {
    if (lesson) {
      setEditingLesson(lesson);
      setFormData(lesson);
    } else {
      setEditingLesson(null);
      setFormData(emptyLesson);
    }
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingLesson(null);
    setFormData(emptyLesson);
  };

  const handleSaveLesson = async (publish = false) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));

    const lessonToSave = { ...formData, status: publish ? 'published' : 'draft' } as Lesson;

    if (editingLesson) {
      // Update existing lesson
      const updatedLesson = { ...lessonToSave, id: editingLesson.id, updatedAt: new Date().toISOString() };
      setLessons(lessons.map(l => l.id === editingLesson.id ? updatedLesson : l));
    } else {
      // Create new lesson
      const newLesson = {
        ...lessonToSave,
        id: `LESSON${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        studentsCount: 0
      };
      setLessons([newLesson, ...lessons]);
    }
    handleCloseForm();
  };

  const handlePublishLesson = async (lessonId: string) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    setLessons(lessons.map(l => l.id === lessonId ? { ...l, status: 'published', updatedAt: new Date().toISOString() } : l));
  };

  const handleDeleteLesson = async (lessonId: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذا الدرس؟')) {
      await new Promise(resolve => setTimeout(resolve, 500));
      setLessons(lessons.filter(l => l.id !== lessonId));
    }
  };

  const handleFormChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addObjective = () => {
    handleFormChange('objectives', [...formData.objectives, '']);
  };

  const updateObjective = (index: number, value: string) => {
    const updatedObjectives = [...formData.objectives];
    updatedObjectives[index] = value;
    handleFormChange('objectives', updatedObjectives);
  };

  const removeObjective = (index: number) => {
    handleFormChange('objectives', formData.objectives.filter((_, i) => i !== index));
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-EG', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusBadge = (status: 'published' | 'draft') => {
    switch (status) {
      case 'published':
        return <Badge className="bg-green-500 text-white">منشور</Badge>;
      case 'draft':
        return <Badge variant="secondary">مسودة</Badge>;
      default:
        return <Badge variant="outline">غير محدد</Badge>;
    }
  };

  const lessonsByDate = lessons.reduce((acc, lesson) => {
    const date = lesson.date;
    if (!acc[date]) acc[date] = [];
    acc[date].push(lesson);
    return acc;
  }, {} as Record<string, Lesson[]>);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">تحضير الدروس</h1>
          <p className="text-muted-foreground">خطط وحضر دروسك بطريقة احترافية</p>
        </div>
        <Button onClick={() => handleOpenForm(null)}>
          <Plus className="h-4 w-4 ml-2" />
          إضافة درس جديد
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-primary">{lessons.length}</div>
              <div className="text-sm text-muted-foreground">إجمالي الدروس</div>
            </div>
            <BookOpen className="h-8 w-8 text-primary/70" />
        </Card>
        {/* ... other stat cards ... */}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="calendar"><Calendar className="h-4 w-4 ml-2" />عرض التقويم</TabsTrigger>
          <TabsTrigger value="list"><List className="h-4 w-4 ml-2" />عرض القائمة</TabsTrigger>
        </TabsList>

        <TabsContent value="calendar" className="space-y-4">
          {Object.keys(lessonsByDate).sort().map(date => (
            <Card key={date} className="p-6">
              <h3 className="text-lg font-semibold mb-4">{formatDate(date)}</h3>
              <div className="space-y-3">
                {lessonsByDate[date].map(lesson => (
                  <div key={lesson.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50">
                     <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          {lesson.time} ({lesson.duration} دقيقة)
                        </div>
                        <div>
                          <h4 className="font-medium">{lesson.title}</h4>
                          <p className="text-sm text-muted-foreground">{lesson.grade}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(lesson.status)}
                      </div>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="list" className="space-y-4">
          {lessons.map(lesson => (
            <Card key={lesson.id} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold">{lesson.title}</h3>
                    {getStatusBadge(lesson.status)}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <span>{lesson.subject} • {lesson.grade}</span>
                    <span>{formatDate(lesson.date)} • {lesson.time}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleOpenForm(lesson)}>
                    <Edit className="h-4 w-4 ml-2" />تعديل
                  </Button>
                  {lesson.status === 'draft' && (
                    <Button size="sm" onClick={() => handlePublishLesson(lesson.id)}>
                      <Eye className="h-4 w-4 ml-2" />نشر
                    </Button>
                  )}
                  <Button variant="destructive" size="sm" onClick={() => handleDeleteLesson(lesson.id)}>
                    <Trash2 className="h-4 w-4 ml-2" />حذف
                  </Button>
                </div>
              </div>
              {/* ... rest of the lesson details ... */}
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      {isFormOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto m-4">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">{editingLesson ? 'تعديل الدرس' : 'إضافة درس جديد'}</h2>
                <Button variant="ghost" size="sm" onClick={handleCloseForm}>إغلاق</Button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>عنوان الدرس *</Label>
                    <Input value={formData.title} onChange={e => handleFormChange('title', e.target.value)} />
                  </div>
                  <div>
                    <Label>المادة *</Label>
                    <Select value={formData.subject} onValueChange={value => handleFormChange('subject', value)}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="رياضيات">رياضيات</SelectItem>
                        <SelectItem value="فيزياء">فيزياء</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                   <div>
                    <Label>الصف *</Label>
                    <Select value={formData.grade} onValueChange={value => handleFormChange('grade', value)}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="الصف الأول الثانوي">الصف الأول الثانوي</SelectItem>
                        <SelectItem value="الصف الثاني الثانوي">الصف الثاني الثانوي</SelectItem>
                        <SelectItem value="الصف الثالث الثانوي">الصف الثالث الثانوي</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {/* ... other inputs for date, time, duration ... */}
                </div>

                <div>
                  <Label>أهداف الحصة *</Label>
                  <div className="space-y-2 mt-2">
                    {formData.objectives.map((obj, index) => (
                      <div key={index} className="flex gap-2">
                        <Input value={obj} onChange={e => updateObjective(index, e.target.value)} />
                        {formData.objectives.length > 1 && (
                          <Button variant="outline" size="sm" onClick={() => removeObjective(index)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button variant="outline" onClick={addObjective}><Plus className="h-4 w-4 ml-2" />إضافة هدف</Button>
                  </div>
                </div>

                <div>
                  <Label>المحتوى التحريري</Label>
                  <Textarea value={formData.content} onChange={e => handleFormChange('content', e.target.value)} rows={10} />
                </div>

                {/* ... inputs for videoUrl and notes ... */}

                <div className="flex gap-3 pt-4 border-t">
                  <Button onClick={() => handleSaveLesson(false)} variant="outline">
                    <Save className="h-4 w-4 ml-2" />حفظ كمسودة
                  </Button>
                  <Button onClick={() => handleSaveLesson(true)} className="bg-green-600 hover:bg-green-700">
                    <Eye className="h-4 w-4 ml-2" />{editingLesson ? 'حفظ ونشر التعديلات' : 'حفظ ونشر'}
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default LessonPreparation;

