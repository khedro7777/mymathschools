import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { 
  Users,
  Send, 
  Bell, 
  Gift, 
  HelpCircle
} from 'lucide-react';
import StudentDB from './StudentDB';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

const StudentGroups = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">مجموعات طلابي</h1>
          <p className="text-muted-foreground">أدر طلابك وتفاعل معهم</p>
        </div>
        <Button><Users className="h-4 w-4 ml-2" />إدارة المجموعات</Button>
      </div>

      <Tabs defaultValue="all-students" className="w-full">
        <TabsList>
          <TabsTrigger value="all-students">كل الطلاب</TabsTrigger>
          <TabsTrigger value="group-management">إدارة المجموعات</TabsTrigger>
        </TabsList>
        <TabsContent value="all-students">
          <StudentDB />
        </TabsContent>
        <TabsContent value="group-management">
          <Card>
            <CardHeader>
              <CardTitle>إدارة المجموعات</CardTitle>
            </CardHeader>
            <CardContent>
              <p>سيتم إضافة وظائف إدارة المجموعات هنا.</p>
              {/* Add group management UI here */}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudentGroups;

