import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import {
  Search,
  Filter,
  Users,
  Eye,
  Send,
  Edit,
  StickyNote
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

interface Student {
  id: string;
  name: string;
  grade: string;
  course: string;
  paymentStatus: 'paid' | 'unpaid' | 'pending';
  attendance: number;
  grades: { subject: string; score: number }[];
  notes: string[];
}

const studentsData: Student[] = [
  { id: '1', name: 'أحمد محمد', grade: 'الثالث الثانوي', course: 'الجبر', paymentStatus: 'paid', attendance: 95, grades: [{ subject: 'Math', score: 88 }], notes: ['Excellent participation'] },
  { id: '2', name: 'فاطمة الزهراء', grade: 'الثاني الثانوي', course: 'الهندسة', paymentStatus: 'unpaid', attendance: 80, grades: [{ subject: 'Math', score: 75 }], notes: [] },
  { id: '3', name: 'محمد علي', grade: 'الأول الثانوي', course: 'التفاضل', paymentStatus: 'pending', attendance: 90, grades: [{ subject: 'Math', score: 92 }], notes: ['Needs to focus on homework'] },
];

const StudentDB = () => {
  const [students, setStudents] = useState<Student[]>(studentsData);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ course: '', grade: '', paymentStatus: '' });
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const filteredStudents = students.filter(student => {
    return (
      student.name.includes(searchTerm) &&
      (filters.course ? student.course === filters.course : true) &&
      (filters.grade ? student.grade === filters.grade : true) &&
      (filters.paymentStatus ? student.paymentStatus === filters.paymentStatus : true)
    );
  });

  const handleSendMessage = (studentId: string) => alert(`Sending message to student ${studentId}`);
  const handleUpdateGrades = (studentId: string) => alert(`Updating grades for student ${studentId}`);
  const handleAddNote = (studentId: string) => alert(`Adding note to student ${studentId}`);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>قاعدة بيانات الطلاب</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <Input
                placeholder="بحث بالاسم..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64"
              />
              <Select onValueChange={(value) => setFilters(prev => ({ ...prev, course: value }))}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="تصفية بالكورس" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">الكل</SelectItem>
                  <SelectItem value="الجبر">الجبر</SelectItem>
                  <SelectItem value="الهندسة">الهندسة</SelectItem>
                  <SelectItem value="التفاضل">التفاضل</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline"><Filter className="h-4 w-4 ml-2" />تصفية</Button>
            </div>
            <Badge variant="secondary"><Users className="h-4 w-4 ml-1" />{students.length} طلاب</Badge>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-right p-3">الاسم</th>
                  <th className="text-right p-3">الكورس</th>
                  <th className="text-right p-3">المرحلة</th>
                  <th className="text-right p-3">حالة الدفع</th>
                  <th className="text-right p-3">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map(student => (
                  <tr key={student.id} className="border-b hover:bg-muted/50">
                    <td className="p-3">{student.name}</td>
                    <td className="p-3">{student.course}</td>
                    <td className="p-3">{student.grade}</td>
                    <td className="p-3"><Badge variant={student.paymentStatus === 'paid' ? 'success' : 'destructive'}>{student.paymentStatus}</Badge></td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" onClick={() => setSelectedStudent(student)}><Eye className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="sm" onClick={() => handleSendMessage(student.id)}><Send className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="sm" onClick={() => handleUpdateGrades(student.id)}><Edit className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="sm" onClick={() => handleAddNote(student.id)}><StickyNote className="h-4 w-4" /></Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {selectedStudent && (
        <Dialog open={!!selectedStudent} onOpenChange={() => setSelectedStudent(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>ملف الطالب: {selectedStudent.name}</DialogTitle>
            </DialogHeader>
            <div>
              <p><strong>الكورس:</strong> {selectedStudent.course}</p>
              <p><strong>المرحلة:</strong> {selectedStudent.grade}</p>
              <p><strong>الحضور:</strong> {selectedStudent.attendance}%</p>
              <p><strong>الدرجات:</strong></p>
              <ul>
                {selectedStudent.grades.map(g => <li key={g.subject}>{g.subject}: {g.score}</li>)}
              </ul>
              <p><strong>ملاحظات:</strong></p>
              <ul>
                {selectedStudent.notes.map((n, i) => <li key={i}>{n}</li>)}
              </ul>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default StudentDB;
