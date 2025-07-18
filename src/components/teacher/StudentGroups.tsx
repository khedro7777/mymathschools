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
  MessageSquare,
  Edit,
  PlusCircle
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';

interface Student {
  id: string;
  name: string;
  avatar: string;
  course: string;
  stage: string;
  paymentStatus: 'paid' | 'due' | 'pending';
  lastActivity: string;
}

const studentsData: Student[] = [
  { id: '1', name: 'أحمد المصري', avatar: '/placeholder.svg', course: 'الجبر للمرحلة المتقدمة', stage: 'المرحلة الثانوية', paymentStatus: 'paid', lastActivity: 'منذ يومين' },
  { id: '2', name: 'فاطمة الزهراء', avatar: '/placeholder.svg', course: 'الهندسة التحليلية', stage: 'المرحلة الثانوية', paymentStatus: 'due', lastActivity: 'منذ 5 أيام' },
  { id: '3', name: 'خالد بن الوليد', avatar: '/placeholder.svg', course: 'حساب المثلثات', stage: 'المرحلة الإعدادية', paymentStatus: 'paid', lastActivity: 'اليوم' },
  { id: '4', name: 'عائشة بنت أبي بكر', avatar: '/placeholder.svg', course: 'الجبر للمرحلة المتقدمة', stage: 'المرحلة الثانوية', paymentStatus: 'pending', lastActivity: 'منذ أسبوع' },
];

const StudentGroups = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    course: 'all',
    stage: 'all',
    paymentStatus: 'all',
  });

  const handleFilterChange = (filterName: string, value: string) => {
    setFilters(prev => ({ ...prev, [filterName]: value }));
  };

  const filteredStudents = studentsData.filter(student => {
    return (
      (student.name.includes(searchTerm) || student.course.includes(searchTerm)) &&
      (filters.course === 'all' || student.course === filters.course) &&
      (filters.stage === 'all' || student.stage === filters.stage) &&
      (filters.paymentStatus === 'all' || student.paymentStatus === filters.paymentStatus)
    );
  });

  const getPaymentStatusVariant = (status: 'paid' | 'due' | 'pending') => {
    switch (status) {
      case 'paid': return 'success';
      case 'due': return 'destructive';
      case 'pending': return 'warning';
      default: return 'secondary';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>مجموعات طلابي</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                placeholder="بحث بالاسم أو الكورس..."
                className="pr-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-4">
              <Select onValueChange={(value) => handleFilterChange('course', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="الكورسات" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">كل الكورسات</SelectItem>
                  <SelectItem value="الجبر للمرحلة المتقدمة">الجبر للمرحلة المتقدمة</SelectItem>
                  <SelectItem value="الهندسة التحليلية">الهندسة التحليلية</SelectItem>
                  <SelectItem value="حساب المثلثات">حساب المثلثات</SelectItem>
                </SelectContent>
              </Select>
              <Select onValueChange={(value) => handleFilterChange('stage', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="المراحل" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">كل المراحل</SelectItem>
                  <SelectItem value="المرحلة الثانوية">المرحلة الثانوية</SelectItem>
                  <SelectItem value="المرحلة الإعدادية">المرحلة الإعدادية</SelectItem>
                </SelectContent>
              </Select>
              <Select onValueChange={(value) => handleFilterChange('paymentStatus', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="حالة الدفع" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">كل الحالات</SelectItem>
                  <SelectItem value="paid">مدفوع</SelectItem>
                  <SelectItem value="due">متأخر</SelectItem>
                  <SelectItem value="pending">قيد المراجعة</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>الطالب</TableHead>
                <TableHead>الكورس</TableHead>
                <TableHead>المرحلة</TableHead>
                <TableHead>حالة الدفع</TableHead>
                <TableHead>آخر نشاط</TableHead>
                <TableHead>إجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map(student => (
                <TableRow key={student.id}>
                  <TableCell className="flex items-center gap-3">
                    <img src={student.avatar} alt={student.name} className="w-10 h-10 rounded-full" />
                    <span>{student.name}</span>
                  </TableCell>
                  <TableCell>{student.course}</TableCell>
                  <TableCell>{student.stage}</TableCell>
                  <TableCell>
                    <Badge variant={getPaymentStatusVariant(student.paymentStatus)}>
                      {student.paymentStatus === 'paid' ? 'مدفوع' : student.paymentStatus === 'due' ? 'متأخر' : 'قيد المراجعة'}
                    </Badge>
                  </TableCell>
                  <TableCell>{student.lastActivity}</TableCell>
                  <TableCell className="flex gap-2">
                    <Button variant="ghost" size="icon">
                      <Eye className="w-5 h-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <MessageSquare className="w-5 h-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Edit className="w-5 h-5" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentGroups;
