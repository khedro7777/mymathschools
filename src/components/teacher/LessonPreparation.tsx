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
  FileText,
  Save,
  Eye,
  Edit,
  Trash2,
  Clock,
  CheckCircle
} from 'lucide-react';

const LessonPreparation = () => {
  const [activeTab, setActiveTab] = useState('calendar');
  const [showAddLesson, setShowAddLesson] = useState(false);

  // بيانات وهمية للدروس
  const [lessons] = useState([
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
      content: `# الدوال المثلثية الأساسية

## المقدمة
في هذا الدرس سنتعلم الدوال المثلثية الأساسية وكيفية استخدامها.

## الأهداف
- فهم مفهوم الدوال المثلثية
- التطبيق العملي للقوانين
- حل المسائل المختلفة

## المحتوى
### الجيب (sin)
الجيب هو النسبة بين الضلع المقابل والوتر...

### جيب التمام (cos)
جيب التمام هو النسبة بين الضلع المجاور والوتر...`,
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
      content: `# المصفوفات

## تعريف المصفوفة
المصفوفة هي ترتيب مستطيلي للأرقام...

## أنواع المصفوفات
- المصفوفة المربعة
- المصفوفة المستطيلة
- المصفوفة الصفرية`,
      videoUrl: '',
      notes: 'يحتاج إلى المزيد من الأمثلة',
      status: 'draft',
      studentsCount: 0,
      createdAt: '2024-01-19T14:00:00Z',
      updatedAt: '2024-01-19T14:00:00Z'
    },
    {
      id: 'LESSON003',
      title: 'الهندسة التحليلية - المعادلات',
      subject: 'رياضيات',
      grade: 'الصف الثالث الثانوي',
      date: '2024-01-23',
      time: '10:00',
      duration: 50,
      objectives: [
        'معادلة الخط المستقيم',
        'معادلة الدائرة',
        'تطبيقات عملية'
      ],
      content: `# الهندسة التحليلية

## معادلة الخط المستقيم
الصورة العامة: y = mx + c

## معادلة الدائرة
الصورة العامة: (x-h)² + (y-k)² = r²`,
      videoUrl: 'https://www.youtube.com/watch?v=example3',
      notes: 'درس مهم جداً للامتحان',
      status: 'published',
      studentsCount: 18,
      createdAt: '2024-01-18T09:00:00Z',
      updatedAt: '2024-01-20T11:00:00Z'
    }
  ]);

  const [newLesson, setNewLesson] = useState({
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
  });

  const handleSaveLesson = () => {
    console.log('حفظ الدرس:', newLesson);
    setShowAddLesson(false);
    // هنا سيتم حفظ الدرس في قاعدة البيانات
  };

  const handlePublishLesson = (lessonId: string) => {
    console.log('نشر الدرس:', lessonId);
    // هنا سيتم نشر الدرس وإرسال إشعارات للطلاب
  };

  const handleDeleteLesson = (lessonId: string) => {
    console.log('حذف الدرس:', lessonId);
    // هنا سيتم حذف الدرس
  };

  const addObjective = () => {
    setNewLesson({
      ...newLesson,
      objectives: [...newLesson.objectives, '']
    });
  };

  const updateObjective = (index: number, value: string) => {
    const updatedObjectives = [...newLesson.objectives];
    updatedObjectives[index] = value;
    setNewLesson({
      ...newLesson,
      objectives: updatedObjectives
    });
  };

  const removeObjective = (index: number) => {
    setNewLesson({
      ...newLesson,
      objectives: newLesson.objectives.filter((_, i) => i !== index)
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-EG', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return <Badge className="bg-success">منشور</Badge>;
      case 'draft':
        return <Badge variant="secondary">مسودة</Badge>;
      default:
        return <Badge variant="outline">غير محدد</Badge>;
    }
  };

  // تجميع الدروس حسب التاريخ للعرض في التقويم
  const lessonsByDate = lessons.reduce((acc, lesson) => {
    const date = lesson.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(lesson);
    return acc;
  }, {} as Record<string, typeof lessons>);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">تحضير الدروس</h1>
          <p className="text-muted-foreground">خطط وحضر دروسك بطريقة احترافية</p>
        </div>
        <Button onClick={() => setShowAddLesson(true)}>
          <Plus className="h-4 w-4 ml-2" />
          إضافة درس جديد
        </Button>
      </div>

      {/* إحصائيات سريعة */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-primary">{lessons.length}</div>
              <div className="text-sm text-muted-foreground">إجمالي الدروس</div>
            </div>
            <BookOpen className="h-8 w-8 text-primary" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-success">
                {lessons.filter(l => l.status === 'published').length}
              </div>
              <div className="text-sm text-muted-foreground">دروس منشورة</div>
            </div>
            <CheckCircle className="h-8 w-8 text-success" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-warning">
                {lessons.filter(l => l.status === 'draft').length}
              </div>
              <div className="text-sm text-muted-foreground">مسودات</div>
            </div>
            <Edit className="h-8 w-8 text-warning" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-educational">
                {lessons.reduce((sum, l) => sum + l.studentsCount, 0)}
              </div>
              <div className="text-sm text-muted-foreground">طلاب مسجلين</div>
            </div>
            <Target className="h-8 w-8 text-educational" />
          </div>
        </Card>
      </div>

      {/* تبويبات العرض */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="calendar">
            <Calendar className="h-4 w-4 ml-2" />
            عرض التقويم
          </TabsTrigger>
          <TabsTrigger value="list">
            <List className="h-4 w-4 ml-2" />
            عرض القائمة
          </TabsTrigger>
        </TabsList>

        {/* عرض التقويم */}
        <TabsContent value="calendar" className="space-y-4">
          <div className="grid gap-4">
            {Object.entries(lessonsByDate).map(([date, dateLessons]) => (
              <Card key={date} className="p-6">
                <h3 className="text-lg font-semibold mb-4">{formatDate(date)}</h3>
                <div className="space-y-3">
                  {dateLessons.map((lesson) => (
                    <div key={lesson.id} className="flex items-center justify-between p-4 border rounded-lg">
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
                        <span className="text-sm text-muted-foreground">
                          {lesson.studentsCount} طالب
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* عرض القائمة */}
        <TabsContent value="list" className="space-y-4">
          <div className="space-y-4">
            {lessons.map((lesson) => (
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
                      <span>{lesson.duration} دقيقة</span>
                      <span>{lesson.studentsCount} طالب</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 ml-2" />
                      تعديل
                    </Button>
                    {lesson.status === 'draft' && (
                      <Button size="sm" onClick={() => handlePublishLesson(lesson.id)}>
                        <Eye className="h-4 w-4 ml-2" />
                        نشر
                      </Button>
                    )}
                    <Button variant="outline" size="sm" onClick={() => handleDeleteLesson(lesson.id)}>
                      <Trash2 className="h-4 w-4 ml-2" />
                      حذف
                    </Button>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium mb-2">أهداف الحصة:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      {lesson.objectives.map((objective, index) => (
                        <li key={index}>{objective}</li>
                      ))}
                    </ul>
                  </div>

                  {lesson.content && (
                    <div>
                      <h4 className="font-medium mb-2">المحتوى:</h4>
                      <div className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
                        {lesson.content.substring(0, 200)}...
                      </div>
                    </div>
                  )}

                  {lesson.videoUrl && (
                    <div className="flex items-center gap-2 text-sm">
                      <Video className="h-4 w-4 text-primary" />
                      <a href={lesson.videoUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                        رابط الفيديو
                      </a>
                    </div>
                  )}

                  {lesson.notes && (
                    <div className="text-sm text-muted-foreground">
                      <strong>ملاحظات:</strong> {lesson.notes}
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* نموذج إضافة درس جديد */}
      {showAddLesson && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto m-4">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">إضافة درس جديد</h2>
                <Button variant="outline" onClick={() => setShowAddLesson(false)}>
                  إلغاء
                </Button>
              </div>

              <div className="space-y-6">
                {/* المعلومات الأساسية */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">عنوان الدرس *</label>
                    <Input
                      value={newLesson.title}
                      onChange={(e) => setNewLesson({...newLesson, title: e.target.value})}
                      placeholder="عنوان الدرس"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">المادة *</label>
                    <select
                      value={newLesson.subject}
                      onChange={(e) => setNewLesson({...newLesson, subject: e.target.value})}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="رياضيات">رياضيات</option>
                      <option value="فيزياء">فيزياء</option>
                      <option value="كيمياء">كيمياء</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">الصف *</label>
                    <select
                      value={newLesson.grade}
                      onChange={(e) => setNewLesson({...newLesson, grade: e.target.value})}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="الصف الأول الثانوي">الصف الأول الثانوي</option>
                      <option value="الصف الثاني الثانوي">الصف الثاني الثانوي</option>
                      <option value="الصف الثالث الثانوي">الصف الثالث الثانوي</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">التاريخ *</label>
                    <Input
                      type="date"
                      value={newLesson.date}
                      onChange={(e) => setNewLesson({...newLesson, date: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">الوقت *</label>
                    <Input
                      type="time"
                      value={newLesson.time}
                      onChange={(e) => setNewLesson({...newLesson, time: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">المدة (بالدقائق) *</label>
                    <Input
                      type="number"
                      value={newLesson.duration}
                      onChange={(e) => setNewLesson({...newLesson, duration: parseInt(e.target.value)})}
                      placeholder="60"
                    />
                  </div>
                </div>

                {/* أهداف الحصة */}
                <div>
                  <label className="text-sm font-medium">أهداف الحصة *</label>
                  <div className="space-y-2 mt-2">
                    {newLesson.objectives.map((objective, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          value={objective}
                          onChange={(e) => updateObjective(index, e.target.value)}
                          placeholder={`الهدف ${index + 1}`}
                        />
                        {newLesson.objectives.length > 1 && (
                          <Button variant="outline" size="sm" onClick={() => removeObjective(index)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button variant="outline" onClick={addObjective}>
                      <Plus className="h-4 w-4 ml-2" />
                      إضافة هدف
                    </Button>
                  </div>
                </div>

                {/* المحتوى */}
                <div>
                  <label className="text-sm font-medium">المحتوى التحريري</label>
                  <Textarea
                    value={newLesson.content}
                    onChange={(e) => setNewLesson({...newLesson, content: e.target.value})}
                    placeholder="اكتب محتوى الدرس هنا... يمكنك استخدام Markdown"
                    rows={10}
                    className="mt-2"
                  />
                </div>

                {/* رابط الفيديو */}
                <div>
                  <label className="text-sm font-medium">رابط الفيديو</label>
                  <Input
                    value={newLesson.videoUrl}
                    onChange={(e) => setNewLesson({...newLesson, videoUrl: e.target.value})}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="mt-2"
                  />
                </div>

                {/* ملاحظات خاصة */}
                <div>
                  <label className="text-sm font-medium">ملاحظات خاصة</label>
                  <Textarea
                    value={newLesson.notes}
                    onChange={(e) => setNewLesson({...newLesson, notes: e.target.value})}
                    placeholder="ملاحظات للمراجعة أو التذكير..."
                    rows={3}
                    className="mt-2"
                  />
                </div>

                {/* أزرار الحفظ */}
                <div className="flex gap-3 pt-4 border-t">
                  <Button onClick={handleSaveLesson} variant="outline">
                    <Save className="h-4 w-4 ml-2" />
                    حفظ كمسودة
                  </Button>
                  <Button onClick={handleSaveLesson} className="bg-success hover:bg-success/90">
                    <Eye className="h-4 w-4 ml-2" />
                    حفظ ونشر
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

