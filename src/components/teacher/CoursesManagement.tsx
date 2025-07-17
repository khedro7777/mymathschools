import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Users, 
  Calendar,
  Video,
  ExternalLink,
  BookOpen
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

interface Course {
  id: string;
  title: string;
  stage: string;
  grade: string;
  subject: string;
  educationType: string;
  description: string;
  meetLink: string;
  videoChannel: string;
  studentsCount: number;
  schedule: string[];
  status: 'active' | 'inactive';
  createdAt: string;
}

const CoursesManagement = () => {
  const [courses, setCourses] = useState<Course[]>([
    {
      id: '1',
      title: 'الجبر المتقدم - الصف الثالث الثانوي',
      stage: 'ثانوي',
      grade: 'الثالث الثانوي',
      subject: 'رياضيات',
      educationType: 'مصري',
      description: 'كورس شامل في الجبر المتقدم يغطي جميع موضوعات المنهج',
      meetLink: 'https://meet.google.com/abc-defg-hij',
      videoChannel: 'https://youtube.com/playlist?list=PLxyz123',
      studentsCount: 45,
      schedule: ['الأحد 4:00 م', 'الثلاثاء 4:00 م', 'الخميس 4:00 م'],
      status: 'active',
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      title: 'الهندسة التحليلية - الصف الثاني الثانوي',
      stage: 'ثانوي',
      grade: 'الثاني الثانوي',
      subject: 'رياضيات',
      educationType: 'مصري',
      description: 'دراسة الهندسة التحليلية والمعادلات الخطية',
      meetLink: 'https://meet.google.com/xyz-uvwx-yzab',
      videoChannel: 'https://youtube.com/playlist?list=PLabc456',
      studentsCount: 32,
      schedule: ['السبت 6:00 م', 'الاثنين 6:00 م', 'الأربعاء 6:00 م'],
      status: 'active',
      createdAt: '2024-01-10'
    },
    {
      id: '3',
      title: 'حساب المثلثات - IGCSE',
      stage: 'ثانوي',
      grade: 'Year 11',
      subject: 'Mathematics',
      educationType: 'بريطاني',
      description: 'Comprehensive trigonometry course for IGCSE students',
      meetLink: 'https://meet.google.com/def-ghij-klmn',
      videoChannel: 'https://youtube.com/playlist?list=PLdef789',
      studentsCount: 28,
      schedule: ['الجمعة 7:00 م', 'الأحد 7:00 م'],
      status: 'active',
      createdAt: '2024-01-05'
    }
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    stage: '',
    grade: '',
    subject: '',
    educationType: '',
    description: '',
    meetLink: '',
    videoChannel: '',
    schedule: ['']
  });

  const stages = ['ابتدائي', 'إعدادي', 'ثانوي', 'IGCSE', 'SAT', 'جامعي'];
  const educationTypes = ['مصري', 'دولي', 'أمريكي', 'بريطاني', 'فرنسي'];
  const subjects = ['رياضيات', 'فيزياء', 'كيمياء', 'أحياء', 'Mathematics', 'Physics', 'Chemistry'];

  const handleAddCourse = () => {
    const newCourse: Course = {
      id: Date.now().toString(),
      title: formData.title,
      stage: formData.stage,
      grade: formData.grade,
      subject: formData.subject,
      educationType: formData.educationType,
      description: formData.description,
      meetLink: formData.meetLink,
      videoChannel: formData.videoChannel,
      studentsCount: 0,
      schedule: formData.schedule.filter(s => s.trim() !== ''),
      status: 'active',
      createdAt: new Date().toISOString().split('T')[0]
    };

    setCourses([...courses, newCourse]);
    resetForm();
    setIsAddDialogOpen(false);
  };

  const handleEditCourse = (course: Course) => {
    setEditingCourse(course);
    setFormData({
      title: course.title,
      stage: course.stage,
      grade: course.grade,
      subject: course.subject,
      educationType: course.educationType,
      description: course.description,
      meetLink: course.meetLink,
      videoChannel: course.videoChannel,
      schedule: course.schedule
    });
  };

  const handleUpdateCourse = () => {
    if (!editingCourse) return;

    const updatedCourses = courses.map(course =>
      course.id === editingCourse.id
        ? {
            ...course,
            title: formData.title,
            stage: formData.stage,
            grade: formData.grade,
            subject: formData.subject,
            educationType: formData.educationType,
            description: formData.description,
            meetLink: formData.meetLink,
            videoChannel: formData.videoChannel,
            schedule: formData.schedule.filter(s => s.trim() !== '')
          }
        : course
    );

    setCourses(updatedCourses);
    resetForm();
    setEditingCourse(null);
  };

  const handleDeleteCourse = (courseId: string) => {
    setCourses(courses.filter(course => course.id !== courseId));
  };

  const resetForm = () => {
    setFormData({
      title: '',
      stage: '',
      grade: '',
      subject: '',
      educationType: '',
      description: '',
      meetLink: '',
      videoChannel: '',
      schedule: ['']
    });
  };

  const addScheduleSlot = () => {
    setFormData({
      ...formData,
      schedule: [...formData.schedule, '']
    });
  };

  const updateScheduleSlot = (index: number, value: string) => {
    const newSchedule = [...formData.schedule];
    newSchedule[index] = value;
    setFormData({
      ...formData,
      schedule: newSchedule
    });
  };

  const removeScheduleSlot = (index: number) => {
    const newSchedule = formData.schedule.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      schedule: newSchedule
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">إدارة الكورسات</h1>
          <p className="text-muted-foreground">أضف وأدر كورساتك التعليمية</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              إضافة كورس جديد
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>إضافة كورس جديد</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="stage">المرحلة الدراسية</Label>
                  <Select value={formData.stage} onValueChange={(value) => setFormData({...formData, stage: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر المرحلة" />
                    </SelectTrigger>
                    <SelectContent>
                      {stages.map(stage => (
                        <SelectItem key={stage} value={stage}>{stage}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="grade">الصف</Label>
                  <Input
                    id="grade"
                    value={formData.grade}
                    onChange={(e) => setFormData({...formData, grade: e.target.value})}
                    placeholder="مثال: الثالث الثانوي"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="subject">المادة</Label>
                  <Select value={formData.subject} onValueChange={(value) => setFormData({...formData, subject: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر المادة" />
                    </SelectTrigger>
                    <SelectContent>
                      {subjects.map(subject => (
                        <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="educationType">نوع التعليم</Label>
                  <Select value={formData.educationType} onValueChange={(value) => setFormData({...formData, educationType: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر نوع التعليم" />
                    </SelectTrigger>
                    <SelectContent>
                      {educationTypes.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="title">عنوان الكورس</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="مثال: الجبر المتقدم - الصف الثالث الثانوي"
                />
              </div>

              <div>
                <Label htmlFor="description">وصف قصير</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="وصف مختصر للكورس ومحتواه"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="meetLink">رابط Google Meet</Label>
                <Input
                  id="meetLink"
                  value={formData.meetLink}
                  onChange={(e) => setFormData({...formData, meetLink: e.target.value})}
                  placeholder="https://meet.google.com/..."
                />
              </div>

              <div>
                <Label htmlFor="videoChannel">رابط قناة الفيديو</Label>
                <Input
                  id="videoChannel"
                  value={formData.videoChannel}
                  onChange={(e) => setFormData({...formData, videoChannel: e.target.value})}
                  placeholder="https://youtube.com/playlist?list=... أو https://vimeo.com/..."
                />
              </div>

              <div>
                <Label>جدول أسبوعي للعرض</Label>
                <div className="space-y-2">
                  {formData.schedule.map((slot, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={slot}
                        onChange={(e) => updateScheduleSlot(index, e.target.value)}
                        placeholder="مثال: الأحد 4:00 م"
                        className="flex-1"
                      />
                      {formData.schedule.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeScheduleSlot(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addScheduleSlot}
                    className="gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    إضافة موعد
                  </Button>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={handleAddCourse} className="flex-1">
                  إضافة الكورس
                </Button>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  إلغاء
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Card key={course.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-lg mb-2">{course.title}</CardTitle>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge variant="secondary">{course.stage}</Badge>
                    <Badge variant="outline">{course.educationType}</Badge>
                    <Badge variant={course.status === 'active' ? 'default' : 'secondary'}>
                      {course.status === 'active' ? 'نشط' : 'غير نشط'}
                    </Badge>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEditCourse(course)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteCourse(course.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                {course.description}
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{course.studentsCount} طالب</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div className="text-sm">
                    {course.schedule.map((slot, index) => (
                      <div key={index}>{slot}</div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  {course.meetLink && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={course.meetLink} target="_blank" rel="noopener noreferrer">
                        <Video className="h-4 w-4 ml-1" />
                        Meet
                      </a>
                    </Button>
                  )}
                  {course.videoChannel && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={course.videoChannel} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 ml-1" />
                        فيديوهات
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Dialog */}
      {editingCourse && (
        <Dialog open={!!editingCourse} onOpenChange={() => setEditingCourse(null)}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>تعديل الكورس</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {/* Same form fields as add dialog */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-stage">المرحلة الدراسية</Label>
                  <Select value={formData.stage} onValueChange={(value) => setFormData({...formData, stage: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر المرحلة" />
                    </SelectTrigger>
                    <SelectContent>
                      {stages.map(stage => (
                        <SelectItem key={stage} value={stage}>{stage}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="edit-grade">الصف</Label>
                  <Input
                    id="edit-grade"
                    value={formData.grade}
                    onChange={(e) => setFormData({...formData, grade: e.target.value})}
                    placeholder="مثال: الثالث الثانوي"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-subject">المادة</Label>
                  <Select value={formData.subject} onValueChange={(value) => setFormData({...formData, subject: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر المادة" />
                    </SelectTrigger>
                    <SelectContent>
                      {subjects.map(subject => (
                        <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="edit-educationType">نوع التعليم</Label>
                  <Select value={formData.educationType} onValueChange={(value) => setFormData({...formData, educationType: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر نوع التعليم" />
                    </SelectTrigger>
                    <SelectContent>
                      {educationTypes.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="edit-title">عنوان الكورس</Label>
                <Input
                  id="edit-title"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="مثال: الجبر المتقدم - الصف الثالث الثانوي"
                />
              </div>

              <div>
                <Label htmlFor="edit-description">وصف قصير</Label>
                <Textarea
                  id="edit-description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="وصف مختصر للكورس ومحتواه"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="edit-meetLink">رابط Google Meet</Label>
                <Input
                  id="edit-meetLink"
                  value={formData.meetLink}
                  onChange={(e) => setFormData({...formData, meetLink: e.target.value})}
                  placeholder="https://meet.google.com/..."
                />
              </div>

              <div>
                <Label htmlFor="edit-videoChannel">رابط قناة الفيديو</Label>
                <Input
                  id="edit-videoChannel"
                  value={formData.videoChannel}
                  onChange={(e) => setFormData({...formData, videoChannel: e.target.value})}
                  placeholder="https://youtube.com/playlist?list=... أو https://vimeo.com/..."
                />
              </div>

              <div>
                <Label>جدول أسبوعي للعرض</Label>
                <div className="space-y-2">
                  {formData.schedule.map((slot, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={slot}
                        onChange={(e) => updateScheduleSlot(index, e.target.value)}
                        placeholder="مثال: الأحد 4:00 م"
                        className="flex-1"
                      />
                      {formData.schedule.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeScheduleSlot(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addScheduleSlot}
                    className="gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    إضافة موعد
                  </Button>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={handleUpdateCourse} className="flex-1">
                  حفظ التغييرات
                </Button>
                <Button variant="outline" onClick={() => setEditingCourse(null)}>
                  إلغاء
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default CoursesManagement;

