
import React, { useState } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { 
  Calendar, 
  Play, 
  ExternalLink, 
  ArrowLeft,
  Clock,
  Video,
  Users,
  BookOpen
} from 'lucide-react';

const StudentLectures = () => {
  const [selectedLecture, setSelectedLecture] = useState<any>(null);

  // بيانات وهمية للمحاضرات
  const lectures = [
    {
      id: 1,
      title: 'الروابط الكيميائية - الجزء الأول',
      date: '2024-01-15',
      time: '16:00 - 18:00',
      type: 'recorded', // recorded or live
      status: 'available',
      teacher: 'أ. محمد عبد الله',
      subject: 'كيمياء IGCSE',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      duration: '120 دقيقة',
      attendees: 45
    },
    {
      id: 2,
      title: 'التفاعلات الكيميائية المتقدمة',
      date: '2024-01-18',
      time: '14:00 - 16:00',
      type: 'live',
      status: 'upcoming',
      teacher: 'أ. محمد عبد الله',
      subject: 'كيمياء AS Level',
      meetLink: 'https://meet.google.com/abc-defg',
      duration: '120 دقيقة',
      attendees: 32
    },
    {
      id: 3,
      title: 'الكيمياء العضوية المبسطة',
      date: '2024-01-12',
      time: '16:00 - 18:00',
      type: 'recorded',
      status: 'available',
      teacher: 'أ. محمد عبد الله',
      subject: 'كيمياء A Level',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      duration: '110 دقيقة',
      attendees: 38
    },
    {
      id: 4,
      title: 'مراجعة شاملة قبل الامتحان',
      date: '2024-01-20',
      time: '10:00 - 12:00',
      type: 'live',
      status: 'upcoming',
      teacher: 'أ. محمد عبد الله',
      subject: 'مراجعة عامة',
      meetLink: 'https://meet.google.com/xyz-123',
      duration: '120 دقيقة',
      attendees: 65
    }
  ];

  const handleJoinLecture = (lecture: any) => {
    if (lecture.type === 'recorded') {
      setSelectedLecture(lecture);
    } else {
      window.open(lecture.meetLink, '_blank');
    }
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

  const getStatusBadge = (lecture: any) => {
    if (lecture.type === 'recorded') {
      return (
        <Badge className="bg-blue-100 text-blue-800">
          <Video className="h-3 w-3 ml-1" />
          مسجلة
        </Badge>
      );
    } else {
      return (
        <Badge className="bg-red-100 text-red-800">
          <ExternalLink className="h-3 w-3 ml-1" />
          مباشرة
        </Badge>
      );
    }
  };

  if (selectedLecture) {
    return (
      <div className="min-h-screen bg-background rtl">
        <header className="bg-card border-b border-border">
          <div className="container mx-auto px-4 py-4">
            <Button 
              variant="ghost" 
              onClick={() => setSelectedLecture(null)}
              className="mb-4"
            >
              <ArrowLeft className="h-4 w-4 ml-2" />
              العودة للمحاضرات
            </Button>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          <Card className="card-educational p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold text-primary mb-2">
                  {selectedLecture.title}
                </h1>
                <div className="flex items-center gap-4 text-muted-foreground">
                  <span>{selectedLecture.teacher}</span>
                  <span>•</span>
                  <span>{selectedLecture.subject}</span>
                  <span>•</span>
                  <span>{selectedLecture.duration}</span>
                </div>
              </div>
              {getStatusBadge(selectedLecture)}
            </div>
          </Card>

          <Card className="card-educational overflow-hidden">
            <div className="aspect-video">
              <iframe
                src={selectedLecture.videoUrl}
                title={selectedLecture.title}
                className="w-full h-full"
                allowFullScreen
                frameBorder="0"
              />
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span className="text-sm">{formatDate(selectedLecture.date)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <span className="text-sm">{selectedLecture.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />
                  <span className="text-sm">{selectedLecture.attendees} طالب</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background rtl">
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <Button 
            variant="ghost" 
            onClick={() => window.history.back()}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 ml-2" />
            العودة
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-primary mb-2">محاضراتي</h1>
            <p className="text-muted-foreground">جدول المحاضرات المسجلة والمباشرة</p>
          </div>
          <Badge className="bg-educational text-educational-foreground">
            {lectures.length} محاضرة
          </Badge>
        </div>

        <div className="grid gap-6">
          {lectures.map((lecture) => (
            <Card key={lecture.id} className="card-educational p-6">
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-primary mb-2">
                        {lecture.title}
                      </h3>
                      <p className="text-muted-foreground mb-2">
                        {lecture.teacher} - {lecture.subject}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(lecture.date)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{lecture.time}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span>{lecture.attendees} طالب</span>
                        </div>
                      </div>
                    </div>
                    {getStatusBadge(lecture)}
                  </div>

                  <div className="bg-primary/5 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <BookOpen className="h-4 w-4 text-primary" />
                      <span className="font-medium text-primary">تفاصيل المحاضرة</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      المدة: {lecture.duration}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-3 lg:w-48">
                  <Button 
                    className="bg-gradient-to-r from-primary to-educational"
                    onClick={() => handleJoinLecture(lecture)}
                  >
                    {lecture.type === 'recorded' ? (
                      <>
                        <Play className="h-4 w-4 ml-2" />
                        شاهد المحاضرة
                      </>
                    ) : (
                      <>
                        <ExternalLink className="h-4 w-4 ml-2" />
                        انضم للحصة
                      </>
                    )}
                  </Button>
                  
                  {lecture.type === 'live' && lecture.status === 'upcoming' && (
                    <div className="text-center">
                      <span className="text-xs text-muted-foreground">
                        الحصة ستبدأ قريباً
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentLectures;
