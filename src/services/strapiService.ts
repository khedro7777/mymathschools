// خدمة Strapi API
const STRAPI_URL = process.env.REACT_APP_STRAPI_URL || 'http://localhost:1337';
const API_TOKEN = process.env.REACT_APP_STRAPI_TOKEN || '';

interface StrapiResponse<T> {
  data: T;
  meta?: any;
}

interface User {
  id: number;
  username: string;
  email: string;
  role?: {
    id: number;
    name: string;
    type: string;
  };
}

interface LoginCredentials {
  identifier: string;
  password: string;
}

interface RegisterData {
  username: string;
  email: string;
  password: string;
  role?: string;
}

class StrapiService {
  private baseURL: string;
  private token: string | null = null;

  constructor() {
    this.baseURL = STRAPI_URL;
    this.token = localStorage.getItem('strapi_token');
  }

  // تعيين التوكن
  setToken(token: string) {
    this.token = token;
    localStorage.setItem('strapi_token', token);
  }

  // إزالة التوكن
  removeToken() {
    this.token = null;
    localStorage.removeItem('strapi_token');
  }

  // طلب HTTP عام
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}/api${endpoint}`;
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    if (API_TOKEN) {
      headers.Authorization = `Bearer ${API_TOKEN}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Network error' }));
      throw new Error(error.message || `HTTP ${response.status}`);
    }

    return response.json();
  }

  // تسجيل الدخول
  async login(credentials: LoginCredentials): Promise<{ jwt: string; user: User }> {
    const response = await fetch(`${this.baseURL}/api/auth/local`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Login failed');
    }

    const data = await response.json();
    this.setToken(data.jwt);
    return data;
  }

  // التسجيل
  async register(userData: RegisterData): Promise<{ jwt: string; user: User }> {
    const response = await fetch(`${this.baseURL}/api/auth/local/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Registration failed');
    }

    const data = await response.json();
    this.setToken(data.jwt);
    return data;
  }

  // تسجيل الخروج
  logout() {
    this.removeToken();
  }

  // الحصول على المستخدم الحالي
  async getCurrentUser(): Promise<User> {
    return this.request<User>('/users/me?populate=role');
  }

  // الحصول على الكورسات
  async getCourses(): Promise<StrapiResponse<any[]>> {
    return this.request<StrapiResponse<any[]>>('/courses?populate=*');
  }

  // إنشاء كورس جديد
  async createCourse(courseData: any): Promise<StrapiResponse<any>> {
    return this.request<StrapiResponse<any>>('/courses', {
      method: 'POST',
      body: JSON.stringify({ data: courseData }),
    });
  }

  // الحصول على التسجيلات
  async getEnrollments(): Promise<StrapiResponse<any[]>> {
    return this.request<StrapiResponse<any[]>>('/enrollments?populate=*');
  }

  // إنشاء تسجيل جديد
  async createEnrollment(enrollmentData: any): Promise<StrapiResponse<any>> {
    return this.request<StrapiResponse<any>>('/enrollments', {
      method: 'POST',
      body: JSON.stringify({ data: enrollmentData }),
    });
  }

  // الحصول على المدفوعات
  async getPayments(): Promise<StrapiResponse<any[]>> {
    return this.request<StrapiResponse<any[]>>('/payments?populate=*');
  }

  // إنشاء دفعة جديدة
  async createPayment(paymentData: any): Promise<StrapiResponse<any>> {
    return this.request<StrapiResponse<any>>('/payments', {
      method: 'POST',
      body: JSON.stringify({ data: paymentData }),
    });
  }

  // الحصول على المواد التعليمية
  async getMaterials(): Promise<StrapiResponse<any[]>> {
    return this.request<StrapiResponse<any[]>>('/materials?populate=*');
  }

  // إنشاء مادة تعليمية جديدة
  async createMaterial(materialData: any): Promise<StrapiResponse<any>> {
    return this.request<StrapiResponse<any>>('/materials', {
      method: 'POST',
      body: JSON.stringify({ data: materialData }),
    });
  }

  // الحصول على الأدوار
  async getRoles(): Promise<StrapiResponse<any[]>> {
    return this.request<StrapiResponse<any[]>>('/roles');
  }

  // فحص حالة الاتصال
  async checkConnection(): Promise<boolean> {
    try {
      await fetch(`${this.baseURL}/api/users/me`, {
        headers: this.token ? { Authorization: `Bearer ${this.token}` } : {},
      });
      return true;
    } catch {
      return false;
    }
  }
}

export default new StrapiService();
export type { User, LoginCredentials, RegisterData };

