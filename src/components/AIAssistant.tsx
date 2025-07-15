
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { 
  Bot, 
  Send, 
  X, 
  MessageSquare, 
  Sparkles, 
  Calculator,
  BookOpen,
  HelpCircle,
  Lightbulb
} from 'lucide-react';

interface AIAssistantProps {
  position?: 'fixed' | 'inline';
  context?: 'student' | 'teacher' | 'admin' | 'main';
}

const AIAssistant = ({ position = 'fixed', context = 'main' }: AIAssistantProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      type: 'ai',
      content: 'مرحباً! أنا مساعدك الذكي في My Math. كيف يمكنني مساعدتك اليوم؟',
      timestamp: new Date()
    }
  ]);

  const contextHelpers = {
    student: [
      { icon: Calculator, text: 'شرح المسائل الرياضية', action: 'شرح' },
      { icon: BookOpen, text: 'مراجعة الدروس', action: 'مراجعة' },
      { icon: HelpCircle, text: 'المساعدة في الواجبات', action: 'واجبات' }
    ],
    teacher: [
      { icon: Lightbulb, text: 'أفكار للدروس', action: 'أفكار' },
      { icon: Calculator, text: 'إنشاء تمارين', action: 'تمارين' },
      { icon: BookOpen, text: 'خطط التدريس', action: 'خطط' }
    ],
    admin: [
      { icon: Bot, text: 'تحليل البيانات', action: 'تحليل' },
      { icon: MessageSquare, text: 'تقارير النظام', action: 'تقارير' },
      { icon: Sparkles, text: 'تحسين الأداء', action: 'تحسين' }
    ],
    main: [
      { icon: Calculator, text: 'تعلم الرياضيات', action: 'تعلم' },
      { icon: BookOpen, text: 'البحث في المحتوى', action: 'بحث' },
      { icon: HelpCircle, text: 'الأسئلة الشائعة', action: 'أسئلة' }
    ]
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages(prev => [...prev, {
        type: 'user',
        content: message,
        timestamp: new Date()
      }]);
      
      // Simulate AI response
      setTimeout(() => {
        setMessages(prev => [...prev, {
          type: 'ai',
          content: `شكراً لك! سأساعدك في "${message}". هذه خدمة تجريبية للمساعد الذكي.`,
          timestamp: new Date()
        }]);
      }, 1000);
      
      setMessage('');
    }
  };

  const handleQuickAction = (action: string) => {
    setMessage(`أريد المساعدة في ${action}`);
  };

  if (position === 'fixed') {
    return (
      <div className="ai-chat-container">
        {/* Chat Button */}
        {!isOpen && (
          <Button
            onClick={() => setIsOpen(true)}
            className="ai-chat-button w-14 h-14 rounded-full shadow-lg"
            size="icon"
          >
            <Bot className="h-6 w-6 text-white" />
          </Button>
        )}

        {/* Chat Box */}
        {isOpen && (
          <Card className="ai-chat-box w-80 h-96 flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-primary to-educational rounded-full flex items-center justify-center">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">مساعد My Math</h3>
                  <Badge variant="outline" className="text-xs">
                    <Sparkles className="h-3 w-3 ml-1" />
                    متاح الآن
                  </Badge>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 space-y-3 overflow-y-auto">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.type === 'user' ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[80%] p-2 rounded-lg text-sm ${
                      msg.type === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="p-2 border-t">
              <div className="flex flex-wrap gap-1 mb-2">
                {contextHelpers[context].map((helper, index) => {
                  const Icon = helper.icon;
                  return (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="text-xs h-7"
                      onClick={() => handleQuickAction(helper.action)}
                    >
                      <Icon className="h-3 w-3 ml-1" />
                      {helper.action}
                    </Button>
                  );
                })}
              </div>
            </div>

            {/* Input */}
            <div className="p-3 border-t">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="اكتب رسالتك..."
                  className="flex-1 px-3 py-2 text-sm border border-input rounded-md bg-background"
                />
                <Button
                  onClick={handleSendMessage}
                  size="icon"
                  className="h-9 w-9"
                  disabled={!message.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        )}
      </div>
    );
  }

  // Inline version for dashboards
  return (
    <Card className="p-4">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-gradient-to-r from-primary to-educational rounded-full flex items-center justify-center">
          <Bot className="h-5 w-5 text-white" />
        </div>
        <div>
          <h3 className="font-semibold">مساعد My Math الذكي</h3>
          <p className="text-sm text-muted-foreground">اسأل أي سؤال أو احصل على المساعدة</p>
        </div>
      </div>
      
      <div className="flex gap-2 mb-3">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="اكتب سؤالك هنا..."
          className="flex-1 px-3 py-2 text-sm border border-input rounded-md bg-background"
        />
        <Button onClick={handleSendMessage} size="icon" disabled={!message.trim()}>
          <Send className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {contextHelpers[context].map((helper, index) => {
          const Icon = helper.icon;
          return (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => handleQuickAction(helper.action)}
            >
              <Icon className="h-4 w-4 ml-2" />
              {helper.text}
            </Button>
          );
        })}
      </div>
    </Card>
  );
};

export default AIAssistant;
